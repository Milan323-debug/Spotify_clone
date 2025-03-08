import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";

export default function Album() {
  const [{ token }] = useStateProvider();
  const [playlist, setPlaylist] = useState(null);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/playlists/7hQZBInBm5nLyvVJtQE19S",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        setPlaylist(response.data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    const fetchArtists = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        setArtists(response.data.artists);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    if (token) {
      fetchPlaylist();
      fetchArtists();
    }
  }, [token]);

  // Function to play a specific track
  const playTrack = async (trackUri) => {
    try {
      await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          uris: [trackUri],
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  return (
    <Container>
      {playlist ? (
        <div className="playlist">
          <div className="playlist__image">
            {playlist.images && playlist.images.length > 0 ? (
              <img src={playlist.images[0].url} alt={playlist.name} />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <div className="playlist__info">
            <h2>{playlist.name}</h2>
            <p className="description">{playlist.description}</p>
            <p className="track-count">{playlist.tracks.total} tracks</p>
          </div>
          <div className="playlist__tracks">
            {playlist.tracks.items.map((item) => {
              const track = item.track;
              if (!track) return null; // handle null track
              const artists = track.artists.map((artist) => artist.name).join(", ");

              return (
                <div key={track.id} className="track">
                  <div className="track__info">
                    <h4 className="track__name">{track.name}</h4>
                    <p className="track__artists">{artists}</p>
                  </div>
                  <button
                    className="track__play"
                    onClick={() => playTrack(track.uri)}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {artists.length > 0 && (
        <div className="artists">
          <h2>Artists</h2>
          <div className="artists__list">
            {artists.map((artist) => (
              <div key={artist.id} className="artist">
                <div className="artist__image">
                  {artist.images && artist.images.length > 0 ? (
                    <img src={artist.images[0].url} alt={artist.name} />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className="artist__info">
                  <h3>{artist.name}</h3>
                  <p>{artist.genres.join(", ")}</p>
                  <p>{artist.followers.total} followers</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  /* Center the content and give some padding */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #121212; /* Typical Spotify dark background */
  color: #fff;

  .playlist {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    width: 100%;
    background-color: #181818;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    margin-bottom: 2rem;

    .playlist__image {
      margin-bottom: 1.5rem;
      img {
        width: 300px;
        height: 300px;
        object-fit: cover;
        border-radius: 4px;
      }
    }

    .playlist__info {
      text-align: center;
      margin-bottom: 2rem;

      h2 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      .description {
        margin: 0.5rem 0;
        font-size: 1rem;
        color: #b3b3b3;
      }

      .track-count {
        margin-top: 0.5rem;
        font-weight: bold;
        font-size: 1.1rem;
      }
    }

    .playlist__tracks {
      width: 100%;
      .track {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #282828;
        border-radius: 4px;
        padding: 0.75rem 1rem;
        margin-bottom: 0.5rem;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: #333333;
        }

        .track__info {
          display: flex;
          flex-direction: column;

          .track__name {
            font-size: 1rem;
            margin: 0;
          }

          .track__artists {
            margin: 0.25rem 0 0;
            font-size: 0.85rem;
            color: #b3b3b3;
          }
        }

        .track__play {
          background-color: #1db954;
          border: none;
          color: #fff;
          font-size: 1rem;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease-in-out;

          &:hover {
            background-color: #1ed760;
          }

          svg {
            width: 16px;
            height: 16px;
            fill: #fff; /* white triangle */
            margin-left: 2px; /* Center the triangle horizontally */
          }
        }
      }
    }
  }

  .artists {
    max-width: 800px;
    width: 100%;
    background-color: #181818;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .artists__list {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      justify-content: center;

      .artist {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #282828;
        border-radius: 8px;
        padding: 1rem;
        width: 200px;
        text-align: center;

        .artist__image {
          margin-bottom: 1rem;
          img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
          }
        }

        .artist__info {
          h3 {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
          }

          p {
            font-size: 0.9rem;
            color: #b3b3b3;
            margin: 0.25rem 0;
          }
        }
      }
    }
  }

  p {
    font-size: 1.2rem;
    color: #b3b3b3;
  }
`;