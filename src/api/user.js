import request from '@/utils/request'
export function login (data) {
  return request({
    url: '/df/adm/login/v1/mp',
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

export function getPowers () {
  return request({
    url: '/df/adm/auth/v1/powers',
    method: 'get'
  })
}
