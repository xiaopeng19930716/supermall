
import { quanQuerry, quanUpdate, quanAdd, quanDel } from "network/api/quantable"
const state = {
  // 请求到的所有原始表格数据
  quanData: [],
}
// getters表格显示效果
const getters = {
  // 日期保留HH:mm 1,0转换成是或否 选择框的选择转换成是或否
  tableView: state => {

  }
}
const mutations = {
  setQuanData: (state, quan) => {
    state.quanData = quan.data;
  },
  // 视图无法监听到对象数组数据的变化？
  updateQuanData: (state, data) => {
    for (let index = 0; index < state.quanData.length; index++) {
      const element = state.quanData[index];
      if (element.quanid === data.quanid) {
        state.quanData.splice(index, 1, data)
      }
    }
  },
  addQuanData: (state, data) => {
    state.quanData = data.concat(state.quanData);
  },
  deleteQuanData: (state, data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      state.quanData = state.quanData.filter(item => item.quanid != element)
    }
  },
  setEdit: (state, data) => { state.editrow = data },
  changeEdit: (state, data) => { state.quan = data }
}

const actions = {
  // 初始化显示列表
  getQuanData: ({ commit, rootState }) => {
    const pramas = {
      current: rootState.pagi.current,
      pageSize: rootState.pagi.pageSize,
    }
    quanQuerry(pramas)
      .then(res => {
        if (res.status) {
          commit("setTotal", res.count)
          commit('setQuanData', res)
        }
      }
      )
      .catch(err =>
        console.log(err)
      )
  },
  updateQuan: ({ commit }, pramas) => {
    return quanUpdate(pramas)
      .then(res => {
        if (res.status) {
          commit('updateQuanData', pramas)
          return true
        } else {
          return false
        }
      }
      ).catch(err =>
        console.log(err)
      )
  },
  insertQuan: ({ commit, rootState }, pramas) => {
    const temp = { ...pramas }
    return quanAdd(pramas)
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
  delQuan: ({ commit, rootState }, quanid) => {
    return quanDel(quanid)
      .then(res => {
        if (res.status) {
          const total = rootState.pagi.total - quanid.length
          commit("deleteQuanData", quanid)
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