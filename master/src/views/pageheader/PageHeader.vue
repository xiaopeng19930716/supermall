<!--
 * @Descripttion: 顶部导航栏
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-25 11:35:45
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-17 13:46:44
 -->
<template>
  <div class="pageheader">
    <div>
      <i :class="item.class" v-for="(item, index) in icons" :key="index" @click="clickEvent(index)"></i>
    </div>
    <div>
      <el-popover placement="bottom" title="消息" width="150" trigger="hover">
        <i class="el-icon-bell" slot="reference"></i>
        <slot></slot>
      </el-popover>
      <i class="el-icon-full-screen" @click="setFullScreen"></i>
      <el-dropdown trigger="hover">
        <span>考勤管理平台</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,key) in items" :key="key" :icon="item.icon">{{item.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="el-icon-close" @click="exit"></i>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  name: "PageHeader",
  data() {
    return {
      isFullScreen: false,
      icons: [
        {
          class: "el-icon-monitor"
        },
        {
          class: "el-icon-refresh"
        }
      ],
      items: [
        { title: "修改密码", icon: "el-icon-user" },
        { title: "关于系统", icon: "el-icon-warning-outline" },
        { title: "操作手册", icon: "el-icon-document" },
        { title: "检查更新", icon: "el-icon-coin" }
      ]
    };
  },
  methods: {
    clickEvent(index) {
      console.log(index);
    },
    exit() {
      sessionStorage.clear();
      this.$router.push("/");
    },
    setFullScreen() {
      if (!screenfull) {
        this.$message({
          message: "你的浏览器不能设置全屏",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
      this.isFullScreen = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.pageheader {
  height: 7vh;
  width: 100%;
  background-color: white;
  border-bottom: 0.1rem solid #c3c3c3;
  display: flex;
  font-size: 2rem;
  justify-content: space-between;
  align-items: center;
}

i {
  margin: 0.4rem;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  font-size: 2rem;
  line-height: 2.5rem;
  border-radius: 0.5rem;
  transition: all 0.4s;
}

i:hover {
  background: #409eff;
  cursor: pointer;
  border-radius: 1.25rem;
  transform: scale(1.1);
  box-shadow: inset 0 0 1rem green;
}

span {
  margin: 0rem 1.2rem;
  font-size: 1.8rem;
}
</style>