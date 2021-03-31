import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/platform/loginUser',
    method: 'post',
    data
  })
}
export function logout () {
  return request({
    url: '/admin/auth/loginout',
    method: 'post'
  })
}

export function getInfo () {
  return request({
    url: '/admin/auth/info',
    method: 'get'
  })
}

export function getPublickey () {
  return request({
    url: '/nonLogin/getRSA',
    method: 'get'
  })
}

export function getSecretkey () {
  return request({
    url: '/nonLogin/getAES',
    method: 'get'
  })
}
