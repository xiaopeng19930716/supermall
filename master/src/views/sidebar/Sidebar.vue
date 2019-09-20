<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#434348"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router=true
          :unique-opened=true
        >
          <el-submenu index="1">
            <template slot="title">
              <span>人事</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" route="/dept">部门</el-menu-item>
              <el-menu-item index="1-2" route="/user">人员</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>设备</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" route="/dev">设备信息</el-menu-item>
              <el-menu-item index="2-2" route="">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>日志</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" route="/devlog">设备日志</el-menu-item>
              <el-menu-item index="3-2" route="">用户日志</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

           <el-submenu index="4">
            <template slot="title">
              <span>报表</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" route="/atten">考勤记录</el-menu-item>
              <el-menu-item index="4-2" route="/rep">报表统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

           <el-submenu index="5">
            <template slot="title">
              <span>系统</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" route="">系统选项</el-menu-item>
              <el-menu-item index="5-2" route="">用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="css">

</style>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>