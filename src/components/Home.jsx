import React from 'react';
import styled from 'styled-components';
import WebPlayback from './WebPlayback';
// Import images
import likedSongsImg from '../assets/Likedsongs.jpg';
import beatEasyImg from '../assets/BeatEasy.jpg';
import metroBoominImg from '../assets/MetroBoomin.jpg';
import northernLightImg from '../assets/Northernlight.jpg';
import caughtInFireImg from '../assets/CaughtinFire.jpg';
import someWhereImg from '../assets/SomeWhere.jpg';
import humanImg from '../assets/Human.jpg';
import spidermanImg from '../assets/spiderman.jpg';
import dailyMix1Img from '../assets/Dailymix1.jpg';
import dailyMix2Img from '../assets/Dailymix2.jpg';
import dailyMix3Img from '../assets/Dailymix3.jpg';
import dailyMix4Img from '../assets/Dailymix4.jpg';
import dailyMix5Img from '../assets/Dailymix5.jpg';
import { useStateProvider } from "../utils/StateProvider";

export default function Home() {
  const [{ token }] = useStateProvider();

  const playTrack = async (uri) => {
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
  };

  return (
    <Container>
      <main className="main-content">
        {/* Web Playback */}
        <WebPlayback />

        {/* Grid Cards Section */}
        <section className="section">
          <div className="grid-card-row">
            <div className="card" onClick={() => playTrack('spotify:track:your_track_id_1')}>
              <img src={likedSongsImg} alt="Liked Songs" />
              <h3>Liked Songs</h3>
            </div>
            <div className="card" onClick={() => playTrack('spotify:track:your_track_id_2')}>
              <img src={beatEasyImg} alt="BeatEasy" />
              <h3>BeatEasy</h3>
            </div>
            <div className="card" onClick={() => playTrack('spotify:track:your_track_id_3')}>
              <img src={metroBoominImg} alt="Metro Boomin" />
              <h3>Metro Boomin</h3>
            </div>
            <div className="card" onClick={() => playTrack('spotify:track:your_track_id_4')}>
              <img src={northernLightImg} alt="Northern Lights" />
              <h3>Northern Lights</h3>
            </div>
            <div className="card" onClick={() => playTrack('spotify:track:your_track_id_5')}>
              <img src={caughtInFireImg} alt="Caught in the Fire" />
              <h3>Caught in the Fire</h3>
            </div>
            <div className="card" onClick={() => playTrack('spotify:track:your_track_id_6')}>
              <img src={someWhereImg} alt="Somewhere" />
              <h3>Somewhere</h3>
            </div>
            <div className="card" onClick={() => playTrack('spotify:track:your_track_id_7')}>
              <img src={humanImg} alt="Human" />
              <h3>Human</h3>
            </div>
            <div className="card" onClick={() => playTrack('spotify:track:your_track_id_8')}>
              <img src={spidermanImg} alt="Spiderman" />
              <h3>Spider-Man: Into The Spider-Verse</h3>
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
            <div className="card" onClick={() => playTrack('spotify:track:your_daily_mix_1')}>
              <img src={dailyMix1Img} alt="Daily Mix 1" />
              <h3>Daily Mix 1</h3>
              <p>Artist info</p>
            </div>
            <div className="card" onClick={() => playTrack('spotify:track:your_daily_mix_2')}>
              <img src={dailyMix2Img} alt="Daily Mix 2" />
              <h3>Daily Mix 2</h3>
              <p>Artist info</p>
            </div>
            <div className="card" onClick={() => playTrack('spotify:track:your_daily_mix_3')}>
              <img src={dailyMix3Img} alt="Daily Mix 3" />
              <h3>Daily Mix 3</h3>
              <p>Artist info</p>
            </div>
            <div className="card" onClick={() => playTrack('spotify:track:your_daily_mix_4')}>
              <img src={dailyMix4Img} alt="Daily Mix 4" />
              <h3>Daily Mix 4</h3>
              <p>Artist info</p>
            </div>
            <div className="card" onClick={() => playTrack('spotify:track:your_daily_mix_5')}>
              <img src={dailyMix5Img} alt="Daily Mix 5" />
              <h3>Daily Mix 5</h3>
              <p>Artist info</p>
            </div>
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