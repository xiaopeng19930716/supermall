<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-20 22:05:54
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-01 10:03:39
 -->
<template>
  <div class="navbar clearfix">
    <!-- <el-button-group>
      <el-button v-for="item in levelList" :key="item.path" type="primary" size="mini">
        <router-link :to="item.path" style="color: white;">
          {{item.meta.title}}
        </router-link>
      </el-button>
      </el-button>
    </el-button-group> -->
    <el-breadcrumb class="breadcrumb-container" separator="">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">
        <strong>{{item.meta.title}}</strong>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumb",
    data() {
      return {
        levelList: [
          {
            path: "/home",
            name: "overview",
            meta: { title: "首页" }
          }
        ]
      };
    },
    watch: {
      $route(val) {
        this.getBreadcrumb(val);
      }
    },
    created() {
      this.getBreadcrumb(null);
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
        }
      }
    }
  };
</script>