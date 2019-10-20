import React, { Component } from "react";
import utils from "./utils.js";

import Camera from "react-camera";

import axios from "axios";

class Predict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: "",
      label: ""
    };
  }

  getLabel = blob => {
    const formData = new FormData();
    formData.set("file", blob);
    axios.post(utils.LOCAL_API, formData, {}).then(response => {
      this.setState({ label: response.data });
      return response.data;
    });
  };

  takePicture = () => {
    this.camera.capture().then(blob => {
      this.img.src = URL.createObjectURL(blob);
      this.img.onload = () => {
        URL.revokeObjectURL(this.src);
      };

      this.getLabel(blob);
    });
  };

  render() {
    return (
      <div>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
        >
          <button onClick={this.takePicture}>Capute</button>
        </Camera>
        <h1>Prediction: {this.state.label}</h1>
        <img
          ref={img => {
            this.img = img;
          }}
        />
      </div>
    );
  }
}

export default Predict;
