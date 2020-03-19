/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-18 04:09:32
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-18 04:14:26
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
  setReportData: (state, data) => {
    state.data = data;
  }
}

// actions
const actions = {
  getReportData: ({ commit, rootState }, search) => {
    const params = {
      current: rootState.pagi.current,
      pageSize: rootState.pagi.pageSize,
      startTime: search.startTime,
      endTime: search.endTime,
      nameOrNo: search.nameOrNo
    }
    return http("/report/query", params)
      .then(report => {
        if (report.status) {
          const total = report.count
          commit("setReportData", report.data)
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
