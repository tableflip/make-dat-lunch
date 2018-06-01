import { composeBundles } from 'redux-bundler'
import datBundle from './dat'
import groupsBundle from './groups'
import routesBundle from './routes'

export default composeBundles(
  datBundle,
  groupsBundle,
  routesBundle
)
