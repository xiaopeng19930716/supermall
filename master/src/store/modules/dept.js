import { deptQuerry } from "network/api/tables"

const state = {
  data: [],
  current: 1,
  size: 10
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
  }
}
const actions = {
  getAllDept: ({ commit }) => {
    deptQuerry(res => {
      commit('setData', res);
    });
  },
  sizeChange: ({ commit }, size) => {
    commit('setSize', size)
  },
  currentChange: ({ commit }, current) => {
    commit('setCurrent',current)
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}