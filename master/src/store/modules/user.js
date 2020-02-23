/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-10 01:45:19
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 09:34:53
 */
import { userQuerry, userUpdate, userAdd, userSearch } from "network/api/usertable"
const state = {
  // 请求到的所有表格数据
  userData: [],
  userCount: 0,
  userIdMax: 0,
  userCurrent: 1,
  userPageSize: 100,
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
          temp.deptno = res.deptno
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
    const array = state.allUser
    const length = array.length
    // 增加pid
    for (const value of payload) {
      for (let index = 0; index < length; index++) {
        const element = array[index];
        if (value.pidname === element.username) {
          value.pid = element.userno
        }
      }
    }
    let pramas = JSON.parse(JSON.stringify(payload));
    // 删除pidname传送至后台
    pramas.forEach(element => {
      delete element.pidname;
    });
    return userAdd(pramas)
      .then(res => {
        if (res.serverStatus) {
          const start = res.insertId;
          for (let index = 0; index < payload.length; index++) {
            payload[index].userno = start + index;
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