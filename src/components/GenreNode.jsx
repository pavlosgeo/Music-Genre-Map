import { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Handle, Position } from 'reactflow';
import '../styles/GenreNode.css';

export default function GenreNode({ data }) {
  const { genre, onClick, isSelected, isDimmed } = data;

  const nodeRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!hovered || !nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    setTooltipPos({
      top: rect.bottom + 8,
      left: rect.left + rect.width / 2,
    });
  }, [hovered]);

  return (
    <>
      <div
        ref={nodeRef}
        className={`
          genre-node
          gradient-${genre.id}
          ${isSelected ? 'is-selected is-keyboard' : ''}
          ${isDimmed ? 'is-dimmed' : ''}
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick(genre)}
      >
        {genre.name}

        <Handle type="target" position={Position.Left} className="handle" />
        <Handle type="source" position={Position.Right} className="handle" />
      </div>

      {hovered &&
        createPortal(
          <div
            className="tooltip tooltip--visible"
            style={{
              top: tooltipPos.top,
              left: tooltipPos.left,
            }}
          >
            <p><strong>Era:</strong> {genre.era}</p>
            <p><strong>Origin:</strong> {genre.origin}</p>
            <p>{genre.description}</p>
          </div>,
          document.body
        )}
    </>
  );
}
