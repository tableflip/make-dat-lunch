import React from 'react'
import { connect } from 'redux-bundler-react'
import PropTypes from 'prop-types'

class HomePage extends React.Component {
  static propTypes = {
    datReady: PropTypes.bool.isRequired,
    doCreateGroup: PropTypes.func.isRequired
  }

  render () {
    return (
      <div>
        {this.props.datReady ? (
          <div>
            <h1>Welcome to DAT LUNCH!?</h1>
            <a href='/add-eater'>ADD EATER!!!</a>
          </div>
        ) : (
          <button onClick={this.createGroup}>Create Group</button>
        )}
      </div>
    )
  }
}

export default connect('selectDatReady', 'doInitDat', HomePage)
