<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-17 17:39:27
 -->
  <template>
  <!-- 主页 -->
  <el-container class="home">
    <el-aside width="200px">
      <!-- Aside content -->
      <Sidebar style="height:100vh"></Sidebar>
    </el-aside>
    <el-main class="main">
      <div>
        <PageHeader></PageHeader>
        <Tabs></Tabs>
      </div>
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
import Tabs from "./tabs/Tabs";
export default {
  name: "home",
  components: {
    Tabs,
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
    width: 100vw;
    background: white;
    display: flex;
  }

  .main {
    height: 100vh;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    transition: all 1s;
    justify-content: space-between;
  }

  .panel {
    height: 83.5vh;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    background-color: #f2f2f2;
    box-shadow: 0 0 0.5rem black;
  }
</style>