/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-19 22:06:10
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-18 20:37:55
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
          component: () => import('views/homeView/Overview.vue')
        },
        {
          path: '/home/manager',
          name: 'manager',
          meta: { title: "管理员" },
          component: () => import('views/settingManage/Manager.vue')
        },
        {
          path: '/home/dept',
          name: 'dept',
          meta: { title: "部门管理" },
          component: () => import('views/personManage/DeptInfo.vue')
        },
        {
          path: '/home/user',
          name: 'user',
          meta: { title: "用户管理" },
          component: () => import('views/personManage/UserInfo.vue')
        },
        {
          path: '/home/mobile',
          name: 'mobile',
          meta: { title: "手机考勤", },
          component: () => import('views/deviceManage/Mobile.vue')
        },
        {
          path: '/home/dev',
          name: 'device',
          meta: { title: "设备管理" },
          component: () => import('views/deviceManage/DevManage.vue')
        },
        {
          path: '/home/devreal',
          name: 'devreal',
          meta: { title: "实时记录" },
          component: () => import('views/deviceManage/DevData.vue')
        },
        {
          path: '/home/quantum',
          name: 'quantum',
          meta: { title: "时间段设置" },
          component: () => import('views/attendanceManage/Quantum.vue')
        },
        {
          path: '/home/atten',
          name: 'attendanceshift',
          meta: { title: "班次管理" },
          component: () => import('views/attendanceManage/AttendanceShift.vue')
        },
        {
          path: '/home/schedul',
          name: 'schedul',
          meta: { title: "人员排班" },
          component: () => import('views/attendanceManage/Scheduling.vue')
        },
        {
          path: '/home/arrangeset',
          name: "arrangeset",
          meta: { title: "考勤设置", needLogin: true },
          component: () => import('views/reportManage/ArrangeSet.vue')
        },
        {
          path: '/home/record',
          name: 'record',
          meta: { title: "考勤记录", needLogin: true },
          component: () => import('views/reportManage/AttendanceRecord.vue')
        },
        {
          path: '/home/report',
          name: 'report',
          meta: { title: "考勤报表", needLogin: true },
          component: () => import('views/reportManage/AttendanceReport.vue')
        },
        {
          path: '/home/devicelog',
          name: 'devicelog',
          meta: { title: "设备日志", needLogin: true },
          component: () => import('views/logManage/DeviceLog.vue')
        },
        {
          path: '/home/systemlog',
          name: 'systemlog',
          meta: { title: "系统日志", needLogin: true },
          component: () => import('views/logManage/SystemLog')
        }
      ]
    },
  ]
})
