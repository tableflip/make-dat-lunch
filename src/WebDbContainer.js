import React, { Component } from 'react'
import { initDb, hasGroup } from './lib/db'

export default function (Comp) {
  return class WebDbContainer extends Component {
    constructor (props) {
      super(props)
      this.createGroup = this.createGroup.bind(this)
    }

    async componentWillMount () {
      if (hasGroup()) {
        this.setState({ webdb: await initDb() })
      } else {
        this.setState({ webdb: null })
      }
    }

    async createGroup () {
      this.setState({ webdb: await initDb() })
    }

    render () {
      return <Comp {...this.props} {...this.state} createGroup={this.createGroup} />
    }
  }
}
