import * as api from '@/api/auth'

const state = {
  token: localStorage.getItem('token') || null,
  user: {}
}

const mutations = {
  setAuthInfo: (state, payload) => {
    const { token } = payload.data
    localStorage.setItem('token', token)
    state.token = token
    state.user = payload.data
  },
  removeAuthInfo: (state) => {
    localStorage.removeItem('token')
    state.token = null
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
