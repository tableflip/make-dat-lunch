// import {createSelector} from 'redux-bundler'

export default {
  name: 'groups',

  selectHasGroup: state => !!state.dat.myDatUrl

  doCreateGroup: () => async ({ dispatch, store }) => {
    await store.doCreateDat()
  }
}
