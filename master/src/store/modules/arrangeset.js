/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-17 05:21:28
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-17 05:34:15
 */

const state = {
  // 考勤设置
  config: {

  },
}

const mutations = {
  updateConfigData: (state, config) => {
    state.config = config
  }
}

export default {
  namespace: true,
  state,
  mutations,
}