import React from 'react';
import '../styles/SidePanel.css';

export default function SidePanel({ genre, onClose }) {
  if (!genre) return null;

  return (
    <div className="side-panel">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>{genre.name}</h2>
      <p><strong>Era:</strong> {genre.era}</p>
      <p><strong>Origin:</strong> {genre.origin}</p>
      <p>{genre.description}</p>
      <p><strong>Artists:</strong> {genre.artists.join(', ')}</p>
    </div>
  );
}
