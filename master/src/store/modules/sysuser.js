/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-13 16:24:46
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-23 12:46:01
 */
import http from 'network/localaxios';
const state = {
  // 所有系统用户用户数据
  data: [],
}

const getters = {
  // 当前登录用户的用户数据
  loginUser: (state) => {
    const token = sessionStorage.getItem("token")

  }
}

const mutations = {
  setSysUserData: (state, data) => {
    state.data = data
  },
  addSysUserData: (state, data) => {
    state.data = data.concat(state.data)
  }
}

const actions = {
  getAllSysUserData: ({ commit }, params) => {
    return http("/users/querysys")
      .then(sysuser => {
        commit("setSysUserData", sysuser)
        return sysuser.length
      })
      .catch(err => console.log(err));
  },
  addSysUserData({ commit }, params) {
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