import React from 'react'
import { connect } from 'redux-bundler-react'

class AddEaterPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { name: '' }
    this.onNameChange = this.onNameChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onNameChange (e) {
    this.setState({ name: e.target.value })
  }

  async onSubmit (e) {
    e.preventDefault()
    const id = await this.props.doCreateEater({ name: this.state.name })
    this.props.doUpdateUrl(`/eaters/${id}`)
  }

  render () {
    return (
      <div>
        <h1>Add eater</h1>
        <form onSubmit={this.onSubmit}>
          <label>Name</label>
          <input type='text' value={this.state.name} onChange={this.onNameChange} />
          <button type='submit'>Add</button>
        </form>
      </div>
    )
  }
}

export default connect('doUpdateUrl', 'doCreateEater', AddEaterPage)
