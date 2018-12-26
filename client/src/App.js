import React, { Component } from "react";
import "./App.css";

import Balance from "./Balance.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Roger's BC Account Balance:</h1>
        <Balance/>
      </div>
    );
  }
}

export default App;
