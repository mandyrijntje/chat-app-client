import React, { Component } from "react";
import superagent from "superagent";
import "./App.css";
import { connect } from "react-redux";

const baseUrl = "http://localhost:4000";
// const baseUrl = "https://sleepy-earth-39717.herokuapp.com";

class App extends Component {
  state = { text: "" };

  stream = new EventSource(`${baseUrl}/stream`); //replace this with heroku url for server

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
        .post(`${baseUrl}/message`) //for server to work
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
    const messages = this.props.messages.map(message => <p>{message}</p>);
    const channels = this.props.channels.map(channel => <p>{channel}</p>);
    return (
      <main
        className="appContainer"
        // style={{ backgroundColor: "pink" }}
      >
        <form className="form" onSubmit={this.onSubmit}>
          <button className="resetButton" type="button" onClick={this.reset}>
            Reset
          </button>
          <input
            className="input"
            type="text"
            onChange={this.onChange}
            value={this.state.text}
          ></input>
          <button className="sendButton">Send</button>
        </form>
        <h2>Messages</h2>
        {messages}
        <h2>Channels</h2>
        {channels}
      </main>
    );
  }
}

function mapStateToProps(state) {
  return { messages: state.messages, channels: state.channels };
}

export default connect(mapStateToProps)(App);
