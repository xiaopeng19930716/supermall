/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-11 05:06:09
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-01 18:06:22
 */
import http from 'network/localaxios';
// initial state
const state = {
  data: []
}

// getters
const getters = {}

// mutations
const mutations = {
  setRecordData: (state, data) => {
    state.data = data;
  }
}

// actions
const actions = {
  getRecordDataByDate: ({ commit, rootState }, search) => {
    const params = {
      current: rootState.pagi.current,
      pageSize: rootState.pagi.pageSize,
      startTime: search.startTime,
      endTime: search.endTime,
      nameOrNo: search.nameOrNo
    }
    return http("/record/query", params)
      .then(record => {
        if (record.status) {
          const total = record.count
          commit("setRecordData", record.data)
          return total
        }
      })
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
