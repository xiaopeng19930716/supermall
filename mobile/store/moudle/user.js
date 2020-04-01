/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-27 03:45:54
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-27 03:48:50
 */
import myRequest from '../../network/api.js'

const state = {
  data: {}
}

const getters = {
	// 上班时间
	startTime:state=>{
		if(state.data.quanstart){
			return state.data.quanstart
		}
	},
	// 下班时间
	endTime:state=>{
	if(state.data.quanend){
		return state.data.quanend	
	}
	}
}

const mutations = {
 setUserData(state,data){
	state.data = data
 }
}

const actions = {
	getUserData({commit},params){
		myRequest("/userinfo",params).then(user=>{
			commit("setUserData",user)
		})
	}
}

export default {
  state,
  getters,
  mutations,
  actions
}
