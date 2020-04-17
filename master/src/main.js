/*
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-17 23:32:37
 */
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
