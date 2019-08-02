import axios from 'axios'
import Snackbar from '../components/snackbar/index'

const service = axios.create({
  baseURL: '',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

/* eslint-disable no-param-reassign */
service.interceptors.request.use((request) => {
  const token = localStorage.getItem('token')
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
})

service.interceptors.response.use(response => response, (error) => {
  console.log('http error', error)
  return Promise.reject(error.status ? error : error.response)
})

/**
 * API数据请求
 * @param {*} url 接口地址
 * @param {*} param 接口参数
 * @param {*} method 接口method
 */
const fetchData = async(url, param, method) => {
  param = param || {}
  let ret = null
  const upperMethod = method.toUpperCase()
  if (upperMethod === 'POST') {
    ret = service.post(url, param)
  } else if (upperMethod === 'PUT') {
    ret = service.put(url, param)
  } else if (upperMethod === 'DELETE') {
    ret = service.delete(url, { params: { ...param }})
  } else {
    ret = service.get(url, { params: { ...param }})
  }

  return ret.then((res) => {
    if (res.data.status) {
      return res.data
    }
    return Promise.reject(res)
  }, (res) => {
    let errMsg = ''
    switch (res.status) {
      case 401:
        errMsg = '无权访问'
        break
      case 403:
        errMsg = '禁止访问'
        break
      case 404:
        errMsg = '页面不存在'
        break
      case 500:
        errMsg = '服务器异常'
        break
      default:
        errMsg = '未知异常'
        break
    }

    if (errMsg) {
      Snackbar.error(errMsg)
    }
    return Promise.reject(res)
  })
}

export default {
  get(url, param) {
    return fetchData(url, param, 'get')
  },
  delete(url, param) {
    return fetchData(url, param, 'delete')
  },
  post(url, param) {
    return fetchData(url, param, 'post')
  },
  put(url, param) {
    return fetchData(url, param, 'put')
  }
}
