<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 23:01:35
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-19 16:39:28
 -->
 <template>
  <div class="gird">
    <router-link v-for="(item, index) in items" :key="index" :to="item.path">
      <el-button type="primary" size="medium">{{item.text}}</el-button>
    </router-link>
    <a
      href="https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
      style="color:white"
    >
      <el-button type="primary" size="medium">实时疫情</el-button>
    </a>
  </div>
</template>
 
 <script>
export default {
  name: "Card-1",
  components: {},
  props: {},
  data() {
    return {
      items: [
        { path: "/home/user/adduser", text: "新增用户" },
        { path: "/home/atten", text: "员工排班" },
        { path: "/home/report", text: "考勤报表" },
        { path: "/home/arrangeset", text: "考勤设置" }
      ]
    };
  }
};
</script>
 <style lang="stylus" scoped>
 .gird {
   height: 10rem;
   display: grid;
   grid-template-columns: repeat(5, 1fr);
   grid-template-rows: 40px;
 }

 .el-button a {
   color: white;
 }
</style>
