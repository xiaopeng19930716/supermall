/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-10 01:45:19
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 09:34:53
 */
import { userQuerry, userUpdate, userAdd, userSearch } from "network/api/usertable"
import tree from "assets/js/common/tree"

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
    // 更新现有数组
    for (let index = 0; index < state.userData.length; index++) {
      if (Number(state.userData[index].userno) === Number(data.userno)) {
        state.userData.splice(index, 1, data)
      }
    }
    // 更新所有数组
    for (let index = 0; index < state.allUser.length; index++) {
      if (Number(state.allUser[index].userno) === Number(data.userno)) {
        state.allUser.splice(index, 1, data)
      }
    }
  },

  setUserSize: (state, size) => {
    state.userCurrent = 1
    state.userPageSize = size
  },
  setUserCurrent: (state, current) => { state.userCurrent = current },
  setEdit: (state, data) => { state.editrow = data },
  addData: (state, data) => {
    state.userData = data.concat(state.userData);
    state.allUser = data.concat(state.allUser);
  },
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
    var temp = JSON.stringify(pramas);
    temp = JSON.parse(temp);
    delete pramas.pidname;
    delete pramas.edittime;
    return userUpdate(pramas)
      .then(res => {
        if (res) {
          commit('updateData', temp)
        }

      }
      ).catch(err =>
        console.log(err)
      )
  },

  addUser: ({ commit }, pramas) => {
    var newPramas = JSON.parse(JSON.stringify(pramas));
    delete newPramas.pidname
    console.log(newPramas);
    userAdd(newPramas)
      .then(res => {
        if (res.protocol41) {
          pramas.userno = res.insertId
          console.log(pramas);
          commit("addData", pramas)
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
  currentChange: ({ commit }, current) => { commit('setUserCurrent', current);},
  changeEdit: ({ commit }, row) => { commit('changeEdit', row) }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
}