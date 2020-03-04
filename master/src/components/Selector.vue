<template>
  <div>
    <el-select v-model="select" :placeholder="placeholder" @change="handleSelectChange">
      <el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "select",
  props: {
    options: Array,
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  data() {
    return {
      select: ""
    };
  },
  methods: {
    handleSelectChange(val) {
      this.$emit("selectChange", val);
    }
  }
};
</script>