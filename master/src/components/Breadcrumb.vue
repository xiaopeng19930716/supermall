<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-20 22:05:54
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-06 14:47:21
 -->
<template>
  <div class="breadcrumb">
    <div style="display:flex">
      <i class="el-icon-arrow-left"></i>
      <div style="display:flex">
        <router-link to="/home">
          <i class="el-icon-house"></i>
        </router-link>
        <el-button-group>
          <el-button
            v-for="item in levelList"
            :key="item.path"
            :class="[item===levelList[levelList.length-1]? 'item-active':'item']"
          >
            <router-link :to="item.path">{{item.meta.title}}</router-link>
          </el-button>
        </el-button-group>
      </div>
    </div>

    <div>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
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
    this.getBreadcrumb(null);
  },
  methods: {
    getBreadcrumb(val) {
      if (!val || val.name === "overview") {
        this.levelList = [];
      } else {
        this.levelList = this.levelList.filter(item => item.name !== val.name);
        this.levelList.push(val);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.breadcrumb {
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #DCDFE6;
  box-shadow: 0 1px 4px #DCDFE6;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

i {
  line-height: 40px;
  margin: 0 12px;
  font-size: 20px;
}

.item {
  border: 1px #4e62b8 solid;
}

.item-active {
  background: #409eff;
  border: 1px #4e62b8 solid;
}

.item i, .item-active i {
  font-size: 15px;
  margin: 0;
  line-height: 15px;
}
</style>