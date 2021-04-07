import { login } from '@/api/user'
import * as types from '../mutation-types'
const state = {
  user: {
    name: '',
    avatar: '',
    user_id: '',
    device_id: '',
    // timestamp: '',
    uid: ''
  },
  token: '',
  authorization: '',
  roles: [],
  powers: null
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AUTHORIZATION: (state, authorization) => {
    state.authorization = authorization
  },
  SET_USER: (state, payload) => {
    // payload.timestamp = Date.now()
    state.user = Object.assign({}, state.user || {}, payload)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  [types.UPDATE_POWERS] (state, payload) {
    const powers = {}
    Object.keys(payload).forEach(k => {
      payload[k].forEach(p => {
        powers[k + '_' + p] = 1
      })
    })
    state.powers = powers
  }
}

const actions = {
  login ({ commit }, userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), password }).then(response => {
        const { data } = response
        console.log('token', data.token)
        commit('SET_TOKEN', data.token)
        console.log('qqqtoken', state.token)
        // commit('SET_AUTHORIZATION', data.authorization)
        const users = {
          name: data.name,
          avatar: data.avatar,
          uid: data.uid
        }
        commit('SET_USER', users)
        // commit('SET_ROLES', data.roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout ({ commit, state }) {
    commit('SET_TOKEN', '')
    commit('SET_AUTHORIZATION', '')
    commit('SET_USER', '')
    commit('SET_ROLES', [])
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_AUTHORIZATION', '')
    //     commit('SET_USER', '')
    //     commit('SET_ROLES', [])
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },
  async getPowers ({ commit, state }) {
    commit(types.UPDATE_POWERS, {
      account_read: 1,
      agreement_add: 1
    })
    // const u = state.user || {}
    // Vue.prototype.$koapi.defaults.headers.Authorization = u.token
    // const rp = await Vue.prototype.$koapi.request('auth.getPowers')

    // if (rp.code === 200) {
    //   commit(types.UPDATE_POWERS, rp.data)
    // }

    // return rp
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
