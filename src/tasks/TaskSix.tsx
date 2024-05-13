import React, { useState, useEffect } from 'react';

interface Edge {
  from: number;
  to: number;
  weight: number;
}

interface Graph {
  vertices: number[];
  edges: Edge[];
}

const graph: Graph = {
  vertices: [1, 2, 3, 4, 5, 6],
  edges: [
    { from: 1, to: 4, weight: 2 },
    { from: 1, to: 5, weight: 4 },
    { from: 2, to: 4, weight: 2 },
    { from: 2, to: 3, weight: 2 },
    { from: 2, to: 6, weight: 3 },
    { from: 4, to: 6, weight: 1 },
    { from: 3, to: 6, weight: 1 },
    { from: 3, to: 4, weight: 1 },
  ],
};

const TaskSix: React.FC = () => {
  const [minSpans, setMinSpans] = useState<Edge[][]>([]);

  useEffect(() => {
    const allSubsets = generateAllSubsets(graph.edges);
    let minSpanCost = Infinity;
    let minSpanSet: Edge[][] = [];

    for (const subset of allSubsets) {
      if (isSpan(graph, subset)) {
        const subsetWeight = calculateWeight(subset);
        if (subsetWeight < minSpanCost) {
          minSpanSet = [subset];
          minSpanCost = subsetWeight;
        } else if (subsetWeight === minSpanCost) {
          minSpanSet.push(subset);
        }
      }
    }

    setMinSpans(minSpanSet);
  }, []);

  return (
    <div>
      <h2>Остовы минимальной длины:</h2>
      {minSpans.map((minSpan, index) => (
        <div key={index}>
          <p>Остов {index + 1}:</p>
          <ul>
            {minSpan.map((edge, i) => (
              <li key={i}>
                {edge.from} - {edge.to} ({edge.weight})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const generateAllSubsets = (edges: Edge[]): Edge[][] => {
  const subsets: Edge[][] = [[]];

  for (const edge of edges) {
    const newSubsets = subsets.map(subset => [...subset, edge]);
    subsets.push(...newSubsets);
  }

  return subsets;
};

const isSpan = (graph: Graph, subset: Edge[]): boolean => {
  const verticesSet = new Set(graph.vertices);
  const visited = new Set<number>();

  for (const edge of subset) {
    visited.add(edge.from);
    visited.add(edge.to);
  }

  if (visited.size !== verticesSet.size) {
    return false;
  }

  const adjacencyMatrix = createAdjacencyMatrix(graph, subset);
  const connectedComponents = dfs(adjacencyMatrix);

  return connectedComponents === 1;
};

const createAdjacencyMatrix = (graph: Graph, subset: Edge[]): number[][] => {
  const matrix: number[][] = Array.from(Array(graph.vertices.length), () =>
    Array(graph.vertices.length).fill(0)
  );

  for (const edge of subset) {
    matrix[edge.from - 1][edge.to - 1] = 1;
    matrix[edge.to - 1][edge.from - 1] = 1; // Неориентированный граф
  }

  return matrix;
};

const dfs = (adjacencyMatrix: number[][]): number => {
  const visited = new Set<number>();
  let connectedComponents = 0;

  for (let i = 0; i < adjacencyMatrix.length; i++) {
    if (!visited.has(i)) {
      connectedComponents++;
      dfsUtil(i, adjacencyMatrix, visited);
    }
  }

  return connectedComponents;
};

const dfsUtil = (vertex: number, adjacencyMatrix: number[][], visited: Set<number>): void => {
  visited.add(vertex);

  for (let i = 0; i < adjacencyMatrix[vertex].length; i++) {
    if (adjacencyMatrix[vertex][i] === 1 && !visited.has(i)) {
      dfsUtil(i, adjacencyMatrix, visited);
    }
  }
};

const calculateWeight = (edges: Edge[]): number => {
  let weight = 0;
  for (const edge of edges) {
    weight += edge.weight;
  }
  return weight;
};

export default TaskSix;
