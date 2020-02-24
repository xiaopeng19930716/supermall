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
  userCount: 0,
  userIdMax: 0,
  userCurrent: 1,
  userPageSize: 50,
  deptInfo: []
}
const getters = {

}

const mutations = {
  setUserData: (state, user) => {
    state.userData = user.data;
    state.userCount = user.count;
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
  addUser: (state, data) => {
    state.userData = data.concat(state.userData);
    state.userCount += data.length;
  },
  deleteUsers: (state, data) => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      state.userData = state.userData.filter(item => item.userid != element)
    }
    state.userCount -= data.length;
  },
  setUserSize: (state, size) => {
    state.userCurrent = 1
    state.userPageSize = size
  },
  setUserCurrent: (state, current) => { state.userCurrent = current },
  setEdit: (state, data) => { state.editrow = data },
  changeEdit: (state, data) => { state.user = data }
}

const actions = {
  // 初始化用户列表
  getUserData: ({ commit }) => {
    const pramas = {
      current: state.userCurrent,
      pageSize: state.userPageSize,
    }
    userQuerry(pramas)
      .then(res => {
        if (res.status) {
          commit('setUserData', res)
        }
      }
      )
      .catch(err =>
        console.log(err)
      )
  },
  querryByDept: ({ commit }, payload) => {
    const pramas = {
      current: state.userCurrent,
      pageSize: state.userPageSize,
      deptName: payload.deptName,
      nameOrNo: payload.nameOrNo
    }
    userSearch(pramas)
      .then(res => {
        if (res.status) {
          res.data.forEach(element => {
            element.deptname = pramas.deptName
          })
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
  addUser: ({ commit }, pramas) => {
    const temp = { ...pramas }
    return userAdd(pramas)
      .then(res => {
        if (res.status) {
          temp.userid = res.userid
          commit("addUser", [temp])
          return true
        } else {
          return false
        }
      }).catch(err => {
        console.log(err);
      })
  },
  fileInUser: ({ commit }, payload) => {
    console.log(payload);
    return userAdd(payload)
      .then(res => {
        if (res.status) {
          let array = payload
          for (let index = 0; index < array.length; index++) {
            array[index].userid = res.start + index;
          }
          commit("addUser", array);
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
          commit("deleteUsers", userid)
          return true
        } else {
          return false
        }
      })
      .catch(err => err)
  },
  sizeChange: ({ commit }, size) => { commit('setUserSize', size) },
  currentChange: ({ commit }, current) => { commit('setUserCurrent', current); },
  changeEdit: ({ commit }, row) => { commit('changeEdit', row) }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}