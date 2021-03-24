import { login, logout } from '@/api/user'
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
  roles: []
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
  }
}

const actions = {
  login ({ commit }, userInfo) {
    const { phone, password, areaCode } = userInfo
    return new Promise((resolve, reject) => {
      login({ phone: phone.trim(), password: password, area_code: areaCode }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        // commit('SET_AUTHORIZATION', data.authorization)
        const user = {
          name: data.name,
          avatar: data.avatar,
          uid: data.uid
        }
        commit('SET_USER', user)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
