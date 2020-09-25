import React from "react";

function Stats({ state }) {
  return (
    <div className="stats-container">
      <div id="genpop">
        <div>gen: {state.gensRef.current}</div>
        <div>pop: {state.popRef.current}</div>
      </div>

      <div id="running">{state.running ? "Running" : "Paused"}</div>
    </div>
  );
}

export default Stats;
