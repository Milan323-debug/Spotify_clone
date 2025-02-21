import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [{ token }] = useStateProvider();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      setResults(response.data.albums.items);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Container>
      {/* Top search bar area */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <div className="search-input">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="What do you want to play?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Results section */}
      <div className="results">
        {results.map((album) => (
          <div key={album.id} className="album">
            <div className="album__image">
              {album.images && album.images.length > 0 ? (
                <img src={album.images[0].url} alt={album.name} />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="album__info">
              <h3>{album.name}</h3>
              <p>{album.artists.map((artist) => artist.name).join(", ")}</p>
              <p>{album.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #121212;
  min-height: 100vh;
  width: 100%;
  color: #fff;
  padding: 2rem;

  .search-bar {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    form {
      display: flex;
      align-items: center;
      gap: 1rem;
      background-color: #181818;
      padding: 0.75rem 1rem;
      border-radius: 50px; /* Rounded container */
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

      .search-input {
        position: relative;
        display: flex;
        align-items: center;

        .search-icon {
          position: absolute;
          left: 0.75rem;
          color: #b3b3b3;
          font-size: 1rem;
        }

        input {
          width: 300px;
          padding: 0.5rem 0.5rem 0.5rem 2rem; /* Extra left padding for icon */
          border: none;
          border-radius: 50px;
          background-color: #282828;
          color: #fff;
          outline: none;
          font-size: 1rem;
        }
      }

      button {
        padding: 0.5rem 1.2rem;
        border: none;
        border-radius: 50px;
        background-color: #1db954;
        color: #fff;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: #1ed760;
        }
      }
    }
  }

  .results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1.5rem;

    .album {
      display: flex;
      background-color: #181818;
      padding: 1rem;
      border-radius: 8px;
      gap: 1rem;
      transition: background-color 0.2s ease-in-out;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

      &:hover {
        background-color: #282828;
      }

      .album__image {
        img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 4px;
        }
      }

      .album__info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h3 {
          margin: 0;
          font-size: 1.1rem;
          margin-bottom: 0.3rem;
        }

        p {
          margin: 0.1rem 0;
          font-size: 0.9rem;
          color: #b3b3b3;
        }
      }
    }
  }
`;
