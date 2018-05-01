import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import createWebDbContainer from './WebDbContainer'

class App extends Component {
  constructor (props) {
    super(props)
    this.onCreateGroupClick = this.onCreateGroupClick.bind(this)
  }

  onCreateGroupClick () {
    this.props.createGroup()
  }

  render () {
    return (
      <div>
        {this.props.webdb ? (
          <p>Welcome to dat lunch!</p>
        ) : (
          <button onClick={this.onCreateGroupClick}>Create Group</button>
        )}
      </div>
    )
  }
}

const WebDbApp = createWebDbContainer(App)

ReactDOM.render(<WebDbApp />, document.getElementById('root'))
