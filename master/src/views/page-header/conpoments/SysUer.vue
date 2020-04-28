<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-21 21:49:22
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-24 07:36:32
 -->
<template>
  <div>
    <el-dropdown
      trigger="hover"
      v-if="imgUrl"
    >
      <span>
        <el-avatar
          shape="square"
          size="small"
          :src="imgUrl"
          fit="cover"
        ></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item,key) in userSettings"
          :key="key"
          :icon="item.icon"
          @click.native="changeUser(key)"
        >{{item.title}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <SysUserPwdUpdate :dialog=" pwdDialog" />
  </div>
</template>

<script>
import SysUserPwdUpdate from "./SysUserPwdUpdate";
export default {
  name: "SysUser",
  components: { SysUserPwdUpdate },
  data () {
    return {
      imgUrl: "",
      userSettings: [
        { title: "修改密码", icon: "el-icon-user" },
        { title: "更换头像", icon: "el-icon-user" }
      ],
      pwdDialog: {
        visible: false
      }
    };
  },
  created () {
    this.imgUrl = sessionStorage.getItem("loginUser") ? JSON.parse(sessionStorage.getItem("loginUser")).icon_url : false
  },
  methods: {
    changeUser (key) {
      switch (key) {
        case 0:
          this.pwdDialog.visible = true;
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
