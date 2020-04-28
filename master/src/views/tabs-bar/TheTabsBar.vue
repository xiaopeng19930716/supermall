<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-20 22:05:54
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-19 23:31:47
 -->
<template>
  <el-tabs v-model="activeTab" type="border-card">
    <el-tab-pane v-for="(item,key) in levelList" :key="key" :name="item.meta.title">
      <span slot="label">
        <router-link :to="item.path">{{item.meta.title}}</router-link>
      </span>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      activeTab: "首页",
      errorClass: "item",
      activeClass: "item-active",
      levelList: []
    };
  },
  watch: {
    $route(val) {
      this.getBreadcrumb(val);
    }
  },
  computed: {
    paths() {
      let paths = this.levelList.map(e => {
        return e.path;
      });
      return paths;
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb(val) {
      if (!val || val.name === "overview") {
        this.levelList = [
          {
            path: "/home",
            name: "overview",
            meta: { title: "首页" }
          }
        ];
      } else if (this.paths.includes(val.path)) {
        this.$router.push(val);
        this.activeTab = val.meta.title;
      } else {
        this.levelList.push(val);
        this.activeTab = val.meta.title;
      }
    }
  }
};
</script>
<style lang="stylus">
.el-tabs__content {
  display: none;
}
</style>