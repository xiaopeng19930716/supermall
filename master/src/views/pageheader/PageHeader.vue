<!--
 * @Descripttion: 顶部导航栏
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-25 11:35:45
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-21 21:58:22
 -->
<template>
  <div class="pageheader">
    <div>
      <i
        :class="item.class"
        v-for="(item, index) in icons"
        :key="index"
        @click="doToolEvent(index)"
      ></i>
    </div>

    <div>
      <el-popover placement="bottom" title="消息" width="150" trigger="hover">
        <i class="el-icon-bell" slot="reference"></i>
        <slot></slot>
      </el-popover>
      <PlatForm></PlatForm>
      <SysUser></SysUser>
      <i class="el-icon-close" @click="exit"></i>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
import PlatForm from "container/Sysinfo/PlatForm";
import SysUser from "container/sysuser/SysUer";
export default {
  name: "PageHeader",
  components: { PlatForm, SysUser },
  data() {
    return {
      isFullScreen: false,
      icons: [
        {
          class: "el-icon-monitor"
        },
        {
          class: "el-icon-full-screen"
        }
      ]
    };
  },
  created() {
    // 获得当前用户;
  },
  methods: {
    doToolEvent(index) {
      switch (index) {
        case 0:
          break;
        case 1:
          this.setFullScreen();
          break;
        case 2:
          break;
        default:
          break;
      }
    },

    refresh() {},
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
  height: 4rem;
  width: calc(100% -1rem);
  background-color: #f5f7fa;
  border-bottom: 0.1rem solid #c3c3c3;
  display: flex;
  font-size: 2rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  i {
    margin: 0.4rem;
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    font-size: 2rem;
    line-height: 2.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
  }

  div {
    display: flex;
    align-items: center;

    &>* {
      cursor: pointer;
    }
  }
}

i:hover {
  background: linear-gradient(217deg, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%);
  color: #fff;
  cursor: pointer;
  border-radius: 1.25rem;
  transform: scale(1.1);
}

span {
  margin: 0 1.2rem;
  font-size: 1.8rem;
}
</style>