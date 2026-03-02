import React from 'react';
import '../styles/SidePanel.css';
import ArtistTag from './ArtistTag';
import { getSpotifyToken } from '../utils/spotifyAuth';

export default function SidePanel({ genre, onClose }) {
  if (!genre) return null;

  // 🔑 Get Spotify token (assumes you already store it elsewhere)
  const spotifyToken = getSpotifyToken();

  return (
    <div className="side-panel">
      <button onClick={onClose} className="close-btn">x</button>

      <h2 className="genre-title">{genre.name}</h2>

      <div className="genre-meta">
        <span className="meta-item">
          <span className="meta-label">Era:</span> {genre.era}
        </span>
        <span className="meta-item">
          <span className="meta-label">Origin:</span> {genre.origin}
        </span>
      </div>

      <div className="genre-description">
        {genre.description}
      </div>

      <div className="genre-artists">
        <span className="section-label">Artists</span>

        {/* 🎵 Spotify-powered artist tags */}
        <div className="artist-list">
          {genre.artists.map((name) => (
            <ArtistTag
              key={name}
              name={name}
              spotifyToken={spotifyToken}
            />
          ))}
        </div>
      </div>

      {genre.roots && (
        <div className="genre-roots">
          <span className="section-label">Roots & History</span>
          <p>{genre.roots}</p>
        </div>
      )}
    </div>
  );
}
