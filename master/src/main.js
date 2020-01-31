import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import echarts from 'echarts'
import "./assets/css/base/normalize.css";
import "element-ui/lib/theme-chalk/display.css";
import "./assets/css/base/base.css";

Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
