<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 17:43:31
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-22 19:11:37
 -->
  <template>
  <!-- 主页 -->
  <el-container class="home">
    <TheFixedChat />
    <el-aside width="200px">
      <!-- Aside content -->
      <TheSidebar style="height:100vh" />
    </el-aside>
    <el-main class="main">
      <div>
        <ThePageHeader />
        <TheTabsBar />
      </div>
      <transition name="bounce">
        <router-view></router-view>
      </transition>
    </el-main>
  </el-container>
</template>
  <script>
import TheSidebar from "./side-bar/TheSidebar";
import ThePageHeader from "./page-header/ThePageHeader";
import TheTabsBar from "./tabs-bar/TheTabsBar";
import TheFixedChat from "./fixed-chat/TheFixedChat";
export default {
  name: "home",
  components: {
    TheSidebar,
    ThePageHeader,
    TheTabsBar,
    TheFixedChat
  }
};
</script>
  <style lang="stylus" scoped>
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
    border-radius: 0.4rem;
    background-color: #f2f2f2;
    box-shadow: 0 0 0.5rem black;
  }
</style>