/* global DatArchive */
import WebDB from '@beaker/webdb'
import root from 'window-or-global'
import {createSelector} from 'redux-bundler'

async function createWebDb ({url}) {
  const webdb = new WebDB('make-dat-lunch')

  webdb.define('eaters', {
    filePattern: [
      '/eaters/*.json'
    ]
  })

  return webdb.indexArchive(url)
}

export default {
  name: 'dat',

  reducer (state = {}, action) {
    if (action.type === 'DAT_CREATE_STARTED') {
      return { ...state, datState: 'creating' }
    }
    if (action.type === 'DAT_INIT_STARTED') {
      return { ...state, datState: 'initialising' }
    }
    if (action.type === 'DAT_INIT_FINISHED') {
      return { ...state, datState: 'ready' }
    }
    if (action.type === 'DAT_CREATE_FINISHED') {
      return { ...state, datState: 'ready', myDatUrl: action.payload }
    }
    if (action.type === 'DAT_INIT_ERRORED') {
      return { ...state, datState: null, myDatUrl: null }
    }
    return state
  },

  getExtraArgs () {
    return { getDat: root.dat, getWebdb: root.webdb }
  },

  selectDatReady: state => state.dat.datState === 'ready',

  selectMyDatUrl: state => state.dat.myDatUrl,

  selectDatState: state => state.dat.datState,

  doInitDat: () => async ({ dispatch, getState }) => {
    dispatch({ type: 'DAT_INIT_STARTED' })
    let url = getState().dat.myDatUrl
    console.log('here den', url)
    let dat
    try {
      // Check the dat exists
      dat = new DatArchive(url)
      await dat.getInfo({timeout: 100})
    } catch (err) {
      return dispatch({ type: 'DAT_INIT_ERRORED' })
    }

    root.webdb = await createWebDb(dat)
    root.dat = dat

    dispatch({ type: 'DAT_INIT_FINISHED' })
  },

  doCreateDat: () => async ({ dispatch }) => {
    dispatch({ type: 'DAT_CREATE_STARTED' })

    const dat = await DatArchive.create({ title: 'make-dat-lunch' })
    await dat.mkdir('/eaters')
    window.localStorage.setItem('my-dat', dat.url)
    root.webdb = await createWebDb(dat)
    root.dat = dat

    dispatch({ type: 'DAT_CREATE_FINISHED', payload: dat.url })
  },

  reactUrlButDatNotReady: createSelector(
    'selectMyDatUrl',
    'selectDatState',
    (datUrl, datState) => {
      if (datUrl && !datState) {
        return { actionCreator: 'doInitDat' }
      }
    }
  )
}
