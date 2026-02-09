import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../styles/style.css';

import { genres } from '../data/genres';
import { influences } from '../data/influences';
import GenreNode from '../components/GenreNode';
import SidePanel from '../components/SidePanel';
import MapBackground from '../components/MapBackground';
import dagre from 'dagre';
import { fetchSpotifyToken } from '../utils/spotifyAuth';

/* -------------------- React Flow setup -------------------- */

const nodeTypes = { genre: GenreNode };
const nodeWidth = 150;
const nodeHeight = 50;

/* -------------------- Dagre layout -------------------- */

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR' });

  nodes.forEach((node) => {
    if (!node.position) {
      dagreGraph.setNode(node.id, {
        width: nodeWidth,
        height: nodeHeight,
      });
    }
  });

  edges.forEach((edge) =>
    dagreGraph.setEdge(edge.source, edge.target)
  );

  dagre.layout(dagreGraph);

  const positionedNodes = nodes.map((node) => {
    if (node.position) return node;
    const pos = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: pos.x, y: pos.y },
    };
  });

  return { nodes: positionedNodes, edges };
};

/* -------------------- Focus helpers -------------------- */

const getConnectedNodeIds = (genreId, edges) => {
  const connected = new Set([genreId]);

  edges.forEach((edge) => {
    if (edge.source === genreId) connected.add(edge.target);
    if (edge.target === genreId) connected.add(edge.source);
  });

  return connected;
};

/* ==================== MAP PAGE ==================== */

export default function MapPage() {
  const [selectedGenre, setSelectedGenre] = useState(null);

  /* ---------- Spotify PKCE redirect ---------- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      fetchSpotifyToken(code);
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    }
  }, []);

  /* ---------- Raw nodes ---------- */

  const rawNodes = useMemo(
    () =>
      genres.map((g) => ({
        id: g.id,
        type: 'genre',
        data: {
          genre: g,
          onClick: (genre) => setSelectedGenre(genre),
          isSelected: false,
          isDimmed: false,
        },
      })),
    []
  );

  /* ---------- Raw edges ---------- */

  const rawEdges = useMemo(
    () =>
      influences.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        type: 'smoothstep',
        animated: true,
        style: {
          stroke: 'url(#edge-gradient)',
          strokeWidth: 2,
          strokeDasharray: '8 10',
          strokeLinecap: 'round',
          animation: 'edgePulse 14s linear infinite',
          filter:
            'drop-shadow(0 0 6px rgba(255,255,255,0.15))',
        },
      })),
    []
  );

  /* ---------- Layouted graph ---------- */

  const { nodes, edges } = useMemo(
    () => getLayoutedElements(rawNodes, rawEdges),
    [rawNodes, rawEdges]
  );

  /* ---------- Focus logic ---------- */

  const focusNodeIds = useMemo(() => {
    if (!selectedGenre) return null;
    return getConnectedNodeIds(selectedGenre.id, edges);
  }, [selectedGenre, edges]);

  const focusedNodes = useMemo(() => {
    return nodes.map((node) => {
      if (!focusNodeIds) {
        return {
          ...node,
          data: {
            ...node.data,
            isSelected: false,
            isDimmed: false,
          },
        };
      }

      const isSelected = selectedGenre?.id === node.id;
      const isFocused = focusNodeIds.has(node.id);

      return {
        ...node,
        data: {
          ...node.data,
          isSelected,
          isDimmed: !isFocused,
        },
      };
    });
  }, [nodes, focusNodeIds, selectedGenre]);

  const focusedEdges = useMemo(() => {
    return edges.map((edge) => {
      if (!focusNodeIds) return edge;

      const isFocused =
        focusNodeIds.has(edge.source) &&
        focusNodeIds.has(edge.target);

      return {
        ...edge,
        className: isFocused
          ? 'edge--focused'
          : 'edge--dimmed',
      };
    });
  }, [edges, focusNodeIds]);

  /* ---------- React Flow instance ---------- */

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState(null);

  useEffect(() => {
    if (!reactFlowInstance) return;

    reactFlowInstance.fitView({
      padding: 0.2,
      minZoom: 0.9,
      maxZoom: 1,
    });

    reactFlowInstance.setViewport({
      ...reactFlowInstance.getViewport(),
      zoom: 0.95,
    });
  }, [reactFlowInstance]);

  /* ==================== RENDER ==================== */

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <MapBackground selectedGenre={selectedGenre} />

      <div className="reactflow-wrapper">
        <ReactFlow
          nodes={focusedNodes}
          edges={focusedEdges}
          nodeTypes={nodeTypes}
          fitView={false}
          onInit={setReactFlowInstance}
          onPaneClick={() => setSelectedGenre(null)}
        >
          <svg
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
            }}
          >
            <defs>
              <linearGradient
                id="edge-gradient"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(255,255,255,0.15)"
                />
                <stop
                  offset="50%"
                  stopColor="rgba(255,255,255,0.45)"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(255,255,255,0.15)"
                />
              </linearGradient>
            </defs>
          </svg>

          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      <SidePanel
        genre={selectedGenre}
        onClose={() => setSelectedGenre(null)}
      />
    </div>
  );
}
