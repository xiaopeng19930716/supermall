<!--
 * @Descripttion: 侧边栏
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-20 01:56:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-22 18:50:51
 -->
<template>
  <Menu :menus="menus"></Menu>
</template>
<script>
import { Menu } from "components/index";
export default {
  name: "Sidebar",
  components: {
    Menu
  },
  data() {
    return {
      menus: [
        {
          icon: "el-icon-user-solid",
          title: "人事管理",
          items: [
            { title: "部门", path: "/home/dept" },
            { title: "人员", path: "/home/user" }
          ]
        },
        {
          icon: "el-icon-menu",
          title: "设备管理",
          items: [
            { title: "手机考勤", path: "/home/mobile" },
            { title: "设备信息", path: "/home/dev" },
            { title: "实时数据", path: "/home/devreal" }
          ]
        },
        {
          icon: "el-icon-s-data",
          title: "排班管理",
          items: [
            { title: "时间段管理", path: "/home/quantum" },
            { title: "班次管理", path: "/home/atten" },
            { title: "人员排班", path: "/home/schedul" }
          ]
        },
        {
          icon: "el-icon-s-data",
          title: "统计报表",
          items: [
            { title: "考勤设置", path: "/home/arrangeset" },
            { title: "考勤记录", path: "/home/record" },
            { title: "考勤报表", path: "/home/report" }
          ]
        },
        {
          icon: "el-icon-s-claim",
          title: "日志管理",
          items: [
            { title: "系统日志", path: "/home/systemlog" },
            { title: "设备日志", path: "/home/devicelog" }
          ]
        },
        {
          icon: "el-icon-s-tools",
          title: "系统",
          items: [{ title: "管理员", path: "/home/manager" }]
        }
      ]
    };
  }
};
</script>
<style lang="stylus" scoped></style>