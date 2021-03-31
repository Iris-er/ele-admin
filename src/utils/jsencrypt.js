import JSEncrypt from 'jsencrypt'
const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwYWXWzYJvoICnSox1QohxCSl/MtpCl+sbMlj0SQttfbbdY65kBn7YlJ1znl7iyrTTIT20qcs7OKbo7v3zvHJCJ+RQfQDH0nTRDIKjWVgjau5hpnv/3WFNuyaDH6qxkhfbD5MYyLcD2A2GSDSv4FhDpxXVGUPzuH0A82wCov2FnQIDAQAB----- END PUBLIC KEY-----'
function getRSAString (data) {
  const encryptor = new JSEncrypt() // 新建JSEncrypt对象
  encryptor.setPublicKey(PUBLIC_KEY) // 设置公钥
  const rsaDta = encryptor.encrypt(data) // 进行加密
  return rsaDta
}
export {
  getRSAString
}

// C_pub_key

/* -----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwYWXWzYJvoICnSox1QohxCSl /
  MtpCl + sbMlj0SQttfbbdY65kBn7YlJ1znl7iyrTTIT20qcs7OKbo7v3zvHJCJ + RQ
fQDH0nTRDIKjWVgjau5hpnv / 3WFNuyaDH6qxkhfbD5MYyLcD2A2GSDSv4FhDpxXV
GUPzuH0A82wCov2FnQIDAQAB
----- END PUBLIC KEY----- */

// C_prv_key

/* -----BEGIN RSA PRIVATE KEY-----MIICXQIBAAKBgQCwYWXWzYJvoICnSox1QohxCSl/MtpCl+sbMlj0SQttfbbdY65kBn7YlJ1znl7iyrTTIT20qcs7OKbo7v3zvHJCJ+RQfQDH0nTRDIKjWVgjau5hpnv/3WFNuyaDH6qxkhfbD5MYyLcD2A2GSDSv4FhDpxXVGUPzuH0A82wCov2FnQIDAQABAoGAaG2iMCWI/rJWubWnp512zwYPraHcG+V6a6XJiQjeXTs7U6S7EbnOzEhhWJ0BrOE7Ym2h7R9ClpOaLvuhG/gM5SavKGFSm8a+vDTQCb9V5aSMU22HkLorfkblBLJnWmDcYbYtpUNFxZgmOB/tgrWPY7wVIhRg4H41E3OfsS+R/oECQQDZF3m4Y18EY5r8p8IIbVxxk2m2FKz5/444NEZcOiyRicEC+aHEaF5b6T7bV9IhDNnaHNxaZqKZCArLl/btFattAkEAz/4GCxIZt5sKu11S+894TSUh3HWIh0ckxNWiA5S/lmGrdOKmLwACskGmUvnnlXOz70z8AgxTW+FqRMjCLbk08QJBAIZqNKFoVbKgAZyiOk+BdxWTkoZ8ssVv6B0AsPf1xRav1mQDMJgtjw8Vkie5bo+sJ08XQ5BtsAtUoWqBww/0tNkCQQCClI/EuYttyyf0s8WalAmKHWrh1uRtUcwSy7DYoLWbuxwC2RzOWypWMYMzivPKz4ZDEckRnB1ljOLD5mqKfEFxAkA8r+v/Xv/xLs4FYEpYD+IdZVaddNWiNxCi6W3cMMeohF0XZgHJGwG8tSLMf5uvCCgYd5dtXHljrYCrfI2yn82C----- END RSA PRIVATE KEY----- */

// /**
// * get方式请求，url传参
// * @param url 请求url
// * @param params 参数
// * @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
// */
// export const get = (url, params, level) => service(getConfig(url, 'get', true, params, level)).then(res => successback(res)).catch(error => errback(error))

// /**
// * @param url 请求url
// * @param method get,post,put,delete
// * @param isjson 是否json提交参数
// * @param params 参数
// * @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
// */
// const getConfig = (url, method, isjson, params, level = 0) => {
//   const config_ = {
//     url,
//     method,
//     // params, data,
//     headers: {
//       level
//     }
//   }
//   // 时间戳
//   if (level === 1) { // 加密
//     params = { encrypt: aes.en(JSON.stringify(params)) }
//   } else if (level === 2) { // 签名
//     const timestamp = new Date().getTime()
//     // 获取token
//     let token = store.state.token
//     if (!token) {
//       token = JSON.parse(sessionStorage.getItem('user')).token
//       store.state.token = token
//     }
//     // 签名串
//     const signstr = sign(token, timestamp, params)
//     console.log('token', token)
//     console.log('signstr', signstr)
//     config_.headers = {
//       level,
//       timestamp,
//       signstr
//     }
//   }
//   // 表单提交参数
//   if (!isjson) {
//     config_.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//     config_.responseType = 'text'
//     config_.transformRequest = [function (data) {
//       return param2String(data)
//     }]
//   }
//   // 设置参数
//   if (method in { get: true, delete: true }) {
//     config_.params = params
//   } else if (method in { post: true, put: true }) {
//     config_.data = params
//   }
//   return config_
// }

// // 成功回调函数
// const successback = res => {
//   if (res.status === 200 && res.data.code !== 20000) {
//     const errMsg = { 30002: '对不起无权限', 30003: '验签失败' }
//     const msg = errMsg[res.data.code]
//     if (msg) {
//       Message({
//         message: errMsg[res.data.code],
//         type: 'error'
//       })
//     }
//     return Promise.reject(res.data)
//   }
//   return res.data
// }

// // 错误回调函数
// const errback = error => {
//   if ('code' in error) {
//     // 未登录
//     if (error.code === 30001) {
//       sessionStorage.clear()
//       window.location.href = '/'
//       return
//     }
//     return Promise.reject(error)
//   }
//   // 网络异常,或链接超时
//   Message({
//     message: error.message,
//     type: 'error'
//   })
//   // return Promise.reject(false)
//   // return Promise.reject({ data: error.message })
// }

// // 参数转换
// const param2String = data => {
//   console.log('data', data)
//   if (typeof data === 'string') {
//     return data
//   }
//   let ret = ''
//   for (const it in data) {
//     let val = data[it]
//     if (typeof val === 'object' && //
//       (!(val instanceof Array) || (val.length > 0 && (typeof val[0] === 'object')))) {
//       val = JSON.stringify(val)
//     }
//     ret += it + '=' + encodeURIComponent(val) + '&'
//   }
//   if (ret.length > 0) {
//     ret = ret.substring(0, ret.length - 1)
//   }
//   return ret
// }

// function getDAesString(encrypted, key, iv) { // 解密
//   key = CryptoJS.enc.Utf8.parse(key)
//   iv = CryptoJS.enc.Utf8.parse(iv)
//   const decrypted = CryptoJS.AES.decrypt(encrypted, key,
//     {
//       iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     })
//   return decrypted.toString(CryptoJS.enc.Utf8) //
// }
// // AES 对称秘钥加密
// const aes = {
//   en: (data) => getAesString(data, KP.key, KP.iv),
//   de: (data) => getDAesString(data, KP.key, KP.iv)
// }
// // BASE64
// const base64 = {
//   en: (data) => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data)),
//   de: (data) => CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8)
// }
// // SHA256
// const sha256 = (data) => {
//   return CryptoJS.SHA256(data).toString()
// }
// // MD5
// const md5 = (data) => {
//   return CryptoJS.MD5(data).toString()
// }

// /**
// * 签名
// * @param token 身份令牌
// * @param timestamp 签名时间戳
// * @param data 签名数据
// */
// const sign = (token, timestamp, data) => {
//   // 签名格式： timestamp + token + data(字典升序)
//   const ret = []
//   for (const it in data) {
//     let val = data[it]
//     if (typeof val === 'object' && //
//       (!(val instanceof Array) || (val.length > 0 && (typeof val[0] === 'object')))) {
//       val = JSON.stringify(val)
//     }
//     ret.push(it + val)
//   }
//   // 字典升序
//   ret.sort()
//   const signsrc = timestamp + token + ret.join('')
//   return md5(signsrc)
// }

// function generateStr(len = 6) {
//   // 一行代码生成0-9、A-Z、a-z、总长度为62的字符数组
//   var arr = [...new Array(62)].map((item, i) => String.fromCharCode(i + (i < 10 ? 0 : (i < 36 ? 7 : 13)) + 48))
//   return [...new Array(len)].map(() => arr[Math.floor(Math.random() * arr.length)]).join('')
// }
