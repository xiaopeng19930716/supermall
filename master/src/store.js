import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'http://110.80.38.74:6661/api/v2',
    page: '',
    option: '',
    endURL: '/?48ebcni1xafyxlez7zmfs5sja55dibrmvkaerkcgznky',
    url: ''
  },
  mutations: {
    getURL() {
      state.url = state.baseURL + state.page+state.option+state.endURL;
      return state.url
    }
  },

  actions: {

  },
})
