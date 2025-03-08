import React from 'react';
import styled from 'styled-components';
import WebPlayback from './WebPlayback';
import { useStateProvider } from "../utils/StateProvider";

// Define a default image URL
const defaultImage = 'https://i.scdn.co/image/ab67616d0000b273af52c228c9619ff6298b08cd';

// Define track data
const tracks = {
  likedSongs: {
    uri: 'spotify:track:7qiZfU4dY1lWllzX7mPBI3',
    title: 'Shape of You',
    artist: 'Ed Sheeran'
  },
  beatEasy: {
    uri: 'spotify:track:1mWdTewIgB3gtBM3TOSFhB',
    title: 'Blinding Lights',
    artist: 'The Weeknd'
  },
  metroBookin: {
    uri: 'spotify:track:3nqQXoyQOWXiESFLlDF1hG',
    title: 'Superhero',
    artist: 'Metro Boomin'
  },
  northernLights: {
    uri: 'spotify:track:0VjIjW4GlUZAMYd2vXMi3b',
    title: 'Blinding Lights',
    artist: 'The Weeknd'
  },
  caughtInFire: {
    uri: 'spotify:track:7KXjTSCq5nL1LoYtL7XAwS',
    title: 'STAY',
    artist: 'The Kid LAROI'
  },
  somewhere: {
    uri: 'spotify:track:2LBqCSwhJGcFQeTHMVGwy3',
    title: 'Die For You',
    artist: 'The Weeknd'
  },
  human: {
    uri: 'spotify:track:0e4HHoOy2TuYuHEgFKbBqT',
    title: 'Human',
    artist: 'Rag\'n\'Bone Man'
  },
  spiderman: {
    uri: 'spotify:track:6nSwOQMpl1SoTZyj9Iv7VF',
    title: 'Sunflower',
    artist: 'Post Malone'
  }
};

const dailyMixes = [
  {
    uri: 'spotify:track:0V3wPSX9ygBnCm8psDIegu',
    title: 'Anti-Hero',
    artist: 'Taylor Swift'
  },
  {
    uri: 'spotify:track:4fouWK6XVHhzl78KzQ1UjL',
    title: 'MONEY',
    artist: 'LISA'
  },
  {
    uri: 'spotify:track:3DarAbFujv6eYNliUTyqtz',
    title: 'Starboy',
    artist: 'The Weeknd'
  },
  {
    uri: 'spotify:track:1zi7xx7UVEFkmKfv06H8x0',
    title: 'One Dance',
    artist: 'Drake'
  },
  {
    uri: 'spotify:track:7qEHsqek33rTcFNT9PFqLf',
    title: 'Someone You Loved',
    artist: 'Lewis Capaldi'
  }
];

export default function Home() {
  const [{ token }] = useStateProvider();

  const playTrack = async (uri) => {
    try {
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

  return (
    <Container>
      <main className="main-content">
        {/* Web Playback */}
        <WebPlayback />

        {/* Grid Cards Section */}
        <section className="section">
          <div className="grid-card-row">
            <div className="card" onClick={() => playTrack(tracks.likedSongs.uri)}>
              <img src={defaultImage} alt={tracks.likedSongs.title} />
              <h3>{tracks.likedSongs.title}</h3>
              <p>{tracks.likedSongs.artist}</p>
            </div>
            <div className="card" onClick={() => playTrack(tracks.beatEasy.uri)}>
              <img src={defaultImage} alt={tracks.beatEasy.title} />
              <h3>{tracks.beatEasy.title}</h3>
              <p>{tracks.beatEasy.artist}</p>
            </div>
            <div className="card" onClick={() => playTrack(tracks.metroBookin.uri)}>
              <img src={defaultImage} alt={tracks.metroBookin.title} />
              <h3>{tracks.metroBookin.title}</h3>
              <p>{tracks.metroBookin.artist}</p>
            </div>
            <div className="card" onClick={() => playTrack(tracks.northernLights.uri)}>
              <img src={defaultImage} alt={tracks.northernLights.title} />
              <h3>{tracks.northernLights.title}</h3>
              <p>{tracks.northernLights.artist}</p>
            </div>
            <div className="card" onClick={() => playTrack(tracks.caughtInFire.uri)}>
              <img src={defaultImage} alt={tracks.caughtInFire.title} />
              <h3>{tracks.caughtInFire.title}</h3>
              <p>{tracks.caughtInFire.artist}</p>
            </div>
            <div className="card" onClick={() => playTrack(tracks.somewhere.uri)}>
              <img src={defaultImage} alt={tracks.somewhere.title} />
              <h3>{tracks.somewhere.title}</h3>
              <p>{tracks.somewhere.artist}</p>
            </div>
            <div className="card" onClick={() => playTrack(tracks.human.uri)}>
              <img src={defaultImage} alt={tracks.human.title} />
              <h3>{tracks.human.title}</h3>
              <p>{tracks.human.artist}</p>
            </div>
            <div className="card" onClick={() => playTrack(tracks.spiderman.uri)}>
              <img src={defaultImage} alt={tracks.spiderman.title} />
              <h3>{tracks.spiderman.title}</h3>
              <p>{tracks.spiderman.artist}</p>
            </div>
          </div>
        </section>

        {/* Made For You Section */}
        <section className="section">
          <div className="section-header">
            <h2>Made For You</h2>
            <a href="#" className="see-all">Show all</a>
          </div>
          <div className="card-row">
            {dailyMixes.map((mix, index) => (
              <div key={index} className="card" onClick={() => playTrack(mix.uri)}>
                <img src={defaultImage} alt={mix.title} />
                <h3>{mix.title}</h3>
                <p>{mix.artist}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Container>
  );
}

const Container = styled.div`
  .main-content {
    margin-left: 230px;
    margin-right: 260px;
    padding: 20px;
    min-height: 100vh;
    background-color: #121212;
  }

  .section {
    margin-bottom: 30px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .section-header h2 {
    font-size: 20px;
    color: white;
  }

  .see-all {
    font-size: 14px;
    color: #b3b3b3;
    text-decoration: none;
    &:hover {
      color: white;
    }
  }

  .grid-card-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .card-row {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 10px;
  }

  .card {
    background-color: #181818;
    width: 100%;
    border-radius: 8px;
    padding: 10px;
    text-align: left;
    transition: background-color 0.3s ease, transform 0.3s ease;
    cursor: pointer;

    img {
      width: 100%;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 14px;
      margin-bottom: 6px;
      color: white;
    }

    p {
      font-size: 12px;
      color: #b3b3b3;
    }

    &:hover {
      background-color: #282828;
      transform: scale(1.05);
    }
  }
`; 