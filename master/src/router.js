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
      path: '/dept',
      name: 'dept',
      component: () => import('./views/table/DepTable.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/table/UserInfo.vue')
    },
    {
      path: '/dev',
      name: 'dev',
      component: () => import('./views/table/Device.vue')
    },
    {
      path: '/devlog',
      name: 'devlog',
      component: () => import('./views/table/DeviceLog.vue')
    },
    {
      path: '/userlog',
      name: 'dep',
      component: () => import('./views/table/UserLog.vue')
    },
    {
      path: '/atten',
      name: 'atten',
      component: () => import('./views/table/Attendance.vue')
    },
    {
      path: '/rep',
      name: 'rep',
      component: () => import('./views/table/Report.vue')
    }
  ]
})
