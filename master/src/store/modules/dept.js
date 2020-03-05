/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-10 01:45:19
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-05 22:37:31
 */
import http from 'network/localaxios';
const state = {
  // 请求到的所有表格数据
  data: [],
}
const getters = {
  // 获取所有部门名称数组
  getDeptName: state => {
    let deptname = [];
    const all = state.data;
    for (const item of all) {
      deptname.push(item.deptname)
    }
    return deptname
  },
  getDeptNo: state => {
    const deptno = [];
    const array = state.data;
    for (const item of array) {
      deptno.push(item.deptno)
    }
    return deptno;
  }
}
const mutations = {
  setDeptData: (state, data) => {
    state.data = data;
  },
  updateDeptData: (state, data) => {
    // 更新数组
    for (let index = 0; index < state.data.length; index++) {
      if (Number(state.data[index].deptno) === Number(data.deptno)) {
        state.data.splice(index, 1, data)
      }
    }
  },
  insertDeptData: (state, data) => {
    state.data = data.concat(state.data);
  },

}

const actions = {
  getAllDept: ({ commit }) => {
    http("/dept/query")
      .then(res => {
        if (res.status) {
          commit("setTotal", res.data.length)
          commit("setDeptData", res.data)
        }
      }
      )
      .catch(err =>
        console.log(err)
      )
  },
  updateDeptData: ({ commit }, pramas) => {
    return http("/dept/update", pramas)
      .then(res => {
        if (res.status) {
          console.log(res);
          commit('updateDeptData', pramas)
          return true
        } else {
          return false
        }

      }
      ).catch(err =>
        console.log(err)
      )
  },

  insertDeptData: ({ commit, rootState }, pramas) => {
    const temp = { ...pramas }
    return http("/dept/insert", pramas)
      .then(res => {
        if (res.status) {
          temp.deptno = res.insertId
          console.log(temp);
          commit("setTotal", rootState.pagi.total + 1)
          commit("insertDeptData", [temp])
          return true
        } else {
          return false
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