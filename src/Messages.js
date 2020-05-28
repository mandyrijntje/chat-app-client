import React from "react";
import superagent from "superagent";
import { connect } from "react-redux";
import Form from "./Form";

const baseUrl = "http://localhost:4000";
// const baseUrl = "https://sleepy-earth-39717.herokuapp.com";

class Messages extends React.Component {
  createMessage = async (val) => {
    const { channel } = this.props.match.params;

    try {
      const response = await superagent.post(`${baseUrl}/message`).send({
        text: val,
        channel,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { channel } = this.props.match.params;
    console.log("channel test:", channel);

    const messages = this.props.messages
      .filter((message) => message.channel === channel)
      .map((message) => <p>{message.text}</p>);

    return (
      <div>
        <h3>Messages</h3>
        <Form onSubmit={this.createMessage} />
        {messages}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

const connector = connect(mapStateToProps);
const connected = connector(Messages);
export default connected;
