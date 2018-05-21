/* global DatArchive */
import WebDB from '@beaker/webdb'
import root from 'window-or-global'

export default {
  name: 'dat',

  reducer (state = {}, action) {
    if (action.type === 'DAT_INIT_FINISHED') {
      return { ...state, datReady: true }
    }
    return state
  },

  getExtraArgs () {
    return { getDat: root.dat, getWebdb: root.webdb }
  },

  selectDatReady: state => state.dat.datReady,

  doInitDat: () => async ({ dispatch }) => {
    dispatch({ type: 'DAT_INIT_STARTED' })

    let url = window.localStorage.getItem('my-dat')
    let dat

    if (url) {
      dat = new DatArchive(url)
    } else {
      dat = await DatArchive.create({ title: 'make-dat-lunch' })
      await dat.mkdir('/eaters')
      window.localStorage.setItem('my-dat', dat.url)
    }

    const webdb = new WebDB('make-dat-lunch')

    webdb.define('eaters', {
      filePattern: [
        '/eaters/*.json'
      ]
    })

    await webdb.indexArchive(dat.url)

    root.webdb = webdb
    root.dat = dat

    dispatch({ type: 'DAT_INIT_FINISHED' })
  }

  // TODO: react to undefined datReady and datUrl to auto initialise an existing
  // dat archive
}
