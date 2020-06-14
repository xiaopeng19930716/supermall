<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-06-14 09:47:19
 -->
<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="stylus">
#app {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
</style>