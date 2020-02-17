import Vue from 'vue'
import './plugins/axios'
import './plugins/element.js'
import "./assets/css/base/normalize.css";
import "element-ui/lib/theme-chalk/display.css"
import "./assets/css/base/base.css"
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
