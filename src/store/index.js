import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)

// 自定义组件
const modulesFiles = require.context('./modules', true, /\.js$/)

// 截取路径作为组件名
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
export default new Vuex.Store({
  modules,
  getters
})
