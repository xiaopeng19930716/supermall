<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-20 22:05:54
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-16 20:54:16
 -->
<template>
  <el-tabs v-model="activeTab" type="border-card" @tab-remove="tabRemove">
    <el-tab-pane v-for="item in levelList" :key="item.meta.title" :name="item.meta.title">
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
      } else {
        this.levelList = this.levelList.filter(item => item.name !== val.name);
        this.levelList.push(val);
        this.activeTab = val.meta.title;
      }
    },
    tabRemove() {
      this.levelList.pop();
      this.$router.push(this.levelList[this.levelList.length - 1]);
    }
  }
};
</script>
<style lang="stylus">
.el-tabs__content {
  display: none;
}
</style>