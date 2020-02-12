import { deptQuerry, deptUpdate } from "network/api/tables"
import tree from "../../assets/js/common/tree"

const state = {
  data: [],
  current: 1,
  size: 40,
}
const getters = {
  total: state => state.data.length,
  show: state => state.data.slice((state.current - 1) * state.size, state.current * state.size)
}
const mutations = {
  setData(state, data) {
    state.data = data;
  },
  setSize(state, size) {
    state.current = 1;
    state.size = size;
  },
  setCurrent(state, current) {
    state.current = current
  },

}
const actions = {
  getAllDept: ({ commit }) => {
    deptQuerry()
      .then(res => {
        commit('setData', res)
      }
      )
      .catch(err =>
        console.log(err)
      )
  },
  updateDept({ commit }, pramas) {
    return deptUpdate(pramas)
      .then(res => {
        console.log(res);
        commit('setData', res)
      }
      ).catch(err =>
        console.log(err)
      )
  },
  sizeChange: ({ commit }, size) => {
    commit('setSize', size)
  },
  currentChange: ({ commit }, current) => {
    commit('setCurrent', current)
  },
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}