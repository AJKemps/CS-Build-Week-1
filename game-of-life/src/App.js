import React from "react";
import Grid from "./components/Grid";
import Header from "./components/Header";
import { IconContext } from "react-icons";
import IconStyles from "./components/IconStyles";

import "./App.css";

function App() {
  return (
    <IconContext.Provider value={IconStyles}>
      <Header />
      <div className="app-wrapper">
        <Grid />
      </div>
    </IconContext.Provider>
  );
}

export default App;
