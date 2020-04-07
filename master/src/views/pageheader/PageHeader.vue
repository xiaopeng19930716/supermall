<!--
 * @Descripttion: 顶部导航栏
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-25 11:35:45
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-07 02:00:25
 -->
<template>
  <div class="pageheader">
    <div>
      <i :class="item.class" v-for="(item, index) in icons" :key="index" @click="clickEvent(index)"></i>
    </div>
    <div>
      <i class="el-icon-bell"></i>
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
      ],
      isFullScreen: false
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
  height: 45px;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #c3c3c3;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
}

i {
  margin: 0 12px;
  text-align: center;
  font-size: 20px;
  line-height: 45px;
  transition: all 0.1s;
}

i:hover {
  cursor: pointer;
  transform: scale(1.1);
}

span {
  margin: 0rem 12px;
  font-size: 18px;
}
</style>