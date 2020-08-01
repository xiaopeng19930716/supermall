/*
 * @Descripttion: 入口文件
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-31 17:34:25
 */
import "./assets/css/base/normalize.css";
import "element-ui/lib/theme-chalk/display.css"
import "./assets/css/base/base.styl"
import './assets/css/base/customer.styl'
import Vue from 'vue';
import router from './router/router'
import store from './store/store'
import echarts from 'echarts'
import plugins from './utils/plugins';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(plugins)
Vue.prototype.$axios=axios
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