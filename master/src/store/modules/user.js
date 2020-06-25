/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-19 21:12:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-24 23:02:48
 */

import http from "network/localaxios";
const state = {
  // 请求到的所有表格数据
  data: [],
  isLoading: false,
}

const mutations = {
  setUserData: (state, data) => {
    state.data = data
  },
  updateUserData: (state, data) => {
    for (let index = 0; index < state.data.length; index++) {
      for (const value of data) {
        if (state.data[index].userid === value.userid) {
          state.data.splice(index, 1, value)
        }
      }
    }
  },
  insertUserData: (state, data) => {
    state.data = data.concat(state.data);
  },
  delUserData: (state, data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      state.data = state.data.filter(item => item.userid != element)
    }
  },
  updateUserDataByDept: (state, data) => {
    const { rankname, deptname } = data;
    for (let index = 0; index < state.data.length; index++) {
      const element = state.data[index];
      if (element.deptname === deptname) {
        element.rankname = rankname;
        element.atten = "是";
        state.data.splice(index, 1, element)
      }
    }
  },
  clearArrangeData: (state, data) => {
    const { userId, deptName } = data;
    for (let index = 0; index < state.data.length; index++) {
      const element = state.data[index];
      if (deptName === element.deptname || userId.includes(element.userid)) {
        element.atten = "否";
        state.data.splice(index, 1, element)
      }
    }
  }
}

const actions = {
  getUserDataByDept: async ({ commit, rootState }, { deptName, nameOrNo }) => {
    const params = {
      current: rootState.pagi.current,
      pageSize: rootState.pagi.pageSize,
      deptName: deptName,
      nameOrNo: nameOrNo
    }
    const { count, data } = await http("/users/query", params)
    commit("setTotal", count)
    commit("setUserData", data)
  },

  updateUserData: ({ commit }, userInfo) => {
    const temp = { ...userInfo }
    return http("/users/update", userInfo)
      .then(res => {
        if (res.status) {
          commit('updateUserData', [temp])
          return true
        } else {
          return false
        }
      }
      ).catch(err =>
        console.log(err)
      )
  },

  insertUserData: ({ commit, rootState }, newUser) => {
    const temp = { ...newUser }
    return http("/users/insert", newUser)
      .then(res => {
        if (res.status) {
          temp.userid = res.userid
          commit("setTotal", rootState.pagi.total + 1)
          commit("insertUserData", [temp])
          return true
        } else {
          return false
        }
      }).catch(err => {
        console.log(err);
      })
  },
  fileInUser: ({ commit, rootState }, payload) => {
    return userAdd(payload)
      .then(res => {
        if (res.status) {
          let array = payload
          for (let index = 0; index < array.length; index++) {
            array[index].userid = res.start + index;
          }
          const total = rootState.pagi.total + res.count
          commit("setTotal", total)
          commit("insertUser", array);
          return true
        } else {
          return false
        }
      })
      .catch(err => console.log(err))
  },
  delUserData: ({ commit, rootState }, userId) => {
    return http("/users/del", userId)
      .then(res => {
        if (res.status) {
          commit("setTotal", rootState.pagi.total - userId.length)
          commit("delUserData", userId)
          return true
        } else {
          return false
        }
      })
      .catch(err => err)
  },
  updateArrangeDataByPerson: ({ commit }, params) => {
    const atten = params[0].atten;
    const rankname = params[0].rankname;
    let userid = [];
    params.forEach(element => {
      userid.push(element.userid)
    });
    return http('/users/updatebyid', { rankname, atten, userid })
      .then(res => {
        if (res.status) {
          commit('updateUserData', params)
          return true;
        } else {
          return false
        }
      }).catch(err => console.log(err))
  },
  updateArrangeDataByDept: ({ commit }, params) => {
    return http('/users/updatebydept', params)
      .then(res => {
        if (res.status) {
          commit('updateUserDataByDept', params)
          return true;
        } else {
          return false
        }
      }).catch(err => console.log(err))
  },

  clearArrangeData: ({ commit }, params) => {
    const { userId, deptName } = params
    return http('/users/cleararrange', params)
      .then(res => {
        if (res.status) {
          commit("clearArrangeData", params)
          return true
        } else {
          return false
        }
      }).catch(err => console.log(err))
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
}