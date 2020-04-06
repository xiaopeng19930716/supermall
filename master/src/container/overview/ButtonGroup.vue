<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-06 23:01:35
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-06 23:37:00
 -->
 <template>
  <div class="gird">
    <div>
      <el-button type="primary" v-for="(item, index) in items" :key="index" size="medium">
        <router-link :to="item.path">{{item.text}}</router-link>
      </el-button>
    </div>
    <div>
      <el-button type="primary" size="medium">
        <a
          href="https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
          style="color:white"
        >实时疫情</a>
      </el-button>
    </div>
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
        { path: "/home/user", text: "新增用户" },
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
   display: grid;
   align-items: center;
 }
</style>
