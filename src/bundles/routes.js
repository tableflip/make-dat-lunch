import { createRouteBundle } from 'redux-bundler'
import HomePage from '../pages/HomePage'
import AddEaterPage from '../pages/AddEaterPage'

export default createRouteBundle({
  '/': HomePage,
  '/add-eater': AddEaterPage
})
