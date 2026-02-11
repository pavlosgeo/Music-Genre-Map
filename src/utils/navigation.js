// src/utils/navigation.js

/**
 * Finds the next node for arrow navigation.
 * Only considers directly connected neighbors.
 * Optionally, can restrict by same-family nodes.
 *
 * @param {string} currentId - current node id
 * @param {string} direction - 'ArrowUp'|'ArrowDown'|'ArrowLeft'|'ArrowRight'
 * @param {Array} nodes - list of focused nodes
 * @param {Array} edges - list of edges
 * @returns {string} - next node id
 */
export function findDirectionalNode(currentId, direction, nodes, edges) {
    const currentNode = nodes.find((n) => n.id === currentId);
    if (!currentNode) return currentId;

    // Only consider neighbors (connected by edges)
    const neighbors = edges
        .filter((e) => e.source === currentId || e.target === currentId)
        .map((e) => (e.source === currentId ? e.target : e.source))
        .map((id) => nodes.find((n) => n.id === id))
        .filter(Boolean);

    if (neighbors.length === 0) return currentId;

    // Pick neighbor in desired direction
    let bestNode = neighbors[0];
    let maxScore = -Infinity;

    neighbors.forEach((node) => {
        const dx = node.position.x - currentNode.position.x;
        const dy = node.position.y - currentNode.position.y;

        let score = -Infinity;
        switch (direction) {
            case 'ArrowRight':
                score = dx > 0 ? dx - Math.abs(dy) : -Infinity;
                break;
            case 'ArrowLeft':
                score = dx < 0 ? -dx - Math.abs(dy) : -Infinity;
                break;
            case 'ArrowDown':
                score = dy > 0 ? dy - Math.abs(dx) : -Infinity;
                break;
            case 'ArrowUp':
                score = dy < 0 ? -dy - Math.abs(dx) : -Infinity;
                break;
        }

        if (score > maxScore) {
            maxScore = score;
            bestNode = node;
        }
    });

    return bestNode.id;
}
