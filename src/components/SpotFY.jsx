import React from "react";
import styled from "styled-components";
import "./style.css"; // Correct the path to the CSS file

export default function SpotFY() {
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </Container>
  );
}

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Spotify UI Clone</title>
  <!-- Optional: Font Awesome for icons -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    integrity="sha512-Fo3rlrZj/k7ujTnH/Pr9yVVtiGhIClzks9zWITB4eic9G0nZSELPuD9Sxh0APNsKf6+5FaTtBc5S7nkaNPo6GA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-logo">
      <img src="/images/Spotify_Full_Logo_RGB_Green.png" alt="Spotify Logo" class="logo-img"/>
    </div>
    
    <!-- Navigation -->
    <nav class="sidebar-nav">
      <ul>
        <li><a href="#"><i class="fas fa-home"></i> Home</a></li>
        <li><a href="#"><i class="fas fa-search"></i> Search</a></li>
        <li><a href="#"><i class="fas fa-book-open"></i> Your Library</a></li>
      </ul>
    </nav>
    
    <!-- Your Library Items with images & descriptions -->
    <div class="library-section">
      <h3>Your Library</h3>
      <ul class="library-list">
        <li>
          <a href="#">
            <img src="/images/Like.jpg" alt="Liked Songs" class="library-img"/>
            <div class="library-text">
              <span class="library-title">Liked Songs</span>
              <span class="library-subtitle">Playlist • 348 songs</span>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/YourEpisodes.jpg" alt="Your Episodes" class="library-img"/>
            <div class="library-text">
              <span class="library-title">Your Episodes</span>
              <span class="library-subtitle">Saved & downloaded episodes</span>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/BeatEasyLoGO.jpg" alt="BeatEasy" class="library-img"/>
            <div class="library-text">
              <span class="library-title">BeatEasy</span>
              <span class="library-subtitle">Playlist • Milan Pramanik</span>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/Spidylogo.jpg" alt="Spider-Man: Into the Spider-Verse" class="library-img"/>
            <div class="library-text">
              <span class="library-title">Spider-Man: Into the Spider-Verse</span>
              <span class="library-subtitle">Compilation • Various Artists</span>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/Kausthub.jpg" alt="Kausthub Ravi" class="library-img"/>
            <div class="library-text">
              <span class="library-title">Kausthub Ravi</span>
              <span class="library-subtitle">Artist</span>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/Zatrix.jpg" alt="Zatrix" class="library-img"/>
            <div class="library-text">
              <span class="library-title">Zatrix</span>
              <span class="library-subtitle">Artist</span>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="/images/BrainHeart.jpg" alt="Brainheart" class="library-img"/>
            <div class="library-text">
              <span class="library-title">Brainheart</span>
              <span class="library-subtitle">Artist</span>
            </div>
          </a>
        </li>
      </ul>

      <!-- "+" icon on the right side -->
      <div class="library-add">
        <span>Add</span>
        <i class="fas fa-plus"></i>
      </div>
    </div>
    
    <!-- Sidebar Footer -->
    <div class="sidebar-footer">
      <a href="#"><i class="fas fa-cog"></i> Settings</a>
    </div>
  </aside>

  <!-- Main Content Area -->
  <main class="main-content">

    <!-- Topbar / Header with Arrows and Center Search Bar -->
    <header class="topbar">
      <div class="arrows">
        <i class="fas fa-chevron-left"></i>
        <i class="fas fa-chevron-right"></i>
      </div>
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="What do you want to play?" />
      </div>
      <div class="profile-area">
        <span class="profile-name">Milan Pramanik</span>
        <img src="/images/MilanPhotoWithout_background.png" alt="Profile" class="profile-img" />
      </div>
    </header>
    
    <!-- Subheader (All, Music, Podcasts) -->
    <nav class="filter-nav">
      <ul>
        <li><a href="#" class="active">All</a></li>
        <li><a href="#">Music</a></li>
        <li><a href="#">Podcasts</a></li>
      </ul>
    </nav>

    <!-- Example: 2-row x 4-column card grid -->
    <section class="section">
      <div class="grid-card-row">
        <div class="card">
          <img src="/images/Likedsongs.jpg" alt="Liked Songs" />
          <h3>Liked Songs</h3>
        </div>
        <div class="card">
          <img src="/images/BeatEasy.jpg" alt="BeatEasy" />
          <h3>BeatEasy</h3>
        </div>
        <div class="card">
          <img src="/images/MetroBoomin.jpg" alt="Metro Boomin" />
          <h3>Metro Boomin</h3>
        </div>
        <div class="card">
          <img src="/images/Northernlight.jpg" alt="Northern Lights" />
          <h3>Northern Lights</h3>
        </div>
        <div class="card">
          <img src="/images/CaughtinFire.jpg" alt="Caught in the Fire" />
          <h3>Caught in the Fire</h3>
        </div>
        <div class="card">
          <img src="/images/SomeWhere.jpg" alt="Somewhere" />
          <h3>Somewhere</h3>
        </div>
        <div class="card">
            <img src="/images/Human.jpg" alt="Human" />
            <h3>Human</h3>
        </div>
        <div class="card">
          <img src="/images/spiderman.jpg" alt="Spiderman" />
          <h3>Spider-Man: Into The Spider-Verse</h3>
        </div>
      </div>
    </section>

    <!-- "Made For Milan Pramanik" Section -->
    <section class="section">
      <div class="section-header">
        <h2>Made For Milan Pramanik</h2>
        <a href="#" class="see-all">Show all</a>
      </div>
      <div class="card-row">
        <div class="card">
          <img src="/images/Dailymix1.jpg" alt="Daily Mix 1" />
          <h3>Daily Mix 1</h3>
          <p>Artist info</p>
        </div>
        <div class="card">
          <img src="/images/Dailymix2.jpg" alt="Daily Mix 2" />
          <h3>Daily Mix 2</h3>
          <p>Artist info</p>
        </div>
        <div class="card">
          <img src="/images/Dailymix3.jpg" alt="Daily Mix 3" />
          <h3>Daily Mix 3</h3>
          <p>Artist info</p>
        </div>
        <div class="card">
          <img src="/images/Dailymix4.jpg" alt="Daily Mix 4" />
          <h3>Daily Mix 4</h3>
          <p>Artist info</p>
        </div>
        <div class="card">
          <img src="/images/Dailymix5.jpg" alt="Daily Mix 5" />
          <h3>Daily Mix 5</h3>
          <p>Artist info</p>
        </div>
      </div>
    </section>

  </main>

 <!-- Right Sidebar / Hummingbird Section -->
<aside class="hummingbird-section">
  <h2>Hummingbird (Metro Boomin & James Blake)</h2>
  
  <div class="hummingbird-video">
    <video 
      src="/images/WhatsApp Video 2025-02-23 at 13.27.59_42485b9c.mp4" 
      autoplay 
      muted 
      loop 
      playsinline 
      class="hummingbird-vid-element"
    >
      Your browser does not support the video tag.
    </video>
  </div>

  <!-- Optional text overlay -->
  <div class="hummingbird-overlay-text">
    <p>Enjoy the latest track from the Spider-Man: Across The Spider-Verse soundtrack.</p>
  </div>
  
  <!-- Resizer Handle -->
  <div class="resizer"></div>
</aside>


  <!-- Footer (Player) -->
  <footer class="player-footer">
    <div class="player-controls">
      <div class="player-left">
        <img src="/images/WayIam.jpg" alt="Song Cover" class="song-cover" />
        <div class="song-info">
          <span class="song-title">Way I am</span>
          <span class="song-artist">Anna Blue, Damien Dawn</span>
        </div>
      </div>
      <div class="player-center">
        <i class="fas fa-random"></i>
        <i class="fas fa-step-backward"></i>
        <i class="fas fa-play-circle"></i>
        <i class="fas fa-step-forward"></i>
        <i class="fas fa-repeat"></i>
      </div>
      <div class="player-right">
        <i class="fas fa-volume-down"></i>
        <input type="range" min="0" max="100" value="50" class="volume-slider"/>
      </div>
    </div>
  </footer>
  <script>
    const resizer = document.querySelector('.resizer');
    const sidebar = document.querySelector('.hummingbird-section');
  
    let isResizing = false;
  
    resizer.addEventListener('mousedown', function(e) {
      isResizing = true;
      document.body.style.cursor = 'ns-resize';
    });
  
    document.addEventListener('mousemove', function(e) {
      if (!isResizing) return;
      // Calculate new height based on mouse position relative to the top of the sidebar.
      const newHeight = window.innerHeight - e.clientY;
      // Set a minimum and maximum height if desired
      if (newHeight > 100 && newHeight < window.innerHeight * 2) {
        sidebar.style.height = newHeight + "px";
      }
    });
  
    document.addEventListener('mouseup', function() {
      isResizing = false;
      document.body.style.cursor = 'default';
    });
  </script>
  

</body>
</html>
`;

const Container = styled.div`
  /* Add any necessary styling here */
`;