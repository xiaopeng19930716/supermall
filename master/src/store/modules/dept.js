/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-10 01:45:19
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 09:34:53
 */
import { deptQuerry, deptUpdate, deptAdd } from "network/api/tables"
import tree from "assets/js/common/tree"

const state = {
  // 请求到的所有表格数据
  data: [],
  current: 1,
  size: 40,
  dept: {}
}
const getters = {
  getTotal: state => state.data.length,
  getTableView: state => {
    let current = state.current;
    let size = state.size;
    let view = null
    view = state.data.slice((current - 1) * size, current * size);
    return view;
  },
  // 计算最大的部门编号加1作为新增的部门编号
  getMaxNo: state => {
    let arr = [];
    const all = JSON.parse(sessionStorage.getItem("alldept"))
    for (const item of all) {
      arr.push(parseFloat(item.deptno))
    }
    let maxno = Math.max.apply(null, arr);
    maxno = maxno + 1;
    return maxno
  },
  // 获取所有部门名称数组
  getDeptName: state => {
    let deptname = [];
    const all = JSON.parse(sessionStorage.getItem("alldept"))
    for (const item of all) {
      deptname.push(item.deptname)
    }
    return deptname
  },
}

const mutations = {
  setData: (state, data) => {
    state.data = data;
  },
  updateData: (state, data) => {
    for (let index = 0; index < state.data.length; index++) {
      if (Number(state.data[index].deptno) === Number(data.deptno)) {
        state.data.splice(index, 1, data)
      }
    }
  },
  setSize: (state, size) => {
    state.current = 1
    state.size = size
  },
  setCurrent: (state, current) => { state.current = current },
  setEdit: (state, data) => { state.editrow = data },
  addData: (state, data) => { state.data = [data].concat(state.data) },
  changeEdit: (state, newConfig) => { state.dept = newConfig }
}

const actions = {
  setData: ({ commit }, data) => { commit("setData", data) },

  getAllDept: ({ commit }, pramas) => {
    deptQuerry(pramas)
      .then(res => {
        // 将初始状态的值存入浏览器缓存
        if (!pramas) {
          let data = JSON.stringify(res)
          sessionStorage.setItem("alldept", data);
        }

        commit('setData', res)
      }
      )
      .catch(err =>
        console.log(err)
      )
  },

  updateDept: ({ commit }, pramas) => {
    var temp = JSON.stringify(pramas);
    temp = JSON.parse(temp);
    delete pramas.pidname;
    delete pramas.edittime;
    return deptUpdate(pramas)
      .then(res => {
        if (res) {
          commit('updateData', temp)
        }

      }
      ).catch(err =>
        console.log(err)
      )
  },

  addDept: ({ commit }, pramas) => {
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
  sizeChange: ({ commit }, size) => { commit('setSize', size) },

  currentChange: ({ commit }, current) => { commit('setCurrent', current) },
  changeEdit: ({ commit }, config) => { commit('changeEdit', config) }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}