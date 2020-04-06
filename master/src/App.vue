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
  #app {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-image: url("../src/assets/img/wuhan.jpg");
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