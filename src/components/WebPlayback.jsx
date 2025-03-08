import React, { useState, useEffect } from 'react';
import { useStateProvider } from "../utils/StateProvider";
import styled from 'styled-components';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

const WebPlayback = () => {
    const [{ token }] = useStateProvider();
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Spotify Clone Web Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                // Transfer playback to the web player
                const transferPlayback = async () => {
                    try {
                        await fetch('https://api.spotify.com/v1/me/player', {
                            method: 'PUT',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                device_ids: [device_id],
                                play: false,
                            }),
                        });
                    } catch (err) {
                        console.error('Transfer playback error:', err);
                        setError('Failed to transfer playback');
                    }
                };
                transferPlayback();
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
                setActive(false);
            });

            player.addListener('player_state_changed', (state => {
                if (!state) {
                    setActive(false);
                    return;
                }

                try {
                    setTrack(state.track_window.current_track);
                    setPaused(state.paused);
                    setActive(true);
                } catch (err) {
                    console.error('Player state error:', err);
                    setError('Failed to update player state');
                }
            }));

            player.connect().then(success => {
                if (!success) {
                    setError('Failed to connect to Spotify');
                }
            });

            return () => {
                player.disconnect();
            };
        };
    }, [token]);

    if (error) {
        return (
            <Container>
                <div className="container">
                    <div className="main-wrapper error">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="btn-spotify">
                            Retry
                        </button>
                    </div>
                </div>
            </Container>
        );
    }

    if (!is_active || !current_track) {
        return (
            <Container>
                <div className="container">
                    <div className="main-wrapper">
                        <div className="now-playing__side">
                            <div className="now-playing__name">No track playing</div>
                            <div className="now-playing__artist">Transfer your playback using your Spotify app</div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="container">
                <div className="main-wrapper">
                    <img 
                        src={current_track.album.images[0].url} 
                        className="now-playing__cover" 
                        alt={current_track.name}
                    />

                    <div className="now-playing__side">
                        <div className="now-playing__name">{current_track.name}</div>
                        <div className="now-playing__artist">
                            {current_track.artists.map(artist => artist.name).join(', ')}
                        </div>

                        <div className="controls">
                            <button 
                                className="btn-spotify"
                                onClick={() => player.previousTrack()}
                                disabled={!is_active}
                            >
                                <FaStepBackward />
                            </button>

                            <button 
                                className="btn-spotify btn-spotify--play"
                                onClick={() => player.togglePlay()}
                                disabled={!is_active}
                            >
                                {is_paused ? <FaPlay /> : <FaPause />}
                            </button>

                            <button 
                                className="btn-spotify"
                                onClick={() => player.nextTrack()}
                                disabled={!is_active}
                            >
                                <FaStepForward />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    .container {
        padding: 20px;
    }

    .main-wrapper {
        display: flex;
        align-items: center;
        gap: 20px;
        background: rgba(40, 40, 40, 0.8);
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 30px;
    }

    .error {
        color: #ff5555;
        text-align: center;
        flex-direction: column;
    }

    .now-playing__cover {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        object-fit: cover;
    }

    .now-playing__side {
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex: 1;
    }

    .now-playing__name {
        color: white;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 5px;
    }

    .now-playing__artist {
        color: #b3b3b3;
        font-size: 18px;
        margin-bottom: 20px;
    }

    .controls {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .btn-spotify {
        background-color: #1db954;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
            background-color: #1ed760;
            transform: scale(1.1);
        }

        &:disabled {
            background-color: #535353;
            cursor: not-allowed;
            opacity: 0.7;
        }

        svg {
            width: 16px;
            height: 16px;
        }

        &--play {
            width: 50px;
            height: 50px;

            svg {
                width: 20px;
                height: 20px;
            }
        }
    }
`;

export default WebPlayback; 