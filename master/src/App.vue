<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import Home from "./views/Home";
export default {
  name: "app",
  components: {
    Home
  }
};
</script>

<style>
  @import "./assets/css/base/normalize.css";
</style>
