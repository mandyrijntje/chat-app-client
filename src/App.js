import React, { Component } from "react";
import superagent from "superagent";
import { connect } from "react-redux";

class App extends Component {
  state = { text: "" };

  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      //onmessage is built in

      console.log(`event data: `, event.data); //data is inside event //here it connects to server actions
      const parsed = JSON.parse(event.data); //we have to parse json to a JS object to use data!
      console.log(`parse test:`, parsed);
      this.props.dispatch(parsed);
    };
  }

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
      this.reset();
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

function mapStateToProps(state) {
  return { messages: state.messages };
}

export default connect(mapStateToProps)(App);
