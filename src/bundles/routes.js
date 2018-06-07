import { createRouteBundle } from 'redux-bundler'
import HomePage from '../pages/HomePage'
import EaterPage from '../pages/EaterPage'
import AddMealPage from '../pages/AddMealPage'
import AddEaterPage from '../pages/AddEaterPage'

export default createRouteBundle({
  '/': HomePage,
  '/add-eater': AddEaterPage,
  '/add-meal': AddMealPage,
  '/eaters/:eaterId': EaterPage
})
