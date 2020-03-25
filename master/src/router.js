/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-19 22:06:10
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-25 12:53:26
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
          name: "overview",
          meta: { title: "首页" },
          component: () => import('views/home/Overview.vue')
        },
        {
          path: '/home/manager',
          name: 'manager',
          meta: { title: "管理员" },
          component: () => import('views/setting/Manager.vue')
        },
        {
          path: '/home/dept',
          name: 'dept',
          meta: { title: "部门管理" },
          component: () => import('views/human/DeptInfo.vue')
        },
        {
          path: '/home/user',
          name: 'user',
          meta: { title: "用户管理" },
          component: () => import('views/human/UserInfo.vue')
        },
        {
          path: '/home/dev',
          name: 'device',
          meta: { title: "设备管理" },
          component: () => import('views/device/DevManage.vue')
        },
        {
          path: '/home/devreal',
          name: 'devreal',
          meta: { title: "实时记录" },
          component: () => import('views/device/DevData.vue')
        },
        {
          path: '/home/quantum',
          name: 'quantum',
          meta: { title: "时间段设置" },
          component: () => import('views/attendance/Quantum.vue')
        },
        {
          path: '/home/atten',
          name: 'attendanceshift',
          meta: { title: "班次管理" },
          component: () => import('views/attendance/AttendanceShift.vue')
        },
        {
          path: '/home/schedul',
          name: 'schedul',
          meta: { title: "人员排班" },
          component: () => import('views/attendance/Scheduling.vue')
        },
        {
          path: '/home/arrangeset',
          name: "arrangeset",
          meta: { title: "考勤设置" },
          component: () => import('views/report/ArrangeSet.vue')
        },
        {
          path: '/home/record',
          name: 'record',
          meta: { title: "考勤记录" },
          component: () => import('views/report/AttendanceRecord.vue')
        },
        {
          path: '/home/report',
          name: 'report',
          meta: { title: "考勤报表" },
          component: () => import('views/report/AttendanceReport.vue')
        },
        {
          path: '/home/devicelog',
          name: 'devicelog',
          meta: { title: "设备日志" },
          component: () => import('views/log/DeviceLog.vue')
        },
        {
          path: '/home/systemlog',
          name: 'systemlog',
          meta: { title: "系统日志" },
          component: () => import('views/log/SystemLog')
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
