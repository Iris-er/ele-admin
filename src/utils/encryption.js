/**
* 通过crypto-js实现 加解密工具
* AES、HASH(MD5、SHA256)、base64
* @author: ldy
*/
import CryptoJS from 'crypto-js'
const KP = {
  key: '12345678asdSDF67', // 秘钥 16*n:
  iv: '1234567812345678' // 偏移量
}
function getAesString (data) { // 加密
  const key = CryptoJS.enc.Utf8.parse(KP.key)
  // alert(key）;
  const iv = CryptoJS.enc.Utf8.parse(KP.iv)
  const encrypted = CryptoJS.AES.encrypt(data, key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  return encrypted.toString() // 返回的是base64格式的密文
}

export {
  getAesString
}
