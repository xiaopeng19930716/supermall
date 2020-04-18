<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-18 20:51:42
 -->
<template>
  <div id="app">
    <transition name="bounce">
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

.bounce-enter-active {
  animation: bounce-in 0.6s;
}

.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>