import * as types from '../mutation-types'

export default {
  state: {
    prefer: JSON.parse(localStorage.getItem('koAdminPrefer')) || { navCollap: false }
  },
  mutations: {
    [types.UPDATE_PREFER] (state, payload) {
      state.prefer = Object.assign({}, state.prefer, payload)
      localStorage.setItem('koAdminPrefer', JSON.stringify(state.prefer))
    }
  }
}
