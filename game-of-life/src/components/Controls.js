import React from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { TiDelete, TiArrowShuffle } from "react-icons/ti";

function Controls({ methods, constants, state }) {
  console.log("methods", methods);
  return (
    <div className="controls-container">
      <div className="play-container">
        <div
          className="play-divs"
          onClick={() => {
            methods.setRunning(!state.running);
            if (!state.running) {
              state.runningRef.current = true;
              methods.runSimulation();
            }
          }}
        >
          {state.running ? (
            <>
              <BsFillPauseFill />
              Pause
            </>
          ) : (
            <>
              <BsFillPlayFill />
              Start
            </>
          )}
        </div>
        <div className="play-divs" onClick={methods.clearGrid}>
          <TiDelete />
          Clear
        </div>
        <div className="play-divs" onClick={methods.randomGrid}>
          <TiArrowShuffle />
          Random
        </div>
      </div>
      <div className="speed-container">
        {constants.speeds.map((item, i) => (
          <div
            key={item}
            onClick={() => methods.setSpeed(constants.speeds[i].milleseconds)}
            style={
              item.milleseconds === state.speed
                ? { backgroundColor: "#7400b8", color: "white" }
                : undefined
            }
            className="speed-divs"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Controls;
