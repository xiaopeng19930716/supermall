import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import modules from './moudle/index.js'

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		hasLogin: false,
		serverUrl:"",
		userInfo:{},
	},
	mutations: {
		setServerUrl(state,url){
			state.serverUrl = url
		},
		login(state,user) {
			state.userInfo = user
			uni.setStorageSync("user",user.userid)
			state.hasLogin = true;
		},
		logout(state) {
			uni.removeStorageSync("user")
			state.userInfo={},
			state.hasLogin = false;
		}
	},
	modules:modules
})

export default store
