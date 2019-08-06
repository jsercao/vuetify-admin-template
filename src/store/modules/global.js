const state = {
  keepAliveComponents: []
}

const mutations = {
  keepAlive(state, component) {
    !state.keepAliveComponents.includes(component) &&
          state.keepAliveComponents.push(component)
  },
  noKeepAlive(state, component) {
    const index = state.keepAliveComponents.indexOf(component)
    index !== -1 &&
          state.keepAliveComponents.splice(index, 1)
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
