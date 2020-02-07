import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filedata: []
  },

  mutations: {
    setfiledata(data) {
      this.filedata = data;
    }
  },

  actions: {

  },
})
