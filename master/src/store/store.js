/*
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-26 19:11:25
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
        console.log(true);
        return true
      }
      return false
    }
  },
  mutations: {
    setEmptyMsg (state, msg) {
      state.emptyMsg = msg
    },
    setLogin (state, user) {
      sessionStorage.setItem("token", JSON.stringify(user.token));
      sessionStorage.setItem("loginUser", JSON.stringify(user))
      state.isLogin = true
    },
    setExit (state) {
      sessionStorage.clear()
      state.isLogin = false
    }
  },
  actions: {

  },
  modules,
})
