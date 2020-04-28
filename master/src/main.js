/*
 * @Descripttion: 入口文件
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-28 22:15:01
 */
import Vue from 'vue'
import './plugins/axios'
import './plugins/element.js'
import "./assets/css/base/normalize.css";
import "element-ui/lib/theme-chalk/display.css"
import "./assets/css/base/base.styl"
import './assets/css/base/customer.styl'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title == undefined ? 'vueApp' : to.meta.title
  next()
})