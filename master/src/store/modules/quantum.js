/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-24 18:43:06
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-10 01:38:54
 */

import http from 'network/localaxios';

const state = {
  // 请求到的所有原始表格数据
  data: [],
}

const mutations = {
  setQuanData: (state, data) => {
    state.data = data;
  },
  // 视图无法监听到对象数组数据的变化？
  updateQuanData: (state, data) => {
    for (let index = 0; index < state.data.length; index++) {
      const element = state.data[index];
      if (element.quanid === data.quanid) {
        state.data.splice(index, 1, data)
      }
    }
  },
  addQuanData: (state, data) => {
    state.data = data.concat(state.data);
  },
  delQuanData: (state, data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      state.data = state.data.filter(item => item.quanid != element)
    }
  },
}

const actions = {
  // 初始化显示列表
  getAllQuantum: ({ commit }) => {
    return http("/quan/query")
      .then(res => {
        if (res.status) {
          const total = res.data.length;
          commit('setQuanData', res.data);
          return total
        }
      }
      )
      .catch(err =>
        console.log(err)
      )
  },
  updateQuanData: ({ commit }, pramas) => {
    const temp = { ...pramas }
    return http("/quan/update", pramas)
      .then(res => {
        if (res.status) {
          commit('updateQuanData', temp)
          return true
        } else {
          return false
        }
      }
      ).catch(err =>
        console.log(err)
      )
  },
  insertQuanData: ({ commit, rootState }, pramas) => {
    const temp = { ...pramas }
    return http("/quan/insert", pramas)
      .then(res => {
        if (res.status) {
          temp.quanid = res.quanid
          const count = rootState.pagi.total + 1
          commit("setTotal", count)
          commit("addQuanData", [temp])
          return true
        } else {
          return false
        }
      }).catch(err => {
        console.log(err);
      })
  },
  delQuanData: ({ commit, rootState }, quanid) => {
    return http("/quan/del", quanid)
      .then(res => {
        if (res.status) {
          const total = rootState.pagi.total - quanid.length
          commit("setTotal", total)
          commit("delQuanData", quanid)
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