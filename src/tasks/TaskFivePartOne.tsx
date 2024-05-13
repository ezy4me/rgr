import React, { useEffect, useState } from "react";

// Функция для генерации всех перестановок букв в слове
const generatePermutations = (word: string): Set<string> => {
  const permutations = new Set<string>();

  const swap = (arr: string[], i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const permute = (arr: string[], startIndex: number, endIndex: number) => {
    if (startIndex === endIndex) {
      permutations.add(arr.join(""));
    } else {
      for (let i = startIndex; i <= endIndex; i++) {
        swap(arr, startIndex, i);
        permute(arr.slice(), startIndex + 1, endIndex); // Применяем slice для создания копии массива
        swap(arr, startIndex, i); // Восстановление исходного порядка для следующей итерации
      }
    }
  };

  permute(Array.from(word), 0, word.length - 1);

  return permutations;
};

const TaskFivePartOne: React.FC = () => {
  const [wordA] = useState<string>("рябина");
  const [wordB] = useState<string>("олово");
  const [permutationsA, setPermutationsA] = useState<string[]>([]);
  const [permutationsB, setPermutationsB] = useState<string[]>([]);

  useEffect(() => {
    const permsA = Array.from(generatePermutations(wordA));
    const permsB = Array.from(generatePermutations(wordB));
    setPermutationsA(permsA);
    setPermutationsB(permsB);
  }, [wordA, wordB]);

  return (
    <div>
      <h2>Перестановки слова "рябина":</h2>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Слово</th>
          </tr>
        </thead>
        <tbody>
          {permutationsA.map((perm, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{perm}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Перестановки слова "олово":</h2>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Слово</th>
          </tr>
        </thead>
        <tbody>
          {permutationsB.map((perm, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{perm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskFivePartOne;
