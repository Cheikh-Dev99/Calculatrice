import React, { Component } from "react";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
    };
  }

  handleClick = (value) => {
    if (value === "=") {
      try {
        this.setState({ display: eval(this.state.display) });
      } catch {
        this.setState({ display: "Error" });
      }
    } else if (value === "C") {
      this.setState({ display: "" });
    } else {
      this.setState({ display: this.state.display + value });
    }
  };

  render() {
    const data = ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "C", "0", "=", "/"];
    return (
      <div className="calculator w-50 h-auto bg-gray-900 rounded p-3">
        <div className="display flex justify-end items-end text-2xl w-full h-20 bg-w">
          {this.state.display}
        </div>
        <div className="buttons grid grid-cols-4 gap-2 pt-3">
          {data.map((value) => (
            <button
              key={value}
              onClick={() => this.handleClick(value)}
              className="bg-w px-5 py-1 text-xl font-bold rounded"
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
