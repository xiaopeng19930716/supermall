
import http from "network/localaxios"

const state = {
  // 请求到的所有原始表格数据
  data: [],
}

const mutations = {
  setAttenData: (state, data) => {
    state.data = data;
  },
  // 视图无法监听到对象数组数据的变化？
  updateAttenBase: (state, data) => {
    for (let index = 0; index < state.data.length; index++) {
      const element = state.data[index];
      if (element.rankid === data.rankid) {
        state.data.splice(index, 1, data)
      }
    }
  },
  updateAttenRank: (state, data) => {
    for (let index = 0; index < state.data.length; index++) {
      const element = state.data[index];
      if (element.rankid === data.rankid) {
        element.rankquantum = data.rankquantum;
        element.rankdays = data.rankdays;
        state.data[index] = element;
      }
    }
  },
  addAttenData: (state, data) => {
    state.data = data.concat(state.data);
  },
  delAttenData: (state, data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      state.data = state.data.filter(item => item.rankid != element)
    }
  },
}

const actions = {
  // 获得所有数据
  getAttenData: ({ commit }, ) => {
    return http("/atten/query")
      .then(res => {
        if (res.status) {
          commit('setAttenData', res.data)
          return res.data.length
        }
      }
      )
      .catch(err =>
        console.log(err)
      )
  },
  updateAttenData: ({ commit }, pramas) => {
    const temp = { ...pramas }
    return http("/atten/update", pramas)
      .then(res => {
        if (res.status) {
          // 更新基本信息
          if (pramas.cycleunit) {
            commit('updateAttenBase', temp)
          } else {
            commit("updateAttenRank", temp)
            // 更新班次信息
          }
          return true
        } else {
          return false
        }
      }
      ).catch(err =>
        console.log(err)
      )
  },

  insertAttenData: ({ commit, rootState }, pramas) => {
    pramas.cycle = pramas.cycle || 0;
    pramas.rankdays = "";
    pramas.rankquantum = "";
    const temp = { ...pramas }
    return http("/atten/insert", pramas)
      .then(res => {
        if (res.status) {
          temp.rankid = res.rankid
          const count = rootState.pagi.total + 1
          commit("setTotal", count)
          commit("addAttenData", [temp])
          return true
        } else {
          return false
        }
      }).catch(err => {
        console.log(err);
      })
  },

  delAttenData: ({ commit, rootState }, id) => {
    return http("/atten/del", id)
      .then(res => {
        if (res.status) {
          const total = rootState.pagi.total - id.length
          commit("delAttenData", id)
          commit("setTotal", total)
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