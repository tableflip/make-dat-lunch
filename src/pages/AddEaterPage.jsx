import React from 'react'

export default class AddEaterPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { name: '' }
    this.onNameChange = this.onNameChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onNameChange (e) {
    this.setState({ name: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.createEater({ name: this.state.name })
  }

  render () {
    return (
      <div>
        <h1>Add eater</h1>
        <form onSubmit={this.onSubmit}>
          <label>Name</label>
          <input type='text' value={this.state.name} />
          <button type='submit'>Add</button>
        </form>
      </div>
    )
  }
}
