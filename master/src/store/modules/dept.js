/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-10 01:45:19
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 09:34:53
 */
import { deptQuerry, deptUpdate, deptAdd } from "network/api/tables"
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
  // 计算最大的部门编号加1作为新增的部门编号
  getMaxNo: state => {
    let arr = [];
    for (const item of state.data) {
      arr.push(parseFloat(item.deptno))
    }
    let maxno = Math.max.apply(null, arr);
    maxno = maxno + 1;
    return maxno
  },
  // 获取所有部门名称数组
  getDeptName: state => {
    let deptname = [];
    for (const item of state.data) {
      deptname.push(item.deptname)
    }
    return deptname
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
  addData(state, data) {
    state.data = [data].concat(state.data);
  }
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
        commit('setData', res)
      }
      ).catch(err =>
        console.log(err)
      )
  },
  addDept({ commit }, pramas) {
    deptAdd(pramas)
      .then(res => {
        if (res.protocol41) {
          commit("addData", pramas)
        } else {

        }

      }).catch(err => {
        console.log(err);
      })
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