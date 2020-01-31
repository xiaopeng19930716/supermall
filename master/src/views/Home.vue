<template>
  <!-- 主页 -->
  <el-row :span="24">
    <Navbar></Navbar>
    <el-col :lg="4" :xl="4" class="hidden-md-and-down" style="height:100vh;background:#2f4554">
      <Sidebar></Sidebar>
    </el-col>

    <el-col :md="20" :lg="20" :xl="20" style="height:100vh;background:#e9e9e9;padding:10px">
      <Breadcrumb></Breadcrumb>
      <transition name="bounce">
        <router-view></router-view>
      </transition>
    </el-col>
  </el-row>
</template>
<script>
import Navbar from "views/navbar/Navbar";
import Sidebar from "views/sidebar/Sidebar";
import Breadcrumb from "components/Breadcrumb";
export default {
  name: "home",
  components: {
    Navbar,
    Sidebar,
    Breadcrumb
  }
};
</script>