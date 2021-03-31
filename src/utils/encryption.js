import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'jsencrypt'
import { getSecretkey } from '@/api/common.js'

// export const keyUtil = {
//   getServePublickey: function () {
//     // return 4324
//     getPublickey().then(res => {
//       const { code, data } = res
//       if (code === 0) {
//         console.log(data)
//         const serveceKey = {
//           pub_key: data.publicKey,
//           prv_key: data.privateKey
//         }
//         return serveceKey
//       }
//     })
//   },
//   getServiceSecretKey: function () {
//     getSecretkey().then(res => {
//       const { code, data } = res
//       if (code === 200) {
//         console.log(data)

//         return data.SecretKey
//       }
//     })
//   }
// }

// function getServeRsakey () {
//   getPublickey().then(res => {
//     const { code, data } = res
//     if (code === 0) {
//       console.log(data)
//       const serveceKey = {
//         pub_key: data.publicKey,
//         prv_key: data.privateKey
//       }
//       return serveceKey
//     }
//   })
// };

const getSecretAesKey = () => {
  return new Promise((resolve, reject) => {
    getSecretkey().then(res => {
      const { code, data } = res
      if (code === 0) {
        console.log(data)
        resolve(data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * aes加密
 */
export const aesUtil = {

  // 获取key
  genKey: function (length = 6) {
    const random = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let str = ''
    for (let i = 0; i < length; i++) {
      str = str + random.charAt(Math.random() * random.length)
    }

    return str
  },

  // 加密
  encrypt: function (plaintext, key) {
    if (plaintext instanceof Object) {
      // JSON.stringify
      plaintext = JSON.stringify(plaintext)
    }
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
      // JSON.parse
      decString = JSON.parse(decString)
    }
    return decString
  }

  // getServiceSecretKey () {
  //   return new Promise((resolve, reject) => {
  //     getSecretkey().then(res => {
  //       const { code, data } = res
  //       if (code === 0) {
  //         console.log(data)
  //         resolve(data)
  //       }
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }
}

/**
 * rsa加密
 */
export const rsaUtil = {
  // RSA 位数，这里要跟后端对应
  bits: 1024,

  // 当前JSEncrypted对象
  thisKeyPair: {},

  // 生成密钥对(公钥和私钥)
  genKeyPair: function (bits = rsaUtil.bits) {
    const genKeyPair = {}
    rsaUtil.thisKeyPair = new JSEncrypt({
      default_key_size: bits
    })
    // 这里项目使用的是静态秘钥，所以该方法在本地执行一次，获取到配对的公私钥保存下即可
    // 获取私钥
    genKeyPair.privateKey = rsaUtil.thisKeyPair.getPrivateKey()

    // 获取公钥
    genKeyPair.publicKey = rsaUtil.thisKeyPair.getPublicKey()

    return genKeyPair
  },

  // 公钥加密
  encrypt: function (plaintext, publicKey) {
    // 由于秘钥已经生存一对保存在本地，该方法就在内部调用，生成setPublicKey方法
    this.genKeyPair()
    console.log('this.genKeyPair() : ', this.genKeyPair())
    if (plaintext instanceof Object) {
      // 1、JSON.stringify
      plaintext = JSON.stringify(plaintext)
    }
    publicKey && rsaUtil.thisKeyPair.setPublicKey(publicKey)
    // console.log('rsaUtil.thisKeyPair', rsaUtil.thisKeyPair.encrypt(JSON.stringify(plaintext)))

    return rsaUtil.thisKeyPair.encrypt(JSON.stringify(plaintext))
  },

  // 私钥解密
  decrypt: function (ciphertext, privateKey) {
    privateKey && rsaUtil.thisKeyPair.setPrivateKey(privateKey)
    let decString = rsaUtil.thisKeyPair.decrypt(ciphertext)
    if (decString.charAt(0) === '{' || decString.charAt(0) === '[') {
      // JSON.parse
      decString = JSON.parse(decString)
    }
    return decString
  }
}

/**
 * 本地rsa已经生成的秘钥，可以统一带-----BEGIN PUBLIC KEY-----/-----END PUBLIC KEY-----的前后缀，也可以不带
 */
// export const publicKey = `前端的公钥`
export const publicKey = rsaUtil.genKeyPair().publicKey

// export const publicKey = `前端的私钥`
export const privateKey = rsaUtil.genKeyPair().privateKey
// console.log('keyUtil.getServePublickey().pub_key', aesUtil.getServiceSecretKey())
// console.log(getSecretAesKey, getServeRsakey())
// console.log(getSecretkey().then())
console.log(1111, getSecretAesKey())

// /**
//  * 服务端rsa生成的公钥
//  */
// export const servePublicKey = keyUtil.getServePublickey().pub_key

// /**
//  * 服务端rsa生成的私钥
//  */
// export const servePrivateKey = keyUtil.getServePublickey().prv_key

// /**
//  * 服务端aes生成的秘钥
//  */
// export const serveSecretKey = keyUtil.getServePublickey().secret_key
