import * as api from '@/api/auth'

const state = {
  token: localStorage.getItem('token') || null,
  roles: [],
  user: {}
}

const mutations = {
  setAuthInfo: (state, payload) => {
    const { token, role } = payload.data
    localStorage.setItem('token', token)
    state.token = token
    state.roles = role
    state.user = payload.data
  },
  removeAuthInfo: (state) => {
    localStorage.removeItem('token')
    state.token = null
    state.roles = []
    state.user = {}
  }
}

const actions = {
  login({ commit, dispatch }, params) {
    return api.login(params).then(results => {
      commit('setAuthInfo', results)
      return results
    }, res => Promise.reject(res))
  },
  getAuthInfo({ commit, dispatch }, params) {
    return api.getAuthInfo(params).then(results => {
      commit('setAuthInfo', results)
      return results.data
    }, res => Promise.reject(res))
  },
  logout({ commit, dispatch }, params) {
    return api.logout(params).then(results => {
      commit('removeAuthInfo', results)
      return results
    }, res => Promise.reject(res))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
