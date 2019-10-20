import React, { Component } from "react";
import "./App.css";

import Predict from "./Predict.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>ASL Hand Sign Classifier</h1>
        <Predict />
      </div>
    );
  }
}

export default App;
