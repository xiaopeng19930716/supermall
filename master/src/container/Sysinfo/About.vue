<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-19 20:12:08
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-19 22:15:34
 -->
<template>
  <el-dialog title="关于系统" :visible.sync="dialog.visible" width="30%">
    <p v-for="(item, index) in about" :key="index">
      {{item.label}}
      <strong>{{item.content}}</strong>
    </p>
  </el-dialog>
</template>

<script>
export default {
  name: "About",
  props: {
    dialog: { visible: Boolean }
  },
  data() {
    return {
      about: [
        { label: "版本信息:", content: "1.1.0" },
        { label: "使用单位:", content: "个人测试使用" },
        { label: "建议浏览器:", content: "谷歌浏览器,火狐浏览器，IE9+" },
        { label: "适合分辨率:", content: "1366*768以上" },
        { label: "数据库:", content: "MySql" }
      ]
    };
  }
};
</script>
<style lang="stylus" scoped>
p {
  color: dark;
}

strong {
  color: #5fb27b;
}
</style>
