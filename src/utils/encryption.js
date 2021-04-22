import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'jsencrypt'
import axios from 'axios'
// import Vue from 'vue'

/**
 * 递归自然排序: key + value
 * sortObjFunc: 排序方法
 * isArraysFunc: 判断是否array
 * isObjectFunc: 判断是否object
 * isHasValues: 判断空值，null，undefined
 * 排序前: {"aaa":"111","bbb":"222","list_1":[],"list":["3","13"],"map":{"b":"2","c":"3"}}
 * 排序后: aaa111bbb222list423.852313list_1mapb2c3
 */
export const signUtil = {
  sortObjFunc: function (plaintext) {
    let signStr = ''
    const keyList = []
    for (const key in plaintext) { keyList.push(key) }
    if (keyList.length) { keyList.sort() }

    const len = keyList.length
    for (let i = 0; i < len; i++) {
      let value = plaintext[keyList[i]]
      if (value && signUtil.isHasValues(value)) {
        if (signUtil.isArraysFunc(value) || signUtil.isObjectFunc(value)) {
          value = signUtil.sortObjFunc(value)
        }
      }

      // 数组取value，否则取key+value(排除null，空，undefined)
      if (signUtil.isArraysFunc(plaintext)) {
        signStr += value
      } else {
        value !== null ? signStr += keyList[i] + value : signStr += keyList[i]
      }
    }
    return signStr
  },

  isArraysFunc (item) { return Object.prototype.toString.call(item) === '[object Array]' },

  isObjectFunc (item) { return Object.prototype.toString.call(item) === '[object Object]' },

  isHasValues (item) { return item !== 'null' || item !== 'undefined' || item !== 0 }
}

/**
 * aes加密
 * genKey: 获取key
 * encrypt: AES加密
 * decrypt: AES解密
 */
export const aesUtil = {
  genKey: function (expect = 6) {
    const random = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let str = ''
    while (str.length < expect) { str += random.charAt(Math.random() * random.length) }
    return str
  },
  // 加密
  encrypt: function (plaintext, key) { // plaintext: 加密的内容
    if (plaintext instanceof Object) { plaintext = JSON.stringify(plaintext) }
    // 注意：像这里前后端一定要对应
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), CryptoJS.enc.Utf8.parse(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  // 解密
  decrypt: function (ciphertext, key) {
    const decrypt = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    let decString = CryptoJS.enc.Utf8.stringify(decrypt).toString()
    if (decString.charAt(0) === '{' || decString.charAt(0) === '[') {
      decString = JSON.parse(decString)
    }
    return decString
  }
}

/**
 * rsa加密
 * encrypt: 公钥加密
 * decrypt: 私钥解密
 * ensign: rsa签名
 * design: rsa验签
 */
const encryptor = new JSEncrypt({ default_key_size: 1024 }) // default_key_size: RSA 位数，这里要跟后端对应
export const rsaUtil = {
  encrypt: function (key, publicKey) {
    publicKey && encryptor.setPublicKey(publicKey) // 设置公钥
    return encryptor.encrypt(key) // 对内容进行加密
  },

  decrypt: function (key, privateKey) {
    privateKey && encryptor.setPrivateKey(privateKey) // 设置秘钥
    return encryptor.decrypt(key) // 解密之前拿公钥加密的内容
  },

  ensign: function (data, privateKey) {
    privateKey && encryptor.setPrivateKey(privateKey)
    return encryptor.sign(data, CryptoJS.SHA256, 'sha256')
  },

  design: function (data, signature, publicKey) {
    if (signature && publicKey) {
      encryptor.setPrivateKey(publicKey)
      return encryptor.verify(data, signature, CryptoJS.SHA256)
    }
  }
}

// 获取获取服务端RSA公钥
async function getServicePublicKey () {
  // const rp = await axios.post(process.env.VUE_APP_BANKAPI_LOGIN_URL + '/auth/config/device/secret/rsa')
  const rp = await axios.get(process.env.VUE_APP_API_URL + '/nonLogin/getRSA')

  const { code, data } = rp.data
  if (code === 0) {
    return Promise.resolve(data)
  }
}

// 获取服务端AES秘钥
async function getServiceSecretKey () {
  const params = await getServicePublicKey()
  // const rp = await axios.post(process.env.VUE_APP_BANKAPI_LOGIN_URL + '/auth/config/device/secret/aes', { appId: params.appId, pubKey: aesUtil.encrypt(aesUtil.genKey(), params.pubKey) })
  const rp = await axios.get(process.env.VUE_APP_API_URL + '/nonLogin/getAES', { appId: params.appId, pubKey: aesUtil.encrypt(aesUtil.genKey(), params.publicKey) })
  if (rp.data) {
    return Promise.resolve(rp.data.SecretKey)
  }
}

/**
 * RSA秘钥对
 * publicKey: 前端rsa公钥
 * privateKey: 前端rsa私钥
 * servePublicKey: 服务端rsa公钥
 * serveSecretKey: 服务端aes秘钥
 */
export const publicKey = encryptor.getPublicKey()
export const privateKey = encryptor.getPrivateKey()
export const servePublicKey = getServicePublicKey()
export const serveSecretKey = getServiceSecretKey()
