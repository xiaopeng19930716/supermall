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
  data: []
}

const getters = {
	// 上班时间
	startTime:state=>{
		if(data.length){
			return state.data[0].quanstart
		}
	},
	// 下班时间
	endTime:state=>{
	if(data.length){
		return state.data[0].quanend	
	}
	}
}

const mutations = {
 setAttenData(state,data){
	state.data = data
 }
}

const actions = {
	getAttenData({commit},params){
		myRequest("/mobile/atteninfo",params).then(res=>{
			commit("setAttenData",res)
		})
	}
}

export default {
  state,
  getters,
  mutations,
  actions
}
