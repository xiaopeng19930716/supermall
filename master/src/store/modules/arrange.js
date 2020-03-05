/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-04 12:46:04
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-05 13:26:40
 */

import { querry } from 'network/localaxios'
const state = {
  arrangeData: [],
}

const mutations = {
  setArrangeData: (state, data) => {
    state.arrangeData = data;
  },
  updatearrangeData: (state, data) => {
    state.arrangeData.forEach(element => {
      if (element.userid === data.userid) {
        element = data
      }
    });
  },
  insertUser: (state, data) => {
    state.arrangeData = data.concat(state.arrangeData);
  },
  deleteUsers: (state, data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      state.arrangeData = state.arrangeData.filter(item => item.userid != element)
    }
  },
}

const actions = {
  // 初始化用户列表
  getArrangeByDept: ({ commit, rootState }, deptName) => {
    const pramas = {
      current: rootState.pagi.current,
      pageSize: rootState.pagi.pageSize,
      deptName: deptName
    }
    querry("/users/arrange", pramas)
      .then(res => {
        if (res.status) {
          commit("setTotal", res.count)
          commit('setArrangeData', res.data)
        }
      }
      )
      .catch(err =>
        console.log(err)
      )
  },
  delArrangeInfo: ({ commit }, userid) => {
    return userDel(userid)
      .then(res => {
        if (res.status) {
          commit("setTotal", res.count)
          commit("deleteUsers", userid)
          return true
        } else {
          return false
        }
      })
      .catch(err => err)
  },
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
}