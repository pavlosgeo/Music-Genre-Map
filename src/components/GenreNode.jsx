import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/style.css';

const familyColors = {
  rock: '#ff6b6b',
  electronic: '#4d79ff',
  default: '#999',
};

export default function GenreNode({ data }) {
  const { genre } = data;

  return (
    <div
      className="genre-node"
      onClick={() => data.onClick && data.onClick(genre)}
      style={{
        padding: '10px 16px',
        borderRadius: '8px',
        backgroundColor: familyColors[genre.family] || familyColors.default,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'relative',
        cursor: 'pointer',
        minWidth: 140,
      }}
    >
      {genre.name}

      {/* Handles for edges */}
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />

      {/* Tooltip */}
      <div className="tooltip">
        <p><strong>Era:</strong> {genre.era}</p>
        <p><strong>Origin:</strong> {genre.origin}</p>
        <p>{genre.description}</p>
        <p><strong>Artists:</strong> {genre.artists.join(', ')}</p>
      </div>
    </div>
  );
}
