import axios from 'axios'
import store from '../store'
import { Message } from 'element-ui'
import { servePublicKey, serveSecretKey } from './encryption'
// import { getRSAString } from './jsencrypt'

//  创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  async config => {
    if (store.getters.token) {
      config.headers.token = store.getters.token
    }
    // console.log('config: ', config)
    // 如果data参数存在，headers中添加aesKey参数，再对data加密
    // if (config.data) {
    //   const servicePubkey = await servePublicKey
    //   const servicePrikey = await serveSecretKey
    //   console.log('hahahah: ', servicePubkey, servicePrikey)
    // }
    const servicePubkey = await servePublicKey
    const servicePrikey = await serveSecretKey
    console.log('hahahah: ', servicePubkey, servicePrikey)

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
    if (response.data.code !== 200) {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 3 * 1000
      })
      return
    }
    return response.data

    // if (response.status === 200) {
    //   // ...其它代码

    //   // 获取headers里的aeskey解码后解密
    //   // 注意：由于底层问题，后端在header里返回的字段名微信小程序里保留大写，Chrome里转成了小写
    //   const key = rsaUtil.decrypt(decodeURIComponent(response.header['aes-key']), privateKey)
    //   // 把数据解码后用解密后的key解密，拿到正确数据
    //   const serveData = aesUtil.decrypt(decodeURIComponent(response.data), key)

    //   const { code, message = 'Error', data } = serveData

    //   if (code === 200) {
    //     return Promise.resolve(data)
    //   } else {
    //     Message({
    //       message,
    //       type: 'error',
    //       duration: 3 * 1000
    //     })
    //   }
    // } else {
    //   const message = '请求异常!'
    //   Message({
    //     message: message,
    //     type: 'error',
    //     duration: 3 * 1000
    //   })
    //   // return Promise.reject({ message: message, data: response.data })
    //   return response.data
    // }
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
