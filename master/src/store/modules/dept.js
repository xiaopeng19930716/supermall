import { deptQuerry, deptUpdate } from "network/api/tables"
import tree from "../../assets/js/common/tree"

const state = {
  // 请求到的所有表格数据
  data: [],
  current: 1,
  size: 40,
}
const getters = {
  getTotal: state => state.data.length,
  getTableView: state => state.data.slice((state.current - 1) * state.size, state.current * state.size),
  // 计算最大的部门编号加1
  getMaxNo: state => {
    let arr = [];
    for (const item of state.data) {
      arr.push(parseFloat(item.deptno))
    }
    let maxno = Math.max.apply(null, arr);
    maxno = maxno + 1;
    return maxno
  },
  // 获取所有部门数组
  getDeptName: state => {
    let deptname = [];
    for (const item of state.data) {
      deptname.push(item.deptname)
    }
    return deptname
  },
  // 将pid转换成名称
  getDeptPid: state => {

  },
  deptow: state => {

  },
  phone: state => {

  },
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