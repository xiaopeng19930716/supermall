
import { quanQuerry, quanUpdate, quanAdd, quanSearch, quanDel } from "network/api/quantable"
const state = {
  // 请求到的所有表格数据
  quanData: [],
}
const mutations = {
  setQuanData: (state, quan) => {
    state.quanData = quan.data;
  },
  updateQuanData: (state, data) => {
    state.quanData.forEach(element => {
      if (element.quanid === data.quanid) {
        element = data
      }
    });
  },
  addQuanData: (state, data) => {
    state.quanData = data.concat(state.quanData);
    state.quanCount += data.length;
  },
  deleteQuanData: (state, data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      state.quanData = state.quanData.filter(item => item.quanid != element)
    }
    state.quanCount -= data.length;
  },
  setEdit: (state, data) => { state.editrow = data },
  changeEdit: (state, data) => { state.quan = data }
}

const actions = {
  // 初始化用户列表
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
    const temp = { ...pramas }
    return quanUpdate(pramas)
      .then(res => {
        if (res.status) {
          temp.deptno = res.deptno
          commit('updatequanData', temp)
          return true
        } else {
          return false
        }
      }
      ).catch(err =>
        console.log(err)
      )
  },
  insertQuan: ({ commit }, pramas) => {
    const temp = { ...pramas }
    return quanAdd(pramas)
      .then(res => {
        if (res.status) {
          temp.quanid = res.quanid
          commit("addquan", [temp])
          return true
        } else {
          return false
        }
      }).catch(err => {
        console.log(err);
      })
  },
  delQuan: ({ commit }, quanid) => {
    return quanDel(quanid)
      .then(res => {
        if (res.status) {
          commit("deletequans", quanid)
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