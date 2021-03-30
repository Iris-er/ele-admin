import JSEncrypt from 'jsencrypt'
const PUBLIC_KEY = '这里是gdsgfdshfh生成的公钥'
function getRSAString (data) {
  const encryptor = new JSEncrypt() // 新建JSEncrypt对象
  encryptor.setPublicKey(PUBLIC_KEY) // 设置公钥
  const rsaDta = encryptor.encrypt(data) // 进行加密
  return rsaDta
}
export {
  getRSAString
}
