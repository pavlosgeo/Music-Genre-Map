import React, { useState, useMemo } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import '../styles/style.css';
import { genres } from '../data/genres';
import { influences } from '../data/influences';
import GenreNode from '../components/GenreNode';
import SidePanel from '../components/SidePanel';
import MapBackground from '../components/MapBackground';
import dagre from 'dagre';

const nodeTypes = { genre: GenreNode };
const nodeWidth = 150;
const nodeHeight = 50;

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR' });

  nodes.forEach((node) => {
    if (!node.position) dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);

  const positionedNodes = nodes.map((node) => {
    if (node.position) return node;
    const pos = dagreGraph.node(node.id);
    return { ...node, position: { x: pos.x, y: pos.y } };
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
        data: { genre: g, onClick: (genre) => setSelectedGenre(genre) },
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

  const { nodes, edges } = useMemo(() => getLayoutedElements(rawNodes, rawEdges), [
    rawNodes,
    rawEdges,
  ]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* 🔥 Dynamic Unsplash background */}
      <MapBackground selectedGenre={selectedGenre} />

      {/* React Flow canvas */}
      <div className="reactflow-wrapper" style={{ flex: 1 }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      {/* Side panel */}
      <SidePanel genre={selectedGenre} onClose={() => setSelectedGenre(null)} />
    </div>
  );
}
