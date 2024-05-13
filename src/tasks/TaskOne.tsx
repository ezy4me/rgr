import React, { useState } from "react";

const X_VALUES = "00001111";
const Y_VALUES = "00110011";
const Z_VALUES = "01010101";

const TruthTable = ({ values }: { values: string }) => {
  const parseTruthTable = (values: string): boolean[] => {
    const truthTable: boolean[] = [];
    for (const char of values) {
      truthTable.push(char === "1");
    }
    return truthTable;
  };

  return (
    <table>
      <caption>Таблица истинности</caption>
      <tbody>
        <tr>
          <th>x</th>
          <th>y</th>
          <th>z</th>
          <th>f</th>
        </tr>
        {parseTruthTable(values).map((value, index) => {
          const x = X_VALUES[index] === "1" ? "1" : "0";
          const y = Y_VALUES[index] === "1" ? "1" : "0";
          const z = Z_VALUES[index] === "1" ? "1" : "0";
          return (
            <tr key={index}>
              <td>{x}</td>
              <td>{y}</td>
              <td>{z}</td>
              <td>{value ? "1" : "0"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const TaskOne = () => {
  const [f1Values, setF1Values] = useState<string>("11000011");
  const [f2Values, setF2Values] = useState<string>("11100001");
  const [f3Values, setF3Values] = useState<string>("10001101");

  const calculateSKNF = (values: string): string => {
    const truthTable = values.split("").map((char) => parseInt(char));
    const sknf: string[] = [];
  
    for (let i = 0; i < truthTable.length; i++) {
      if (truthTable[i] === 0) {
        const term: string[] = [];
        const variables = ["x", "y", "z"]; 
  
        for (let j = 0; j < variables.length; j++) {
          const variable = variables[j];
          if (!(i & (1 << (variables.length - j - 1)))) {
            term.push(variable);
          } else {
            term.push(`¬${variable}`);
          }
        }
  
        sknf.push(`(${term.join(" ∨ ")})`);
      }
    }
  
    return sknf.join(" ∧ ");
  };
  
  const calculateSDNF = (values: string): string => {
    const truthTable = values.split("").map((char) => parseInt(char));
    const sdnf: string[] = [];
  
    for (let i = 0; i < truthTable.length; i++) {
      if (truthTable[i] === 1) {
        const term: string[] = [];
        const variables = ["x", "y", "z"]; 
  
        for (let j = 0; j < variables.length; j++) {
          const variable = variables[j];
          if (i & (1 << (variables.length - j - 1))) {
            term.push(variable);
          } else {
            term.push(`¬${variable}`);
          }
        }
  
        sdnf.push(`(${term.join(" ∧ ")})`);
      }
    }
  
    return sdnf.join(" ∨ ");
  };
  

  return (
    <div>
      <h2>Задание номер один</h2>
      <div className="input-container">
        <label htmlFor="f1">Введите таблицу истинности для f1:</label>
        <input
          type="text"
          id="f1"
          value={f1Values}
          onChange={(e) => setF1Values(e.target.value)}
          placeholder="например, 11000011"
        />
        <TruthTable values={f1Values} />
        <p>СКНФ для f1: {calculateSKNF(f1Values)}</p>
        <p>СДНФ для f1: {calculateSDNF(f1Values)}</p>
      </div>
      <div className="input-container">
        <label htmlFor="f2">Введите таблицу истинности для f2:</label>
        <input
          type="text"
          id="f2"
          value={f2Values}
          onChange={(e) => setF2Values(e.target.value)}
          placeholder="например, 11100001"
        />
        <TruthTable values={f2Values} />
        <p>СКНФ для f2: {calculateSKNF(f2Values)}</p>
        <p>СДНФ для f2: {calculateSDNF(f2Values)}</p>
      </div>
      <div className="input-container">
        <label htmlFor="f3">Введите таблицу истинности для f3:</label>
        <input
          type="text"
          id="f3"
          value={f3Values}
          onChange={(e) => setF3Values(e.target.value)}
          placeholder="например, 10001101"
        />
        <TruthTable values={f3Values} />
        <p>СКНФ для f3: {calculateSKNF(f3Values)}</p>
        <p>СДНФ для f3: {calculateSDNF(f3Values)}</p>
      </div>

    </div>
  );
};

export default TaskOne;
