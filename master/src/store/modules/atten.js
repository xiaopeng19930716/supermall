
import { querry } from "network/localaxios"
const state = {
  // 请求到的所有原始表格数据
  attenData: [],
}
// getters表格显示效果
const getters = {

}
const mutations = {
  setAttenData: (state, data) => {
    state.attenData = data;
  },
  // 视图无法监听到对象数组数据的变化？
  updateAttenBase: (state, data) => {
    for (let index = 0; index < state.attenData.length; index++) {
      const element = state.attenData[index];
      if (element.rankid === data.rankid) {
        state.attenData.splice(index, 1, data)
      }
    }
  },
  updateAttenRank: (state, data) => {
    for (let index = 0; index < state.attenData.length; index++) {
      const element = state.attenData[index];
      if (element.rankid === data.rankid) {
        element.rankquantum = data.rankquantum;
        element.rankdays = data.rankdays;
        state.attenData[index] = element;
      }
    }
  },
  addAttenData: (state, data) => {
    state.attenData = data.concat(state.attenData);
  },
  deleteAttenData: (state, data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      state.attenData = state.attenData.filter(item => item.rankid != element)
    }
  },
  setEdit: (state, data) => { state.editrow = data },
  changeEdit: (state, data) => { state.Atten = data }
}

const actions = {
  // 获得所有数据
  getAttenData: ({ commit }, ) => {
    querry("/atten/querry")
      .then(res => {
        if (res.status) {
          commit("setTotal", res.data.length)
          commit('setAttenData', res.data)
        }
      }
      )
      .catch(err =>
        console.log(err)
      )
  },
  updateAtten: ({ commit }, pramas) => {
    return querry("/atten/update", pramas)
      .then(res => {
        if (res.status) {
          // 更新基本信息
          if (pramas.cycleunit) {
            commit('updateAttenBase', pramas)
          } else {
            commit("updateAttenRank", pramas)
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
  insertAtten: ({ commit, rootState }, pramas) => {
    pramas.cycle = pramas.cycle || 0;
    pramas.rankdays = "";
    pramas.rankquantum = "";
    const temp = { ...pramas }
    return querry("/atten/insert", pramas)
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
  delAtten: ({ commit, rootState }, id) => {
    return querry("/atten/del", id)
      .then(res => {
        if (res.status) {
          const total = rootState.pagi.total - id.length
          commit("deleteAttenData", id)
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
  getters,
  mutations,
  actions,
}