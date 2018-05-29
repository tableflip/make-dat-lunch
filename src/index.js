import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'redux-bundler-react'
import App from './App'
import getStore from './bundles'

let myDatUrl = window.localStorage.getItem('my-dat')

ReactDOM.render(
  <Provider store={getStore({dat: {myDatUrl})}>
    <App />
  </Provider>, document.getElementById('root'))
