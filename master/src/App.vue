<template>
  <div id="app">
    <el-row :span="24">
      <Navbar></Navbar>
      <el-col :lg="5" :xl="4" class="hidden-md-and-down" style="height:100vh;background:#2f4554">
        <Aside></Aside>
      </el-col>

      <el-col :md="24" :lg="19" :xl="20" style="height:100vh;background:#e9e9e9;padding:10px">
        <Breadcrumb></Breadcrumb>
        <transition name="bounce">
          <keep-alive>
          <router-view></router-view>
          </keep-alive>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Navbar, Aside } from "views/index";
import { Breadcrumb } from "components/index.js";
import "./assets/css/base/normalize.css";
import "element-ui/lib/theme-chalk/display.css";
import "./assets/css/base/base.css";
export default {
  name: "app",
  components: {
    Navbar,
    Aside,
    Breadcrumb
  }
};
</script>
<style lang="css">
.bounce-enter-active {
  animation: bounce-in 0.6s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);opacity: 0;
  }
  100% {
    transform: scale(1);opacity: 1;
  }
}
</style>