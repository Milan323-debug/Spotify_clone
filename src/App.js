import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import Album from "./components/Album";
import Search from "./components/Search";
import LikedSongs from "./components/LikedSongs";
import Library from "./components/Library";
import Home from "./components/Home";
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
        {!token ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/spotify" element={<Spotify />} />
            <Route path="/album" element={<Album />} />
            <Route path="/search" element={<Search />} />
            <Route path="/liked-songs" element={<LikedSongs />} />
            <Route path="/library" element={<Library />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}