/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-13 16:24:46
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-29 21:29:12
 */
import http from 'network/localaxios';
const state = {
  // 所有系统用户用户数据
  data: [],
  // 系统用户可以访问的组件
}

const getters = {
  // 当前登录用户的用户数据
  loginUser: (state) => {
    const token = sessionStorage.getItem("token")
  },
  // 当前用户可以访问的组件
  accessConpoments: (state) => {

  }
}

const mutations = {
  setSysUserData: (state, sysuser) => {
    state.data = sysuser
  },
  addSysUserData: (state, newSysuser) => {
    state.data = newSysuser.concat(state.data)
  }
}

const actions = {
  getAllSysUserData: ({ commit }) => {
    return http("/users/querysys")
      .then(sysuser => {
        commit("setSysUserData", sysuser)
        return sysuser.length
      })
  },
  addSysUserData ({ commit }, params) {
    return http("/users/addsys", params).then(res => {
      if (res.status) {
        params.userno = res.userno
        commit("addSysUserData", [params])
        return true
      } else {
        return false
      }
    }).catch(err => console.log(err))
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}