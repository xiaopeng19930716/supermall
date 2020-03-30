/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-27 03:45:54
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-27 04:54:38
 */
const state = {
	position: {},
	address: {
		getted:false,
		text:""
	}
}

const getters = {

}

const mutations = {
	setPositionData(state, position) {
		state.position = position
	},
	setAddressData(state, address) {
		state.address = address
	}
}

const actions = {
	// 获取当前位置
	getLocationData({
		commit
	}) {
		uni.getLocation({
			type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			success(res) {
				const positon = res
				const address ={
					getted:true,
					text:""
				}
				commit("setPositionData", positon)
				commit("setAddressData",address)
			},
			fail(err) {
				console.log(err)
			}
		});
	}
}
export default {
	// namespaced: true,
	state,
	getters,
	mutations,
	actions
}
