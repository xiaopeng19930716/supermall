
import { querry } from "network/localaxios"
const state = {
  // 请求到的所有原始表格数据
  attenData: [],
}
// getters表格显示效果
const getters = {

}
const mutations = {
  setAttenData: (state, atten) => {
    state.attenData = atten.data;
  },
  // 视图无法监听到对象数组数据的变化？
  updateAttenData: (state, data) => {
    for (let index = 0; index < state.AttenData.length; index++) {
      const element = state.AttenData[index];
      if (element.Attenid === data.Attenid) {
        state.AttenData.splice(index, 1, data)
      }
    }
  },
  addAttenData: (state, data) => {
    state.AttenData = data.concat(state.AttenData);
  },
  deleteAttenData: (state, data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      state.AttenData = state.AttenData.filter(item => item.Attenid != element)
    }
  },
  setEdit: (state, data) => { state.editrow = data },
  changeEdit: (state, data) => { state.Atten = data }
}

const actions = {
  // 初始化显示列表
  getAttenData: ({ commit, rootState }) => {
    const pramas = {
      current: rootState.pagi.current,
      pageSize: rootState.pagi.pageSize,
    }
    querry("/atten/querry", pramas)
      .then(res => {
        if (res.status) {
          console.log(res);
          commit("setTotal", res.count)
          commit('setAttenData', res)
        }
      }
      )
      .catch(err =>
        console.log(err)
      )
  },
  updateAtten: ({ commit }, pramas) => {
    return AttenUpdate(pramas)
      .then(res => {
        if (res.status) {
          commit('updateAttenData', pramas)
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
    const temp = { ...pramas }
    return AttenAdd(pramas)
      .then(res => {
        if (res.status) {
          temp.Attenid = res.Attenid
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
  delAtten: ({ commit, rootState }, Attenid) => {
    return AttenDel(Attenid)
      .then(res => {
        if (res.status) {
          const total = rootState.pagi.total - Attenid.length
          commit("deleteAttenData", Attenid)
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