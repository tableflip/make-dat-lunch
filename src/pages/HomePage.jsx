import React from 'react'
import { Link } from 'react-router-dom'

export default class HomePage extends React.Component {

  render () {
    return (
      <div>
        {this.props.webdb ? (
          <div>
            <h1>Welcome to DAT LUNCH!?</h1>
            <Link to='/add-eater'>ADD EATER!!!</Link>
          </div>
        ) : (
          <button onClick={this.props.onCreateGroupClick}>Create Group</button>
        )}
      </div>
    )
  }
}