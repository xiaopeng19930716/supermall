
import { querry } from 'network/localaxios'
const state = {
  arrangeData: [],
}

const mutations = {
  setArrangeData: (state, data) => {
    state.arrangeData = data;
  },
  updatearrangeData: (state, data) => {
    state.arrangeData.forEach(element => {
      if (element.userid === data.userid) {
        element = data
      }
    });
  },
  insertUser: (state, data) => {
    state.arrangeData = data.concat(state.arrangeData);
  },
  deleteUsers: (state, data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      state.arrangeData = state.arrangeData.filter(item => item.userid != element)
    }
  },
}

const actions = {
  // 初始化用户列表
  getArrangeByDept: ({ commit, rootState }, deptName) => {
    const pramas = {
      current: rootState.pagi.current,
      pageSize: rootState.pagi.pageSize,
      deptName: deptName
    }
    querry("/users/arrange", pramas)
      .then(res => {
        if (res.status) {
          commit("setTotal", res.count)
          commit('setArrangeData', res.data)
        }
      }
      )
      .catch(err =>
        console.log(err)
      )
  },
  querryByDept: ({ commit, rootState }, payload) => {
    const pramas = {
      current: rootState.pagi.current,
      pageSize: rootState.pagi.pageSize,
      deptName: payload.deptName,
      nameOrNo: payload.nameOrNo
    }
    userSearch(pramas)
      .then(res => {
        if (res.status) {
          commit("setTotal", res.count)
          commit('setarrangeData', res)
        }
      }
      )
      .catch(err =>
        console.log(err)
      )
  },
  updateUser: ({ commit }, pramas) => {
    const temp = { ...pramas }
    return userUpdate(pramas)
      .then(res => {
        if (res.status) {
          temp.deptno = res.deptno
          commit('updatearrangeData', temp)
          return true
        } else {
          return false
        }
      }
      ).catch(err =>
        console.log(err)
      )
  },
  insertUser: ({ commit, rootState }, pramas) => {
    const temp = { ...pramas }
    return userAdd(pramas)
      .then(res => {
        if (res.status) {
          temp.userid = res.userid
          const total = rootState.pagi.total + 1;
          commit("setTotal", total)
          commit("insertUser", [temp])
          return true
        } else {
          return false
        }
      }).catch(err => {
        console.log(err);
      })
  },
  fileInUser: ({ commit, rootState }, payload) => {
    return userAdd(payload)
      .then(res => {
        if (res.status) {
          let array = payload
          for (let index = 0; index < array.length; index++) {
            array[index].userid = res.start + index;
          }
          console.log(res);
          const total = rootState.pagi.total + res.count
          commit("setTotal", total)
          commit("insertUser", array);
          return true
        } else {
          return false
        }
      })
      .catch(err => console.log(err))
  },
  delUser: ({ commit }, userid) => {
    return userDel(userid)
      .then(res => {
        if (res.status) {
          commit("setTotal", res.count)
          commit("deleteUsers", userid)
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