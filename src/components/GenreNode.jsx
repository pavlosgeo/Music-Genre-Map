import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/GenreNode.css';

export default function GenreNode({ data }) {
  const { genre } = data;
  const familyClass = ['rock', 'electronic'].includes(genre.family)
    ? genre.family
    : 'default';

  return (
    <div className={`genre-node ${familyClass}`}>
      <span className="node-label">{genre.name}</span>

      {/* Tooltip */}
      <div className="tooltip">
        <p><strong>Era:</strong> {genre.era}</p>
        <p><strong>Origin:</strong> {genre.origin}</p>
        <p>{genre.description}</p>
        <p><strong>Artists:</strong> {genre.artists.join(', ')}</p>
      </div>

      <Handle type="target" position={Position.Top} style={{ background: '#555', zIndex: 10 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: '#555', zIndex: 10 }} />
    </div>
  );
}
