import React from 'react';
import styled from 'styled-components';

export default function Login() {
    const handleClick = () => {
        const client_id = 'd874b4de31774852afb7a50dc927bc2a';
        const redirect_uri = 'http://localhost:3000/';
        const api_url = "https://accounts.spotify.com/authorize";
        const scopes = ["user-read-email", 
            "user-read-private",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "user-read-playback-position",
            "user-top-read",
            "user-read-recently-played"];

        window.location.href = `${api_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes.join(" ")}&response_type=token&show_dialog=true`;
    };
    
  return (
    <Container>
      <img src="/images/Spotify_Full_Logo_RGB_Black.png" alt="Spotify" />
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
  color:#49f585;
  font-size: 1.4rem;
  cursor: pointer;`;