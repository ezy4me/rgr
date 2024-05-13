// const matrix: number[][] = [
//     [120, 322, 116, 643, 671],
//     [337, 122, 345, 321, 533],
//     [351, 246, 754, 212, 245],
//     [357, 678, 553, 754, 785],
//     [223, 334, 553, 335, 769],
//   ];

import React, { useEffect, useState } from "react";

const matrix = [
  [530, 521, 402, 542, 133, 621, 420],
  [734, 219, 673, 651, 544, 762, 224],
  [456, 776, 443, 622, 632, 511, 299],
  [877, 446, 840, 300, 542, 631, 461],
  [432, 112, 532, 762, 544, 226, 331],
  [633, 422, 773, 533, 721, 652, 507],
  [238, 232, 645, 761, 354, 631, 162],
];

const graph: number[][] = [];

// Создаем граф на основе матрицы
for (let i = 0; i < matrix.length; i++) {
  for (let j = i + 1; j < matrix[i].length; j++) {
    if (matrix[i][j] > 0) {
      graph.push([i + 1, j + 1]);
    }
  }
}

const foundCycles: number[][] = []; // Массив для хранения всех найденных циклов

const findNewCycles = (path: number[], visited: Set<number>) => {
  const startNode = path[0];
  let nextNode: number | null = null;
  let sub: number[] = [];

  // Посещаем каждое ребро и каждый узел этого ребра
  for (const edge of graph) {
    const [node1, node2] = edge;
    if (edge.includes(startNode)) {
      nextNode = node1 === startNode ? node2 : node1;
    }
    if (notVisited(nextNode!, path, visited)) {
      // Соседний узел еще не в пути
      sub = [nextNode!, ...path];
      // Исследуем расширенный путь
      findNewCycles(sub, visited);
    } else if (
      path.length === matrix.length &&
      nextNode === path[path.length - 1] &&
      !visited.has(nextNode!)
    ) {
      // Найден цикл, содержащий все пункты
      const p = rotateToSmallest(path);
      const inv = invert(p);

      // Проверяем на дубликаты перед добавлением в foundCycles
      if (!isDuplicate(p) && !isDuplicate(inv) && !isDuplicateRoute(p)) {
        foundCycles.push(p);
      }
    }
  }
};

const isDuplicateRoute = (path: number[]) => {
  const p = JSON.stringify(path);
  for (const cycle of foundCycles) {
    if (p === JSON.stringify(cycle)) {
      return true;
    }
  }
  return false;
};

const invert = (path: number[]) => {
  return rotateToSmallest([...path].reverse());
};

// Поворачиваем циклический путь так, чтобы он начинался с наименьшего узла
const rotateToSmallest = (path: number[]) => {
  const n = path.indexOf(Math.min(...path));
  return path.slice(n).concat(path.slice(0, n));
};

const isDuplicate = (path: number[]) => {
  // Эффективно проверяем на дубликаты с использованием множества
  const pathSet = new Set(path);
  return pathSet.size !== path.length; // Дубликаты приводят к меньшему размеру
};

const notVisited = (node: number, path: number[], visited: Set<number>) => {
  return !path.includes(node) && !visited.has(node); // Простая проверка без JSON.stringify
};

const TaskFour: React.FC = () => {
  const [allRoutes, setAllRoutes] = useState<string[]>([]);
  const [allCosts, setAllCosts] = useState<number[]>([]);
  const [minCostRoute, setMinCostRoute] = useState<string>("");
  const [minCost, setMinCost] = useState<number | null>(null);

  useEffect(() => {
    const visitedNodes = new Set<number>(); // Создаем множество для отслеживания посещенных узлов
    for (const edge of graph) {
      for (const node of edge) {
        findNewCycles([node], visitedNodes);
        visitedNodes.add(node); // Добавляем посещенные узлы в множество
      }
    }

    const routes = foundCycles.map((cycle) => cycle.join(", "));
    const costs = foundCycles.map((cycle) => calculateCost(cycle));

    setAllRoutes(routes);
    setAllCosts(costs);

    const minRouteIndex = costs.indexOf(Math.min(...costs));
    setMinCostRoute(routes[minRouteIndex]);
    setMinCost(costs[minRouteIndex]);
  }, []);

  const calculateCost = (route: number[]) => {
    let cost = 0;
    for (let i = 0; i < route.length - 1; i++) {
      cost += matrix[route[i] - 1][route[i + 1] - 1];
    }
    cost += matrix[route[route.length - 1] - 1][route[0] - 1];
    return cost;
  };

  return (
    <div>
      <h2>All Found Routes and Costs:</h2>
      <table>
        <thead>
          <tr>
            <th>№ Маршрут</th>
            <th>Маршрут</th>
            <th>Стоимость</th>
          </tr>
        </thead>
        <tbody>
          {allRoutes.map((route, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{route}</td>
              <td>{allCosts[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {minCost && minCostRoute && (
        <div>
          <h2>Minimum Cost Route:</h2>
          <p>Route: {minCostRoute}</p>
          <p>Cost: {minCost}</p>
        </div>
      )}
    </div>
  );
};

export default TaskFour;
