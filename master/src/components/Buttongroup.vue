<template>
  <el-button-group>
    <el-button :type="type" :size="size" icon="el-icon-edit" @click="edit">编辑</el-button>
    <!-- <slot></slot> -->
    <el-button :type="type" :size="size" icon="el-icon-document" @click="leadin">导入</el-button>
    <el-button :type="type" :size="size" icon="el-icon-document" @click="leadout">导出</el-button>
    <el-button :type="type" :size="size" icon="el-icon-plus" @click="add">新增</el-button>
    <el-button :type="type" :size="size" icon="el-icon-delete" @click="remove">删除</el-button>
  </el-button-group>
</template>
<script>

export default {
 data() {
   return {
     type:"primary",
     size:"mini",
   }
 },
 methods:{
   edit(){

   },
   leadin(){},
   leadout(){},
   add(){},
   remove(){}
 }
}
</script>