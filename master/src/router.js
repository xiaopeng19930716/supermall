import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 路由配置url对应组件
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dep',
      name: 'dep',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // 懒加载访问就加载不访问不加载
      component: () => import('./views/table/DepTable.vue')
    }
  ]
})
