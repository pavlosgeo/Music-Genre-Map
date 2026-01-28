import React, { useMemo, useState } from 'react';
import ReactFlow, { Controls, MiniMap, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import '../styles/style.css';
import { genres } from '../data/genres';
import { influences } from '../data/influences';
import GenreNode from '../components/GenreNode';
import dagre from 'dagre';

const nodeTypes = { genre: GenreNode };
const nodeWidth = 150;
const nodeHeight = 50;

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR' }); // Left → Right

  nodes.forEach((node) => dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight }));
  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

  dagre.layout(dagreGraph);

  const positionedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
    };
  });

  return { nodes: positionedNodes, edges };
};

export default function MapPage() {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const rawNodes = useMemo(
    () =>
      genres.map((g) => ({
        id: g.id,
        type: 'genre',
        data: { label: g.name, genre: g },
      })),
    []
  );

  const rawEdges = useMemo(
    () =>
      influences.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        animated: true,
        style: { stroke: '#888', strokeWidth: 2 },
      })),
    []
  );

  const { nodes, edges } = useMemo(() => getLayoutedElements(rawNodes, rawEdges), [rawNodes, rawEdges]);

  const onNodeClick = (_, node) => setSelectedGenre(node.data.genre);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      <div className="reactflow-wrapper">
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodeClick={onNodeClick} fitView>
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>

      {selectedGenre && (
        <div className="side-panel">
          <h2>{selectedGenre.name}</h2>
          <p>
            <strong>Era:</strong> {selectedGenre.era}
          </p>
          <p>
            <strong>Origin:</strong> {selectedGenre.origin}
          </p>
          <p>{selectedGenre.description}</p>
          <p>
            <strong>Artists:</strong> {selectedGenre.artists.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
