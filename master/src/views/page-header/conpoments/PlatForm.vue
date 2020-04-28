<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-19 20:20:14
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-28 18:08:47
 -->
<template>
  <div>
    <el-dropdown trigger="hover">
      <span>考勤管理平台</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item,key) in sysInfo"
          :key="key"
          :icon="item.icon"
          @click.native="getSysInfo(key)"
        >{{item.title}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <PlatFormAbout :dialog="aboutDialog"></PlatFormAbout>
  </div>
</template>

<script>
import PlatFormAbout from "./PlatFormAbout";
export default {
  name: "",
  components: { PlatFormAbout },
  data () {
    return {
      sysInfo: [
        { title: "关于系统", icon: "el-icon-warning-outline" },
        { title: "操作手册", icon: "el-icon-document" },
        { title: "检查更新", icon: "el-icon-coin" }
      ],
      aboutDialog: {
        visible: false
      }
    };
  },
  computed: {},
  created () { },
  methods: {
    getSysInfo (index) {
      switch (index) {
        case 0:
          this.aboutDialog.visible = true;
          break;
        case 1:
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
span {
  color: dark;
  letter-spacing: 0.05rem;
  font-size: 1.6rem;
  font-weight: 600;
}
</style>
