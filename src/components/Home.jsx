import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WebPlayback from './WebPlayback';
import { useStateProvider } from "../utils/StateProvider";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaPlay } from 'react-icons/fa';

// Default image as fallback
const defaultImage = 'https://i.scdn.co/image/ab67616d0000b273af52c228c9619ff6298b08cd';

// Define track data
const tracks = {
  likedSongs: {
    uri: 'spotify:track:7qiZfU4dY1lWllzX7mPBI3',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    image: '/images/Likedsongs.jpg'
  },
  beatEasy: {
    uri: 'spotify:track:1mWdTewIgB3gtBM3TOSFhB',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    image: '/images/BeatEasy.jpg'
  },
  metroBookin: {
    uri: 'spotify:track:3nqQXoyQOWXiESFLlDF1hG',
    title: 'Superhero',
    artist: 'Metro Boomin',
    image: '/images/MetroBoomin.jpg'
  },
  northernLights: {
    uri: 'spotify:track:0VjIjW4GlUZAMYd2vXMi3b',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    image: '/images/Northernlight.jpg'
  },
  caughtInFire: {
    uri: 'spotify:track:7KXjTSCq5nL1LoYtL7XAwS',
    title: 'STAY',
    artist: 'The Kid LAROI',
    image: '/images/CaughtinFire.jpg'
  },
  somewhere: {
    uri: 'spotify:track:2LBqCSwhJGcFQeTHMVGwy3',
    title: 'Die For You',
    artist: 'The Weeknd',
    image: '/images/SomeWhere.jpg'
  },
  human: {
    uri: 'spotify:track:0e4HHoOy2TuYuHEgFKbBqT',
    title: 'Human',
    artist: 'Rag\'n\'Bone Man',
    image: '/images/Human.jpg'
  },
  spiderman: {
    uri: 'spotify:track:6nSwOQMpl1SoTZyj9Iv7VF',
    title: 'Sunflower',
    artist: 'Post Malone',
    image: '/images/spiderman.jpg'
  }
};

const dailyMixes = [
  {
    uri: 'spotify:track:0V3wPSX9ygBnCm8psDIegu',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    image: '/images/Dailymix1.jpg'
  },
  {
    uri: 'spotify:track:4fouWK6XVHhzl78KzQ1UjL',
    title: 'MONEY',
    artist: 'LISA',
    image: '/images/Dailymix2.jpg'
  },
  {
    uri: 'spotify:track:3DarAbFujv6eYNliUTyqtz',
    title: 'Starboy',
    artist: 'The Weeknd',
    image: '/images/Dailymix3.jpg'
  },
  {
    uri: 'spotify:track:1zi7xx7UVEFkmKfv06H8x0',
    title: 'One Dance',
    artist: 'Drake',
    image: '/images/Dailymix4.jpg'
  },
  {
    uri: 'spotify:track:7qEHsqek33rTcFNT9PFqLf',
    title: 'Someone You Loved',
    artist: 'Lewis Capaldi',
    image: '/images/Dailymix5.jpg'
  }
];

export default function Home() {
  const [{ token }] = useStateProvider();
  const [isLoading, setIsLoading] = useState(true);
  const [activeDevice, setActiveDevice] = useState(null);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const webPlayback = data.devices.find(device => device.name === 'Spotify Clone Web Player');
        if (webPlayback) {
          setActiveDevice(webPlayback.id);
        }
      } catch (error) {
        console.error('Error getting devices:', error);
      }
    };
    if (token) getDevices();
  }, [token]);

  const handleImageError = (trackId) => {
    setImageLoadErrors(prev => ({ ...prev, [trackId]: true }));
  };

  const playTrack = async (uri) => {
    if (!activeDevice) {
      console.error('No active device found');
      return;
    }

    try {
      await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_ids: [activeDevice],
          play: false,
        }),
      });

      await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [uri],
        }),
      });
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <div className="loading">Loading...</div>
      </Container>
    );
  }

  const Card = ({ track, onClick }) => (
    <div className="card" onClick={onClick}>
      <div className="card-image-container">
        <img 
          src={imageLoadErrors[track.uri] ? defaultImage : track.image} 
          alt={track.title}
          onError={() => handleImageError(track.uri)}
        />
        <button className="play-button">
          <FaPlay />
        </button>
      </div>
      <h3>{track.title}</h3>
      <p>{track.artist}</p>
    </div>
  );

  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <div className="body__contents">
            <div className="main-content">
              <WebPlayback />

              <section className="section">
                <h2 className="section-title">Featured Tracks</h2>
                <div className="grid-card-row">
                  {Object.values(tracks).map((track, index) => (
                    <Card key={index} track={track} onClick={() => playTrack(track.uri)} />
                  ))}
                </div>
              </section>

              <section className="section">
                <div className="section-header">
                  <h2>Made For You</h2>
                  <a href="#" className="see-all">Show all</a>
                </div>
                <div className="card-row">
                  {dailyMixes.map((mix, index) => (
                    <Card key={index} track={mix} onClick={() => playTrack(mix.uri)} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;

  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
  }

  .body {
    height: 100%;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .body__contents {
    height: 100%;
    width: 100%;
    padding: 1rem;
    overflow: auto;
  }

  .main-content {
    padding: 20px;
    background-color: transparent;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white;
    font-size: 24px;
    background: #121212;
  }

  .section {
    margin-bottom: 40px;
  }

  .section-title {
    font-size: 28px;
    color: white;
    margin-bottom: 24px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h2 {
      font-size: 28px;
      color: white;
    }
  }

  .see-all {
    font-size: 14px;
    color: #b3b3b3;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.1em;
    
    &:hover {
      color: white;
    }
  }

  .grid-card-row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 24px;
  }

  .card-row {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    padding-bottom: 10px;
    &::-webkit-scrollbar {
      height: 0.5rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .card {
    background-color: rgba(24, 24, 24, 0.8);
    border-radius: 8px;
    padding: 16px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: rgba(40, 40, 40, 0.8);
      transform: translateY(-5px);

      .play-button {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card-image-container {
      position: relative;
      width: 100%;
      margin-bottom: 16px;

      img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 4px;
      }

      .play-button {
        position: absolute;
        bottom: 8px;
        right: 8px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #1db954;
        border: none;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;

        &:hover {
          background-color: #1ed760;
          transform: scale(1.1) translateY(0);
        }

        svg {
          width: 16px;
          height: 16px;
          margin-left: 2px;
        }
      }
    }

    h3 {
      font-size: 16px;
      font-weight: 700;
      color: white;
      margin-bottom: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      font-size: 14px;
      color: #b3b3b3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`; 