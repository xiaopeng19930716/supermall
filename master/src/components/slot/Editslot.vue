<template slot="edit">
  <div>
    <template slot="0">
      <el-input
        :placeholder="placeholder"
        v-model="input"
        maxlength="5"
        size="mini"
        style="width:10rem;outline:blue;border:lightblue"
        disabled
      ></el-input>
    </template>

    <template slot="1">
      <el-input
        :placeholder="placeholder"
        v-model="input"
        maxlength="5"
        size="mini"
        style="width:10rem;outline:blue;border:lightblue"
      ></el-input>
    </template>

    <template slot="2">
      <el-input
        :placeholder="placeholder"
        v-model="input"
        maxlength="5"
        size="mini"
        style="width:10rem;outline:blue;border:lightblue"
        disabled
      ></el-input>
    </template>

    <template slot=3>
      <el-input
        :placeholder="placeholder"
        v-model="input"
        maxlength="5"
        size="mini"
        style="width:10rem;outline:blue;border:lightblue"
      ></el-input>
    </template>

    <template slot="4">
      <el-input
        :placeholder="placeholder"
        v-model="input"
        maxlength="5"
        size="mini"
        style="width:10rem;outline:blue;border:lightblue"
      ></el-input>
    </template>

    <template slot="5">
      <el-input
        :placeholder="placeholder"
        v-model="input"
        maxlength="5"
        size="mini"
        style="width:10rem;outline:blue;border:lightblue"
      ></el-input>
    </template>
  </div>
</template>

<script>
export default {
  name:"Editslot",
  data() {
    return {
      input:'',
      placeholder:""
    }
  },
}
</script>