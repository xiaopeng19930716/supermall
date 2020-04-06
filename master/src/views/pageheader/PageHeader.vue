<!--
 * @Descripttion: 顶部导航栏
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-25 11:35:45
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-06 12:26:35
 -->
<template>
  <div class="pageheader">
    <div>
      <i class="el-icon-d-arrow-left"></i>
      <i class="el-icon-refresh"></i>
    </div>

    <div>
      <i class="el-icon-monitor"></i>
      <i class="el-icon-bell"></i>
      <i class="el-icon-full-screen"></i>
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  methods: {
    exit() {
      sessionStorage.clear();
      this.$router.push("/");
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
  width: 20px;
  line-height: 45px;
  margin: 0 12px;
  text-align: center;
  font-size: 20px;
}

span:hover {
  border-bottom: 2px black solid;
}
</style>