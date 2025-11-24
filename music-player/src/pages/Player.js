// src/pages/Player.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SongItem from '../components/SongItem';
import './Player.css';

const Player = ({ user, onLogout }) => {
  const [songs, setSongs] = useState([
    { id: 1, title: 'HIM 1', artist: 'Karan', src: '/songs/song1.mp3' },
    { id: 2, title: 'Song 2', artist: 'Aujla', src: '/songs/song2.mp3' },
    { id: 3, title: 'HIM 3', artist: 'Karan Aujla', src: '/songs/song3.mp3' },

  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Handle play/pause
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle time update
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Handle next song
  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => 
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(true);
  };

  // Handle previous song
  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) => 
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };

  // Handle song end
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSongIndex, isPlaying]);

  // Update document title with current song
  useEffect(() => {
    if (songs.length > 0) {
      document.title = `${songs[currentSongIndex].title} - Music Player`;
    }
    return () => {
      document.title = 'Music Player';
    };
  }, [currentSongIndex, songs]);

  return (
    <div className="player-container">
      <header className="player-header">
        <div className="brand">Music Player</div>
        <div className="user-info">
          <span>{user?.name}</span>
          <button onClick={() => navigate('/profile')} className="profile-btn">
            Profile
          </button>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      
      <div className="now-playing">
        <h2>Now Playing</h2>
        {songs.length > 0 && (
          <div className="current-song">
            <h3>{songs[currentSongIndex]?.title}</h3>
            <p>{songs[currentSongIndex]?.artist}</p>
          </div>
        )}
        <div className="player-controls">
          <button onClick={handlePrevious} className="control-btn">
            ⏮
          </button>
          <button onClick={handlePlayPause} className="play-pause-btn">
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={handleNext} className="control-btn">
            ⏭
          </button>
        </div>
        <div className="progress-container">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            value={currentTime}
            max={duration || 0}
            onChange={(e) => {
              const time = parseFloat(e.target.value);
              setCurrentTime(time);
              if (audioRef.current) {
                audioRef.current.currentTime = time;
              }
            }}
            className="progress-bar"
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="playlist">
        <h3>Your Playlist</h3>
        <div className="songs-list">
          {songs.map((song, index) => (
            <SongItem
              key={song.id}
              song={song}
              isPlaying={isPlaying && currentSongIndex === index}
              isCurrent={currentSongIndex === index}
              onPlayPause={() => {
                if (currentSongIndex === index) {
                  handlePlayPause();
                } else {
                  setCurrentSongIndex(index);
                  setIsPlaying(true);
                }
              }}
            />
          ))}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={songs[currentSongIndex]?.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />
    </div>
  );
};

// Helper function to format time
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default Player;