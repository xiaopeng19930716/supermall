<template>
  <div id="app">
    <Navbar></Navbar>
    <el-row :span="24">
      <el-col :lg="5" :xl="4" class="hidden-md-and-down" style="height:100vh;background:#2f4554">
        <Aside></Aside>
      </el-col>

      <el-col :md="24" :lg="19" :xl="20" style="height:100vh;background:floralwhite;padding:10px">
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Navbar, Aside} from "views/index";
import "./assets/css/base/normalize.css";
import "element-ui/lib/theme-chalk/display.css";
import "./assets/css/base/base.css";
export default {
  name: "app",
  components: {
    Navbar,
    Aside,
  }
};
</script>

