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
