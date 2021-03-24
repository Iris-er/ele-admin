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

export function getPowers () {
  return request({
    url: '/df/adm/auth/v1/powers',
    method: 'get'
  })
}

export function getGoods ({ pageIndex, pageSize }) {
  return request({
    url: '/manager/goods/',
    method: 'get',
    params: { pageIndex, pageSize }
  })
}
