import request from '@/utils/request'

/**
 * login
 * @param {*} params
 */
export function login(params) {
  return request.post('/login', params)
}

/**
 * logpout
 * @param {*} params
 */
export function logout(params) {
  return request.post('/logout', params)
}

/**
 * 获取用户信息
 * @param {*} params
 */
export function getAuthInfo(params) {
  return request.get('/authInfo', params)
}
