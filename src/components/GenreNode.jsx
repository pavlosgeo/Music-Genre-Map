// src/components/GenreNode.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/genrenode.css';

export default function GenreNode({ data }) {
  const { genre, onClick } = data;

  // Pick the gradient class based on genre family
  const gradientClass = genre.family ? `gradient-${genre.family}` : 'gradient-default';

  return (
    <div
      className={`genre-node ${gradientClass}`}
      onClick={(event) => {
        event.stopPropagation(); // prevent React Flow canvas clicks
        onClick && onClick(genre);
      }}
    >
      {/* Genre name */}
      {genre.name}

      {/* React Flow handles */}
      <Handle type="target" position={Position.Top} className="handle" />
      <Handle type="source" position={Position.Bottom} className="handle" />

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
