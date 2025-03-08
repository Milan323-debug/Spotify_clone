import React, { useState, useEffect } from 'react';
import { useStateProvider } from "../utils/StateProvider";
import styled from 'styled-components';

const WebPlayback = () => {
    const [{ token }] = useStateProvider();
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState({
        name: "",
        album: {
            images: [{ url: "" }]
        },
        artists: [{ name: "" }]
    });

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
                };
                transferPlayback();
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true)
                });
            }));

            player.connect();
        };
    }, [token]);

    if (!is_active) {
        return (
            <Container>
                <div className="container">
                    <div className="main-wrapper">
                        <b>Instance not active. Transfer your playback using your Spotify app</b>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="container">
                <div className="main-wrapper">
                    <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />

                    <div className="now-playing__side">
                        <div className="now-playing__name">{current_track.name}</div>
                        <div className="now-playing__artist">{current_track.artists[0].name}</div>

                        <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
                            &lt;&lt;
                        </button>

                        <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                            { is_paused ? "PLAY" : "PAUSE" }
                        </button>

                        <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                            &gt;&gt;
                        </button>
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
        background: #282828;
        border-radius: 15px;
        padding: 20px;
    }

    .now-playing__cover {
        width: 100px;
        height: 100px;
        border-radius: 5px;
    }

    .now-playing__side {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .now-playing__name {
        color: white;
        font-size: 24px;
        margin-bottom: 5px;
    }

    .now-playing__artist {
        color: #b3b3b3;
        font-size: 18px;
        margin-bottom: 20px;
    }

    .btn-spotify {
        background-color: #1db954;
        color: white;
        border: none;
        border-radius: 20px;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        margin-right: 10px;
        transition: all 0.3s ease;

        &:hover {
            background-color: #1ed760;
            transform: scale(1.05);
        }
    }
`;

export default WebPlayback; 