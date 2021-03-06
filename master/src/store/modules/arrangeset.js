/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-17 05:21:28
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-22 03:07:32
 */
import http from 'network/localaxios';
const state = {
  // 考勤设置
  config: {},
}

const mutations = {
  setConfigData: (state, config) => {
    state.config = config
  }
}
const actions = {
  getConfigData({ commit }) {
    http('/set/query').then(set => {
      commit("setConfigData", set)
    })
  },

  updateConfigData({ commit }, config) {
    return http('/set/update', config).then(res => {
      if (res.status) {
        commit("setConfigData", config)
        return true
      }
    })
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
}