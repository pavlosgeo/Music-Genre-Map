import React from 'react';
import '../styles/style.css';

export default function SidePanel({ genre, onClose }) {
  if (!genre) return null;

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
    <div className="artist-list">
      {genre.artists.map(a => (
        <span key={a} className="artist-tag">{a}</span>
      ))}
    </div>
  </div>
</div>

  );
}
