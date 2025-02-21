import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import Album from "./components/Album";
import Search from "./components/Search";
import LikedSongs from "./components/LikedSongs";
import Library from "./components/Library"; // Import the new Library component
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);

  return (
    <Router>
      <div>
        {token ? (
          <Routes>
            <Route path="/" element={<Spotify />} />
            <Route path="/album" element={<Album />} />
            <Route path="/search" element={<Search />} />
            <Route path="/liked-songs" element={<LikedSongs />} />
            <Route path="/library" element={<Library />} /> {/* New route for Library */}
          </Routes>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}