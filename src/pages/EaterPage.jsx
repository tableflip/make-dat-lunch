import React from 'react'
import { connect } from 'redux-bundler-react'
import PropTypes from 'prop-types'

class EaterPage extends React.Component {
  static propTypes = {
    activeEater: PropTypes.object
  }

  render () {
    const { activeEater } = this.props

    if (!activeEater) return null

    return (
      <div>
        ID: {activeEater.id}<br />
        NAME: {activeEater.name}
      </div>
    )
  }
}

export default connect('selectActiveEater', EaterPage)
