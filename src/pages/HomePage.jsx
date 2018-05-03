import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createGroup } from '../actions'

class HomePage extends React.Component {
  render () {
    return (
      <div>
        {this.props.myDat ? (
          <div>
            <h1>Welcome to DAT LUNCH!?</h1>
            <Link to='/add-eater'>ADD EATER!!!</Link>
          </div>
        ) : (
          <button onClick={this.props.createGroup}>Create Group</button>
        )}
      </div>
    )
  }
}

const select = ({ myDat }) => ({ myDat })
const actions = { createGroup }

export default connect(select, actions)(HomePage)
