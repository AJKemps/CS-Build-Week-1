import React from "react";
import { Samples } from "./Samples";

function Presets({ methods }) {
  console.log("methods", methods);
  return (
    <div className="presets-container">
      Fun Initial States
      <div id="presets">
        {Samples.map((item) => (
          <div
            id="preset-divs"
            key={item.name}
            onClick={() => methods.sampleGrid2(item.array)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Presets;
