import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import createWebDbContainer from './WebDbContainer'
import HomePage from './pages/HomePage'
import AddEaterPage from './pages/AddEaterPage'

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
      <Router>
        <div>
          <Route exact path='/' render={() => (
            <HomePage webdb={this.props.webdb} onCreateGroupClick={this.onCreateGroupClick} />
          )} />
          <Route path='/add-eater' render={() => (
            <AddEaterPage webdb={this.props.webdb} />
          )} />
        </div>
      </Router>
    )
  }
}

const WebDbApp = createWebDbContainer(App)

ReactDOM.render(<WebDbApp />, document.getElementById('root'))
