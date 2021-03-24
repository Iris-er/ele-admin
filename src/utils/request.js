import axios from 'axios'
import store from '../store'
import { Message } from 'element-ui'

//  创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.token = store.getters.token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    // if (response.data.code !== 200) {
    //   Message({
    //     message: response.data.msg,
    //     type: 'error',
    //     duration: 3 * 1000
    //   })
    //   return
    // }
    return response.data
  },
  error => {
    let message
    if (typeof error.response.data !== 'undefined') {
      message = error.response.data.message
    }
    if (error.response.status === 401) {
      this.$store.dispatch('user/logout')
      this.$router.push({ path: '/login' })
    }
    if (error.response.status === 500) {
      message = '服务器内部出错'
    }
    Message({
      message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
