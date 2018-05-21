import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import navHelper from 'internal-nav-helper'

export class App extends Component {
  static propTypes = {
    doUpdateUrl: PropTypes.func.isRequired,
    route: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element
    ]).isRequired
  }

  render () {
    const Page = this.props.route
    return (
      <div onClick={navHelper(this.props.doUpdateUrl)}>
        <Page />
      </div>
    )
  }
}

export default connect('selectRoute', 'doUpdateUrl', App)
