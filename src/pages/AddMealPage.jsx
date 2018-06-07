import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import moment from 'moment'

const EaterCard = ({eater, role, onEaterClick}) => {
  return (
    <div className='bg-black-30' style={{width: 239, height: 239}} key={eater.id} onClick={() => onEaterClick(eater, role)}>
      <h1>{eater.name}</h1>
      <div>{role}</div>
    </div>
  )
}

class AddMealPage extends React.Component {
  static propTypes = {
    eaters: PropTypes.array,
    doUpdateUrl: PropTypes.func,
    doCreateMeal: PropTypes.func
  }

  state = {
    name: '',
    date: this.formatDate(),
    chefs: [],
    eaters: [],
    guests: 0
  }

  formatDate (thing) {
    const mo = thing ? moment(thing, 'YYYY-MM-DD') : moment()
    const date = mo.format('YYYY-MM-DD')
    return date
  }

  onDateChange = (e) => {
    const {value} = e.target
    const date = this.formatDate(value)
    this.setState({date})
  }

  onGuestsChange = (e) => {
    this.setState({guests: e.target.value})
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  onEaterClick = (eater, currentRole) => {
    const {eaters, chefs} = this.state
    if (currentRole === 'eater') {
      return this.setState({
        eaters: eaters.filter(e => e.id !== eater.id),
        chefs: chefs.concat(eater)
      })
    }
    if (currentRole === 'chef') {
      return this.setState({
        chefs: chefs.filter(e => e.id !== eater.id)
      })
    }
    if (currentRole === 'none') {
      return this.setState({
        eaters: eaters.concat(eater)
      })
    }
  }

  getRole = (eater) => {
    const {eaters, chefs} = this.state
    if (eaters.some(e => e.id === eater.id)) {
      return 'eater'
    }
    if (chefs.some(c => c.id === eater.id)) {
      return 'chef'
    }
    return 'none'
  }

  async onSubmit (e) {
    e.preventDefault()
    await this.props.doCreateMeal({...this.state})
    this.props.doUpdateUrl(`/`)
  }

  render () {
    const {eaters = []} = this.props
    return (
      <div>
        <h1>Who is be eating and cook?</h1>
        {eaters.map(eater => (
          <EaterCard eater={eater} role={this.getRole(eater)} onEaterClick={this.onEaterClick} />
        ))}
        <form onSubmit={this.onSubmit}>
          <div>
            <label>What's for lunch</label>
            <input requried type='text' value={this.state.name} onChange={this.onNameChange} />
          </div>
          <div>
            <label>Number of guests</label>
            <input required type='number' min='0' step='1' value={this.state.guests} onChange={this.onGuestsChange} />
          </div>
          <div>
            <label>Date</label>
            <input required type='date' value={this.state.date} onChange={this.onDateChange} />
          </div>
          <button type='submit'>Add</button>
        </form>
      </div>
    )
  }
}

export default connect('selectEaters', 'doUpdateUrl', 'doCreateMeal', AddMealPage)
