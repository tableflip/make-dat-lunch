import { composeBundles } from 'redux-bundler'
import datBundle from './dat'
import routesBundle from './routes'

export default composeBundles(
  datBundle,
  routesBundle
)
