<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-20 22:05:54
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-07 17:48:49
 -->
<template>
  <div class="container">
    <div style="display:flex">
      <i class="el-icon-arrow-left"></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/home">
          <i class="el-icon-house"></i>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path"
        :class="[item===levelList[levelList.length-1]? 'item-active':'item']"
        :to="item.path"
      >{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="right">
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
    },
    goRight() {}
  }
};
</script>
<style lang="stylus" scoped>
.container {
  position: relative;
  display: flex;
  height: 40px;
  justify-content: space-between;
  border-bottom: 1px solid #DCDFE6;
  box-shadow: 0 1px 5px #DCDFE6;
  margin-bottom: 5px;
  align-items: center;
}

.breadcrumb {
  width: 100%;
  height: 40px;
}

i {
  line-height: 24px;
  margin: 0 10px;
  font-size: 20px;
  transition: all 0.1s;
  height: 24px;
  width: 24px;
  text-align: center;
}

i:hover {
  transform: scale(1.1);
  color: white;
  cursor: pointer;
  border-radius: 12px;
  border: 1px #dedede solid;
  background: #dedede;
  box-shadow: 0 0 2px #dedede;
}

.item {
  line-height: 40px;
}

.item-active {
  line-height: 40px;
  text-shadow: 1px 1px 19px black;
  color: white;
}

.left {
  background: white;
  border-right: 1px #4e62b8 solid;
}

.right {
  z-index: 4;
  background: white;
  border-left: 1px #4e62b8 solid;
}
</style>