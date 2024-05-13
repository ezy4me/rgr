import React, { useEffect, useState } from "react";

// Функция для генерации сочетаний элементов множества A
const generateCombinationsA = (elements: string[], k: number): string[][] => {
  const combinations: string[][] = [];
  const generate = (start: number, prefix: string[]) => {
    if (prefix.length === k) {
      combinations.push(prefix);
      return;
    }
    for (let i = start; i < elements.length; i++) {
      generate(i + 1, [...prefix, elements[i]]);
    }
  };
  generate(0, []);
  return combinations;
};

// Функция для генерации сочетаний с повторениями элементов множества B
const generateCombinationsB = (elements: string[], k: number, constraints: { [key: string]: number }): string[][] => {
  const combinations: string[][] = [];
  const generate = (index: number, prefix: string[]) => {
    if (prefix.length === k) {
      combinations.push(prefix);
      return;
    }
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (!(element in constraints) || prefix.filter(e => e === element).length < constraints[element]) {
        generate(i, [...prefix, element]);
      }
    }
  };
  generate(0, []);
  return combinations;
};

const TaskFivePartTwo: React.FC = () => {
  const [setA] = useState<string[]>(["a", "b", "c", "d", "e", "g"]);
  const [setB] = useState<string[]>(["a", "b", "c", "d"]);
  const [combinationsA, setCombinationsA] = useState<string[][]>([]);
  const [combinationsB, setCombinationsB] = useState<string[][]>([]);

  useEffect(() => {
    const kA = 3;
    const kB = 5;
    const constraintsB = { "a": 2, "b": 3, "c": 3, "d": 4 };
    
    const combsA = generateCombinationsA(setA, kA);
    const combsB = generateCombinationsB(setB, kB, constraintsB);

    setCombinationsA(combsA);
    setCombinationsB(combsB);
  }, [setA, setB]);

  return (
    <div>
      <h2>Сочетания для множества A (по 4 элемента):</h2>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Сочетание</th>
          </tr>
        </thead>
        <tbody>
          {combinationsA.map((combination, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{combination.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Сочетания для множества B (с повторениями по 5 элементов):</h2>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Сочетание</th>
          </tr>
        </thead>
        <tbody>
          {combinationsB.map((combination, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{combination.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskFivePartTwo;
