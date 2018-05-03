import { combineReducers } from 'redux'

function myDatReducer (state = null, action) {
  if (action.type === 'FOUND_EXISTING_GROUP') {
    return action.payload
  }

  if (action.type === 'CREATED_GROUP') {
    return action.payload
  }

  return state
}

export default combineReducers({
  myDat: myDatReducer
})
