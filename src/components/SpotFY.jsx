import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./style.css"; // Correct the path to the CSS file
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function SpotFY() {
  const [{ token }, dispatch] = useStateProvider();
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [playlists, setPlaylists] = useState([]);
  const [dailyMixes, setDailyMixes] = useState([]);

  useEffect(() => {
    const getUserPlaylists = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const { items } = response.data;
        const playlists = items.map(({ id, name, images, type }) => ({
          id,
          title: name,
          image: images[0]?.url || "/images/Likedsongs.jpg",
          type: type
        }));
        setPlaylists(playlists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    const getRecommendations = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const { items } = response.data;
        const mixes = items.slice(0, 4).map((track, index) => ({
          id: index + 1,
          title: `Daily Mix ${index + 1}`,
          image: track.album.images[0]?.url || "/images/Dailymix1.jpg",
          artists: track.artists.map(artist => artist.name).join(", ")
        }));
        setDailyMixes(mixes);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (token) {
      getUserPlaylists();
      getRecommendations();
    }
  }, [token]);

  const handlePlaylistClick = async (playlist) => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      setCurrentPlaylist({ ...playlist, tracks: response.data.items });
      if (response.data.items.length > 0) {
        const track = response.data.items[0].track;
        setCurrentTrack({
          title: track.name,
          artist: track.artists[0].name,
          image: track.album.images[0]?.url
        });
      }
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setCurrentPlaylist(null);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <Container>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/images/Spotify_Full_Logo_RGB_Green.png" alt="Spotify Logo" className="logo-img"/>
        </div>
        
        {/* Navigation */}
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="#" onClick={handleHomeClick}>
                <i className="fas fa-home"></i>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <i className="fas fa-search"></i>
                <span>Search</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <i className="fas fa-book-open"></i>
                <span>Your Library</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="playlists-header">
          <h3>Playlists</h3>
          <div className="playlists-actions">
            <button className="recents-button">
              Recents
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
        
        {/* Playlists */}
        <div className="playlists">
          <ul>
            {playlists.map(playlist => (
              <li key={playlist.id}>
                <a href="#" onClick={() => handlePlaylistClick(playlist)}>
                  <img src={playlist.image} alt={playlist.title} />
                  <div className="playlist-info">
                    <span className="playlist-title">{playlist.title}</span>
                    <span className="playlist-type">{playlist.type}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="topbar">
          <div className="arrows">
            <i className="fas fa-chevron-left"></i>
            <i className="fas fa-chevron-right"></i>
          </div>
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="What do you want to play?" />
          </div>
          <div className="profile-area">
            <span className="profile-name">Milan Pramanik</span>
            <img src="/images/MilanPhotoWithout_background.png" alt="Profile" className="profile-img" />
          </div>
        </header>

        <nav className="filter-nav">
          <ul>
            {["All", "Music", "Podcasts"].map(filter => (
              <li key={filter}>
                <a 
                  href="#" 
                  className={activeFilter === filter ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    handleFilterClick(filter);
                  }}
                >
                  {filter}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="featured-playlists">
          <div className="grid-card-row">
            {playlists.map(playlist => (
              <div 
                key={playlist.id} 
                className="playlist-card"
                onClick={() => handlePlaylistClick(playlist)}
              >
                <img src={playlist.image} alt={playlist.title} />
                <div className="playlist-card-info">
                  <h3>{playlist.title}</h3>
                  {playlist.subtitle && <p>{playlist.subtitle}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="made-for-you">
          <div className="section-header">
            <h2>Made For Milan Pramanik</h2>
            <a href="#" className="see-all">Show all</a>
          </div>
          <div className="daily-mixes">
            {dailyMixes.map(mix => (
              <div key={mix.id} className="mix-card">
                <img src={mix.image} alt={mix.title} />
                <div className="mix-info">
                  <h3>{mix.title}</h3>
                  <p>{mix.artists}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Right Sidebar */}
      <aside className="hummingbird-section">
        <h2>Hummingbird (Metro Boomin & James Blake)</h2>
        <div className="hummingbird-video">
          <video 
            src="/images/WhatsApp Video 2025-02-23 at 13.27.59_42485b9c.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="hummingbird-vid-element"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="hummingbird-overlay-text">
          <p>Enjoy the latest track from the Spider-Man: Across The Spider-Verse soundtrack.</p>
        </div>
        <div className="resizer"></div>
      </aside>

      {/* Player Footer */}
      <footer className="player-footer">
        <div className="player-left">
          <img 
            src={currentTrack?.image || "/images/WayIam.jpg"} 
            alt={currentTrack?.title || "Song Cover"} 
            className="song-cover" 
          />
          <div className="song-info">
            <span className="song-title">{currentTrack?.title || "Hummingbird"}</span>
            <span className="song-artist">{currentTrack?.artist || "Metro Boomin & James Blake"}</span>
          </div>
          <i className="far fa-heart heart-icon"></i>
        </div>

        <div className="player-center">
          <div className="controls">
            <i className="fas fa-random control-icon" title="Shuffle"></i>
            <i className="fas fa-step-backward control-icon" title="Previous"></i>
            <i className="fas fa-play-circle control-icon play-pause-btn" title="Play/Pause"></i>
            <i className="fas fa-step-forward control-icon" title="Next"></i>
            <i className="fas fa-repeat control-icon" title="Repeat"></i>
          </div>
          <div className="progress-container">
            <span className="current-time">0:35</span>
            <input type="range" min="0" max="100" value="30" className="progress-bar" />
            <span className="total-time">5:19</span>
          </div>
        </div>

        <div className="player-right">
          <i className="fas fa-list-ol control-icon" title="Queue"></i>
          <i className="fas fa-desktop control-icon" title="Connect to a device"></i>
          <div className="volume-container">
            <i className="fas fa-volume-down control-icon" title="Volume"></i>
            <input type="range" min="0" max="100" value="50" className="volume-slider"/>
          </div>
        </div>
      </footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: #000000;
  color: #ffffff;

  .playlists-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    margin-top: 24px;

    h3 {
      color: #b3b3b3;
      font-size: 14px;
      font-weight: 500;
    }

    .recents-button {
      background: none;
      border: none;
      color: #b3b3b3;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        color: #ffffff;
      }

      i {
        font-size: 16px;
      }
    }
  }

  .featured-playlists {
    margin-bottom: 40px;

    .grid-card-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .playlist-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 8px;
      transition: background-color 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      img {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        margin-right: 16px;
      }

      .playlist-card-info {
        h3 {
          font-size: 16px;
          margin-bottom: 4px;
        }

        p {
          font-size: 14px;
          color: #b3b3b3;
        }
      }
    }
  }

  .made-for-you {
    .daily-mixes {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    .mix-card {
      background: #181818;
      padding: 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background: #282828;
      }

      img {
        width: 100%;
        aspect-ratio: 1;
        border-radius: 4px;
        margin-bottom: 16px;
      }

      .mix-info {
        h3 {
          font-size: 16px;
          margin-bottom: 8px;
        }

        p {
          font-size: 14px;
          color: #b3b3b3;
        }
      }
    }
  }
`;