// src/components/SongItem.js
import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaPlay, FaPause } from 'react-icons/fa';
import './SongItem.css';

const SongItem = ({ song, isPlaying, onPlayPause, isCurrent }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if song is in favorites
    const favorites = JSON.parse(localStorage.getItem('favoriteSongs') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === song.id));
  }, [song.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favoriteSongs') || '[]');
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== song.id);
      localStorage.setItem('favoriteSongs', JSON.stringify(updatedFavorites));
    } else {
      localStorage.setItem('favoriteSongs', JSON.stringify([...favorites, song]));
    }
    
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className={`song-item ${isCurrent ? 'active' : ''}`}
      onClick={() => onPlayPause()}
    >
      <div className="song-info">
        <div className="song-cover">
          {isCurrent && isPlaying ? (
            <FaPause className="play-icon" />
          ) : (
            <FaPlay className="play-icon" />
          )}
        </div>
        <div>
          <h4>{song.title}</h4>
          <p className="artist">{song.artist || 'Unknown Artist'}</p>
        </div>
      </div>
      <button 
        className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
        onClick={toggleFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default SongItem;