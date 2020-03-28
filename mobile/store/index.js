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
		user:{}
	},
	mutations: {
		login(state, user) {
			state.user = user;
			uni.setStorageSync("user",user.userid)
			state.hasLogin = true;
		},
		logout(state) {
			state.user = {};
			uni.removeStorageSync("user")
			state.hasLogin = false;
		}
	},
	modules:modules
})

export default store
