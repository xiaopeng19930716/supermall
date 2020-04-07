<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-07 02:37:39
 -->
  <template>
  <!-- 主页 -->
  <el-container class="home">
    <el-aside width="200px">
      <!-- Aside content -->
      <Sidebar style="height:100vh"></Sidebar>
    </el-aside>
    <el-main class="main">
      <!-- Main content -->
      <PageHeader></PageHeader>
      <Breadcrumb></Breadcrumb>
      <!-- Main content -->
      <transition name="bounce">
        <router-view></router-view>
      </transition>
    </el-main>
  </el-container>
</template>
  <script>
import Sidebar from "./sidebar/Sidebar";
import PageHeader from "./pageheader/PageHeader";
import Breadcrumb from "./breadcrumb/Breadcrumb";
export default {
  name: "home",
  components: {
    Breadcrumb,
    Sidebar,
    PageHeader
  },
  data() {
    return {
      isCollapse: false
    };
  }
};
</script>
  <style lang="stylus">
  .home {
    width: 100%;
    background: white;
    display: flex;
  }

  .main {
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    transition: all 1s;
  }

  .panel {
    margin: 5px;
    padding: 2px;
    border-radius: 5px;
    background-color: #f2f2f2;
    box-shadow: 0 0 5px gray;
  }
</style>