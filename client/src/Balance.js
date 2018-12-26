import React, { Component } from "react";
import utils from "./utils.js";

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: {}
    };
  }

  componentDidMount() {
    this.getBalance(this.props.id);
  }

  getBalance = id => {
    fetch(utils.LOCAL_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          return [];
        }
        return response.json();
      })
      .then(data => {
        this.setState({ balance: data });
      });
  };

  render() {
    return <div>{console.log(this.state.balance)}</div>;
  }
}

export default Balance;
