
const state = {
  current: 1,
  pageSize: 0,
  total: 0
}
const getters = {

}

const mutations = {
  setPageSize: (state, size) => {
    state.pageSize = size
  },
  setCurrent: (state, current) => { state.current = current },
  setTotal: (state, total) => { state.total = total },
}

const actions = {
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}