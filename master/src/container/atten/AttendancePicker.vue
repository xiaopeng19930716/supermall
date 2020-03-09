<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-04 22:44:49
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-08 17:44:58
 -->
<template>
  <el-select v-model="rankSelect" size="mini" @change="handleSelectChange">
    <el-option
      v-for="item in rank"
      :key="item.rankid"
      :label="item.rankname"
      :value="item.rankname"
    ></el-option>
  </el-select>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AttendancePicker",
  props: { defaultSelect: String },
  data() {
    return {
      rankSelect: "默认班次"
    };
  },
  created() {
    this.getAttenData();
  },
  watch: {
    defaultSelect: function changeDefault(params) {
      this.rankSelect = params;
    }
  },
  computed: {
    ...mapState({
      rank: state => state.atten.data
    })
  },
  methods: {
    ...mapActions(["getAttenData"]),
    handleSelectChange(val) {
      this.$emit("getByRank", val);
    }
  }
};
</script>