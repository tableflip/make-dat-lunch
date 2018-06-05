import {createSelector} from 'redux-bundler'
import slugify from 'slugify'

export default {
  name: 'groups',

  reducer (state = { eaters: {} }, action) {
    if (action.type === 'FETCH_EATERS_STARTED') {
      return { ...state, eaters: { ...state.eaters, loading: true } }
    }
    if (action.type === 'FETCH_EATERS_FINISHED') {
      return { ...state, eaters: { loading: false, data: action.payload } }
    }

    return state
  },

  selectHasGroup: state => !!state.dat.myDatUrl,

  selectEatersRaw: state => state.groups.eaters,
  selectEatersData: state => state.groups.eaters.data,

  selectActiveEater: createSelector(
    'selectRouteParams',
    'selectPathname',
    'selectEatersData',
    (routeParams, pathname, eaters) => {
      if (!pathname.includes('/eaters') || !routeParams.eaterId || !eaters) {
        return null
      }

      return eaters.find(e => e.id === routeParams.eaterId) || null
    }
  ),

  doCreateGroup: () => async ({ dispatch, store }) => {
    await store.doCreateDat()
  },

  doCreateEater: ({ name }) => async ({ dispatch, getState, getWebdb }) => {
    dispatch({ type: 'EATER_CREATE_STARTED' })

    const { myDatUrl } = getState().dat
    const webDb = getWebdb()
    const slug = slugify(name)
    const id = `${slug}-${Date.now()}`

    try {
      await webDb.eaters.put(`${myDatUrl}/eaters/${id}.json`, { id, name })
    } catch (err) {
      return dispatch({ type: 'EATER_CREATE_ERRORED', payload: err })
    }

    dispatch({ type: 'EATER_CREATE_FINISHED' })
    return id
  },

  doFetchEaters: () => async ({ dispatch, getWebdb }) => {
    dispatch({ type: 'FETCH_EATERS_STARTED' })
    const webdb = getWebdb()
    let eaters

    try {
      eaters = await webdb.eaters.toArray()
    } catch (err) {
      dispatch({ type: 'FETCH_EATERS_ERRORED', payload: err })
    }

    dispatch({ type: 'FETCH_EATERS_FINISHED', payload: eaters })
  },

  reactShouldFetchEaters: createSelector('selectEatersRaw', ({ loading, data }) => {
    if (loading || data) return false
    return { actionCreator: 'doFetchEaters' }
  })
}
