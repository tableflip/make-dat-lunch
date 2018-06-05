import { createRouteBundle } from 'redux-bundler'
import HomePage from '../pages/HomePage'
import AddEaterPage from '../pages/AddEaterPage'
import EaterPage from '../pages/EaterPage'

export default createRouteBundle({
  '/': HomePage,
  '/add-eater': AddEaterPage,
  '/eaters/:eaterId': EaterPage
})
