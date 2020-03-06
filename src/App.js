import React, { Component } from "react";
import superagent from "superagent";

class App extends Component {
  state = { text: "" };

  onChange = event => {
    this.setState({ text: event.target.value });
  };

  onSubmit = async event => {
    event.preventDefault();
    try {
      const response = await superagent
        .post("http://localhost:4000/message")
        .send({ text: this.state.text });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  reset = () => {
    this.setState({ text: "" });
  };

  render() {
    return (
      <main>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.text}
          ></input>
          <button>Send</button>
          <button type="button" onClick={this.reset}>
            Reset
          </button>
        </form>
      </main>
    );
  }
}
export default App;
