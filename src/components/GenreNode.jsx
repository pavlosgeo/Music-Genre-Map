import React from 'react';
import { Handle, Position } from 'reactflow';

const familyColors = {
  rock: '#ff6b6b',
  electronic: '#4d79ff',
  default: '#999',
};

export default function GenreNode({ data }) {
  const { genre } = data;

  return (
    <div
      style={{
        padding: '10px 16px',
        borderRadius: '8px',
        backgroundColor: familyColors[genre.family] || familyColors.default,
        color: '#fff',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      {genre.name}
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </div>
  );
}
