import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import * as types from './mutation-types'
import foundation from './modules/foundation'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth, // 登录用户相关数据
    foundation // 通用数据
  },
  state: {
  },
  mutations: {
    /**
     * 清除用户登录态
     */
    [types.CLEAN_USER] (state) {
      state.auth.user = null
      state.auth.powers = null
      localStorage.removeItem('koAdminUser')
    }
  },
  actions: {
  }
})
