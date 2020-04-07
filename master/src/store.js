/*
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-07 15:45:32
 */
import Vue from 'vue'
import Vuex from 'vuex'
import modules from "../src/store/modules"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    emptyMsg: ""
  },
  getters: {

  },
  mutations: {
    setEmptyMsg(state, msg) {
      state.emptyMsg = msg
    }
  },
  actions: {

  },
  modules: modules
})
