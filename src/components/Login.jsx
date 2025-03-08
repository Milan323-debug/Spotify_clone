import React from 'react';
import styled from 'styled-components';
import spotifyLogo from '../assets/Spotify_Full_Logo_RGB_Black.png';

export default function Login() {
    const handleClick = () => {
        const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
        const api_url = "https://accounts.spotify.com/authorize";
        const scopes = [
            "user-read-email", 
            "user-read-private",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "streaming",
            "app-remote-control",
            "user-read-playback-position",
            "user-top-read",
            "user-read-recently-played"
        ];

        window.location.href = `${api_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join(" ")}&response_type=token&show_dialog=true`;
        console.log('Redirect URL:', `${api_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join(" ")}&response_type=token&show_dialog=true`);
    };
    
    return (
        <Container>
            <img src={spotifyLogo} alt="Spotify" />
            <button onClick={handleClick}>Login with Spotify</button>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #1ED760;
    gap: 5rem;
    img {
        height: 20vh;
    }
    button {
        padding: 1rem 5rem;
        border-radius: 5rem;
        border: none;
        background-color: black;
        color: #49f585;
        font-size: 1.4rem;
        cursor: pointer;
    }
`;