const state = {
  config: {
    edit: false,
    add: false,
    del:false
  }
}
const getters = {

}

const mutations = {
  changeConfig(state, newConfig) {
    state.config = newConfig
    console.log(state.config);
  }
}

const actions = {
  show({ commit }, config) {

    commit('changeConfig', config)
  }
}
export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}