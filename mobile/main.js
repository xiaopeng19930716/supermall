import Vue from 'vue'
import App from './App'
import store from './store'
import icon from 'components/m-icon/m-icon.vue'

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
// 全局注册图标
Vue.use(icon)
const app = new Vue({
	store,
	...App
})
app.$mount()
