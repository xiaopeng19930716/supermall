/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-10 01:45:19
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 09:34:53
 */
import { userQuerry, userUpdate, userAdd, userSearch, userDel } from "network/api/usertable"
const state = {
  // 请求到的所有表格数据
  userData: [],
  userIdMax: 0,
  deptInfo: []
}
const getters = {

}

const mutations = {
  setUserData: (state, user) => {
    state.userData = user.data;
    state.userIdMax = user.maxID;
    state.deptInfo = user.deptInfo;
  },
  updateUserData: (state, data) => {
    state.userData.forEach(element => {
      if (element.userid === data.userid) {
        element = data
      }
    });
  },
  insertUser: (state, data) => {
    state.userData = data.concat(state.userData);
  },
  deleteUsers: (state, data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      state.userData = state.userData.filter(item => item.userid != element)
    }
  },
}

const actions = {
  // 初始化用户列表
  getUserData: ({ commit, rootState }) => {
    const pramas = {
      current: rootState.pagi.current,
      pageSize: rootState.pagi.pageSize,
    }
    userQuerry(pramas)
      .then(res => {
        if (res.status) {
          commit("setTotal", res.count)
          commit('setUserData', res)
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
          res.data.forEach(element => {
            element.deptname = pramas.deptName
          })
          commit("setTotal", res.count)
          commit('setUserData', res)
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
          commit('updateUserData', temp)
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
  getters,
  mutations,
  actions,
}