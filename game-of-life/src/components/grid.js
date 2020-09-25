import React, { useState, useCallback, useRef, useEffect } from "react";
import Controls from "./Controls";
import Stats from "./Stats";
import Presets from "./Presets";
import Header from "./Header";
import produce from "immer";

const numRows = 50;
const numCols = 50;

const size = 8;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [1, 1],
  [1, 0],
  [-1, 0],
  [-1, 1],
  [-1, -1],
];

let initialGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  population = 0;
  for (let i = 0; i < numRows; i++) {
    for (let k = 0; k < numCols; k++) {
      if (rows[i][k] > 0) {
        population++;
      }
    }
  }
  return rows;
};

let population = 0;
let generations = 0;

let speeds = [
  { name: "1/4x", milleseconds: 1000 },
  { name: "1/2x", milleseconds: 500 },
  { name: "1x", milleseconds: 250 },
  { name: "2x", milleseconds: 125 },
  { name: "4x", milleseconds: 75 },
];

function Grid() {
  const [grid, setGrid] = useState(initialGrid);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(speeds[2].milleseconds);

  const runningRef = useRef(running);
  runningRef.current = running;

  const gensRef = useRef(generations);
  gensRef.current = generations;

  const popRef = useRef(population);
  popRef.current = population;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  const clearGrid = () => {
    setGrid(initialGrid);
    generations = 0;
    population = 0;
  };

  const randomGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.2 ? 0 : 1))
      );
    }
    population = 0;
    for (let i = 0; i < numRows; i++) {
      for (let k = 0; k < numCols; k++) {
        if (rows[i][k] > 0) {
          population++;
        }
      }
    }
    setGrid(rows);
  };

  function sampleGrid2(sample) {
    setGrid(sample);
    generations = 0;
  }

  const sampleGrid = (sample) => {
    setGrid(sample);
    generations = 0;
  };

  //   useEffect(() => sampleGrid(), []);

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    } else {
      setGrid((g) => {
        return produce(g, (gridCopy) => {
          population = 0;
          for (let i = 0; i < numRows; i++) {
            for (let k = 0; k < numCols; k++) {
              let neighbors = 0;
              operations.forEach(([x, y]) => {
                const newI = (i + x + numCols) % numCols;
                const newK = (k + y + numRows) % numRows;

                neighbors += g[newI][newK];
              });
              if (neighbors < 2 || neighbors > 3) {
                gridCopy[i][k] = 0;
              } else if (g[i][k] === 0 && neighbors === 3) {
                gridCopy[i][k] = 1;
              }
              if (gridCopy[i][k] > 0) {
                population++;
              }
            }
          }
        });
      });
    }

    generations++;
    setTimeout(runSimulation, speedRef.current);
  }, [speed]);

  console.log(grid);

  return (
    <>
      <div className="content-container">
        <Header />
        <Presets methods={{ sampleGrid2, sampleGrid, setRunning }} />
      </div>
      <div className="game-container">
        <Controls
          methods={{
            setRunning,
            runSimulation,
            clearGrid,
            randomGrid,
            setSpeed,
          }}
          constants={{ speeds }}
          state={{ runningRef, running, speed }}
        />

        <div
          className="grid-container"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, ${size}px)`,
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: size,
                  height: size,
                  backgroundColor: grid[i][k] ? "#7400b8" : undefined,
                  border: "0.2px solid #4d194d",
                  boxShadow: grid[i][k] ? "0px 0px 16px 0px #5e60ce" : "none",
                  pointerEvents: running ? "none" : "auto",
                }}
              />
            ))
          )}
        </div>
        <Stats state={{ running, gensRef, popRef }} />
      </div>
    </>
  );
}

export default Grid;
