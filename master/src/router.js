/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-19 22:06:10
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-13 15:42:29
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
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
          component: () => import('views/table/ArrangeSet.vue')
        },
        {
          path: '/home/manager',
          name: 'manager',
          component: () => import('views/table/Manager.vue')
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
          path: '/home/devreal',
          name: 'devreal',
          component: () => import('views/table/DevData.vue')
        },
        {
          path: '/home/quantum',
          name: 'quantum',
          component: () => import('views/table/Quantum.vue')
        },
        {
          path: '/home/atten',
          name: 'attendanceshift',
          component: () => import('views/table/AttendanceShift.vue')
        },
        {
          path: '/home/schedul',
          name: 'schedul',
          component: () => import('views/table/Scheduling.vue')
        },
        {
          path: '/home/record',
          name: 'record',
          component: () => import('views/table/AttendanceRecord.vue')
        },
        {
          path: '/home/report',
          name: 'report',
          component: () => import('views/table/AttendanceReport.vue')
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
