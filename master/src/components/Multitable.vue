<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-04-04 12:40:36
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-04 12:47:36
 -->
 <template>
  <div>
    <el-table :data="table.data" border stripe>
      <el-table-column
        v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width"
      ></el-table-column>
    </el-table>
  </div>
</template>
 
 <script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
};
</script>
 
 <style lang="stylus" scoped></style>
 