import React from 'react';
import superagent from 'superagent'
import { connect } from 'react-redux'
import Form from './Form'
import Messages from './Messages'
import { Route, Link } from 'react-router-dom'

const baseUrl = "http://localhost:4000";
// const baseUrl = "https://sleepy-earth-39717.herokuapp.com";

class App extends React.Component {
  stream = new EventSource(`${baseUrl}/stream`)

  componentDidMount () {
    this.stream.onmessage = (event) => {
      const parsedJson = JSON.parse(event.data)
      this.props.dispatch(parsedJson)
    }
  }

  createMessage = async (val) => {
    try {
      const response = await superagent
        .post(`${baseUrl}/message`)
        .send({ text: val })

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  createChannel = async (val) => {
    try {
      const response = await superagent
        .post(`${baseUrl}/channel`)
        .send({ name: val })

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const channels = this
      .props
      .channels
      .map(channel => <div>
        <Link to={`/messages/${channel}`}>{channel}</Link>
      </div>)

    return <main>
      <h3>Channels</h3>
      <Form onSubmit={this.createChannel} />
      {channels}

      <Route path='/messages/:channel' component={Messages}/>
    </main>
  }
}

function mapStateToProps (state) {
  return {
    channels: state.channels
  }
}


const connector = connect(mapStateToProps)
const connected = connector(App)
export default connected