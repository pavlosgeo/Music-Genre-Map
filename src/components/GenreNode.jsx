import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/genrenode.css';

export default function GenreNode({ data }) {
  const { genre, onClick } = data;

  const gradientClass = `gradient-${genre.id}` || 'gradient-default';

  return (
    <div
      className={`genre-node ${gradientClass}`}
      onClick={(event) => {
        event.stopPropagation();
        onClick && onClick(genre);
      }}
    >
      {genre.name}

      <Handle type="target" position={Position.Top} className="handle" />
      <Handle type="source" position={Position.Bottom} className="handle" />

      <div className="tooltip">
        <p><strong>Era:</strong> {genre.era}</p>
        <p><strong>Origin:</strong> {genre.origin}</p>
        <p>{genre.description}</p>
        <p><strong>Artists:</strong> {genre.artists.join(', ')}</p>
      </div>
    </div>
  );
}
