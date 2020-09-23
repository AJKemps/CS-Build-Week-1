import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import { samples } from "./samples";

const numRows = 50;
const numCols = 50;

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
  return rows;
};

let generations = 0;

let speeds = [
  { name: "4x", milleseconds: 250 },
  { name: "2x", milleseconds: 500 },
  { name: "1x", milleseconds: 1000 },
  { name: "1/2x", milleseconds: 2000 },
];

function Grid() {
  const [grid, setGrid] = useState(initialGrid);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(speeds[3].milleseconds);

  const runningRef = useRef(running);
  runningRef.current = running;

  const gensRef = useRef(generations);
  gensRef.current = generations;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  const clearGrid = () => {
    setGrid(initialGrid);
    generations = 0;
  };

  const randomGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.2 ? 0 : 1))
      );
    }
    setGrid(rows);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
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
          }
        }
      });
    });
    generations++;
    setTimeout(runSimulation, speedRef.current);
  }, [speed]);

  console.log(grid);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "Stop" : "Start"}
      </button>
      <button onClick={clearGrid}>Clear Grid</button>
      <button onClick={randomGrid}>Random Grid</button>
      {speeds.map((item, i) => (
        <button
          key={item}
          onClick={() => setSpeed(speeds[i].milleseconds)}
          style={
            item.milleseconds === speed
              ? { backgroundColor: "magenta" }
              : undefined
          }
        >
          {item.name}
        </button>
      ))}
      {samples.map((item) => (
        <button onClick={() => setGrid(item.array)}>{item.name}</button>
      ))}
      <div
        className="App"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
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
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "pink" : undefined,
                border: "1px solid black",
                pointerEvents: running ? "none" : "auto",
              }}
            />
          ))
        )}
      </div>
      <div>Generations: {gensRef.current}</div>
    </>
  );
}

export default Grid;
