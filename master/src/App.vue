<template>
  <div id="app">
    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Login } from "views/index";
export default {
  name: "app",
  components: {
    Login
  }
};
</script>

<style lang="stylus">
.bounce-enter-active {
  animation: bounce-in 0.6s;
}

.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>