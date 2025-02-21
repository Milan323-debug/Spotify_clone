import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";

export default function Library() {
  const [{ token }] = useStateProvider();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        setPlaylists(response.data.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    if (token) {
      fetchPlaylists();
    }
  }, [token]);

  return (
    <Container>
      <h1>Your Library</h1>
      <div className="playlists">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist">
            <div className="playlist__image">
              {playlist.images && playlist.images.length > 0 ? (
                <img src={playlist.images[0].url} alt={playlist.name} />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="playlist__info">
              <h3>{playlist.name}</h3>
              {playlist.description && (
                <p className="description">{playlist.description}</p>
              )}
              <p className="track-count">{playlist.tracks.total} tracks</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  .playlists {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;

    .playlist {
      display: flex;
      align-items: center;
      gap: 1rem;
      background-color: #181818;
      padding: 1rem;
      border-radius: 8px;
      transition: transform 0.3s ease, background-color 0.3s ease,
        box-shadow 0.3s ease;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

      &:hover {
        transform: scale(1.02);
        background-color: #282828;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      }

      .playlist__image {
        img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 4px;
        }
      }

      .playlist__info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h3 {
          margin: 0;
          font-size: 1.2rem;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .description {
          margin: 0;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #b3b3b3;
          max-height: 3em; /* Limit text overflow */
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .track-count {
          margin: 0;
          font-size: 0.9rem;
          color: #b3b3b3;
        }
      }
    }
  }

  /* Scrollbar styling (optional) */
  &::-webkit-scrollbar {
    width: 0.7rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
