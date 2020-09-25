import React from "react";
import { Samples } from "./Samples";
import { BsArrowRight } from "react-icons/bs";

function Presets({ methods }) {
  console.log("methods", methods);
  return (
    <div id="presets">
      {Samples.map((item) => (
        <div
          id="preset-divs"
          key={item.name}
          onClick={() => methods.sampleGrid2(item.array)}
        >
          {item.name}
          <BsArrowRight />
        </div>
      ))}
    </div>
  );
}

export default Presets;
