import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 路由配置url对应组件
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('views/Home.vue'),
      children: [
        {
          path: '/home',
          name: 'overview',
          component: () => import('views/table/Overview.vue')
        },
        {
          path: '/home/arrangeset',
          name: 'arrangeset',
          component: () => import('views/navbar/Arrangeset.vue')
        },
        {
          path: '/home/manager',
          name: 'manager',
          component: () => import('views/navbar/Manager.vue')
        },
        {
          path: '/home/dept',
          name: 'dept',
          component: () => import('views/table/DepTable.vue')
        },
        {
          path: '/home/user',
          name: 'user',
          component: () => import('views/table/UserInfo.vue')
        },
        {
          path: '/home/dev',
          name: 'device',
          component: () => import('views/table/DevManage.vue')
        },
        {
          path: '/home/devdata',
          name: 'device',
          component: () => import('views/table/DevData.vue')
        },
        {
          path: '/home/quantum',
          name: 'quantum',
          component: () => import('views/table/Quantum.vue')
        },
        {
          path: '/home/atten',
          name: 'atten',
          component: () => import('views/table/Atten.vue')
        },
        {
          path: '/home/schedul',
          name: 'schedul',
          component: () => import('views/table/Scheduling.vue')
        },
        {
          path: '/home/attendance',
          name: 'attendance',
          component: () => import('views/table/Attendance.vue')
        },
        {
          path: '/home/report',
          name: 'report',
          component: () => import('views/table/ReportForm.vue')
        }
      ]
    },
    // {
    //   path: '/devlog',
    //   name: 'devlog',
    //   component: () => import('views/table/DeviceLog.vue')
    // },
    // {
    //   path: '/userlog',
    //   name: 'userlog',
    //   component: () => import('./views/table/UserLog.vue')
    // },
    // {
  ]
})
