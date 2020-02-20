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
  alldept: [],
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
  // 获取所有部门名称数组
  getDeptName: state => {
    let deptname = [];
    const all = state.alldept;
    for (const item of all) {
      deptname.push(item.deptname)
    }
    return deptname
  },
  // 获取所有部门编号数组
  getDeptNo: state => {
    let deptno = [];
    const all = state.alldept;
    for (const item of all) {
      deptno.push(item.deptno)
    }
    return deptno
  },
}

const mutations = {
  setAllDept: (state, data) => {
    state.alldept = data;
  },
  setData: (state, data) => {
    state.data = data;
  },
  updateData: (state, data) => {
    // 更新现有数组
    for (let index = 0; index < state.data.length; index++) {
      if (Number(state.data[index].deptno) === Number(data.deptno)) {
        state.data.splice(index, 1, data)
      }
    }
    // 更新所有数组
    for (let index = 0; index < state.alldept.length; index++) {
      if (Number(state.alldept[index].deptno) === Number(data.deptno)) {
        state.alldept.splice(index, 1, data)
      }
    }
  },
  setSize: (state, size) => {
    state.current = 1
    state.size = size
  },

  setCurrent: (state, current) => { state.current = current },
  setEdit: (state, data) => { state.editrow = data },
  addData: (state, data) => {
    state.data = data.concat(state.data);
    state.alldept = data.concat(state.alldept);
  },
  changeEdit: (state, data) => { state.dept = data }
}

const actions = {
  setData: ({ commit }, data) => { commit("setData", data) },
  getAllDept: ({ commit }, pramas) => {
    deptQuerry(pramas)
      .then(res => {
        // 将初始状态的值存入
        if (!pramas) {
          commit("setAllDept", res)
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
    // 获取父部门pid 去掉父部门名称
    const all = state.alldept;
    const length = all.length;
    for (let index = 0; index < length; index++) {
      if (pramas.pidname === all[index].deptname) {
        pramas.pid = all[index].deptno;
      }
    }
    var newPramas = JSON.parse(JSON.stringify(pramas));
    delete newPramas.pidname
    console.log(newPramas);
    deptAdd(newPramas)
      .then(res => {
        if (res.protocol41) {
          pramas.deptno = res.insertId
          console.log(pramas);
          commit("addData", pramas)
        }
      }).catch(err => {
        console.log(err);
      })
  },
  fileInDept: ({ commit }, payload) => {
    const array = state.alldept
    const length = array.length
    // 增加pid
    for (const value of payload) {
      for (let index = 0; index < length; index++) {
        const element = array[index];
        if (value.pidname === element.deptname) {
          value.pid = element.deptno
        }
      }
    }
    let pramas = JSON.parse(JSON.stringify(payload));
    // 删除pidname传送至后台
    pramas.forEach(element => {
      delete element.pidname;
    });
    return deptAdd(pramas)
      .then(res => {
        if (res.serverStatus) {
          const start = res.insertId;
          for (let index = 0; index < payload.length; index++) {
            payload[index].deptno = start + index;
          }
          console.log(payload);
          commit("addData", payload);
          return true
        } else {
          console.log(res);
          return false
        }
      })
      .catch(err => console.log(err))
  },
  sizeChange: ({ commit }, size) => { commit('setSize', size) },
  currentChange: ({ commit }, current) => { commit('setCurrent', current) },
  changeEdit: ({ commit }, row) => { commit('changeEdit', row) }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}