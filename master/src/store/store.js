/*
 * @Descripttion:store 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-26 12:03:03
 */
import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./modules"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    emptyMsg: "",
  },
  getters: {
    isLogin: (state) => {
      const token = sessionStorage.getItem("token")
      if (token) {
        return true
      }
      return false
    }
  },
  mutations: {
    setEmptyMsg(state, msg) {
      state.emptyMsg = msg
    },
    setLogin(state, user) {
      const { token } = user
      console.log(token);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("loginUser", JSON.stringify(user))
      state.isLogin = true
    },
    setExit(state) {
      sessionStorage.clear()
      state.isLogin = false
    }
  },
  actions: {

  },
  modules,
})
