import React from 'react'
import { connect } from 'redux-bundler-react'
import PropTypes from 'prop-types'

class HomePage extends React.Component {
  static propTypes = {
    hasGroup: PropTypes.bool.isRequired,
    doCreateGroup: PropTypes.func.isRequired
  }

  render () {
    return (
      <div>
        {this.props.hasGroup ? (
          <div>
            <h1>Welcome to DAT LUNCH!?</h1>
            <a href='/add-eater'>ADD EATER!!!</a>
          </div>
        ) : (
          <button onClick={this.props.doCreateGroup}>Create Group</button>
        )}
      </div>
    )
  }
}

export default connect('selectHasGroup', 'doCreateGroup', HomePage)
