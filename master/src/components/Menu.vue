<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-18 21:54:00
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-18 23:07:11
 -->
<template>
  <el-menu
    default-active="0"
    background-color="#f9f9f9"
    text-color="#303030"
    active-text-color="#73aadc"
    :router="true"
    :unique-opened="true"
  >
    <el-menu-item index="0" route="/home">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-submenu v-for="(submenus, index) in menus" :index="index + 1" :key="submenus.index">
      <template slot="title">
        <i :class="submenus.icon"></i>
        <span>{{ submenus.title}}</span>
      </template>
      <el-menu-item
        v-for="(item, subIndex) in submenus.items"
        :index="(index + 1) + '-' + (subIndex + 1)"
        :key="subIndex"
        :route="item.path"
      >{{item.title}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Menu",
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  }
};
</script>

