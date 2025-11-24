// src/pages/Favorites.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteSongs') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (songId) => {
    const updatedFavorites = favorites.filter(song => song.id !== songId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteSongs', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-container">
      <h1>Your Favorite Songs</h1>
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <i className="fas fa-heart-broken"></i>
          <p>No favorite songs yet</p>
          <Link to="/" className="browse-songs-btn">Browse Songs</Link>
        </div>
      ) : (
        <div className="favorites-list">
          {favorites.map((song, index) => (
            <div key={song.id} className="favorite-item">
              <div className="song-info">
                <span className="song-number">{index + 1}.</span>
                <div>
                  <h3>{song.title}</h3>
                  <p className="song-artist">{song.artist || 'Unknown Artist'}</p>
                </div>
              </div>
              <button 
                onClick={() => removeFromFavorites(song.id)}
                className="remove-favorite"
                aria-label="Remove from favorites"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;