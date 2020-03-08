<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-04 22:44:49
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-08 00:21:54
 -->
<template>
  <div>
    <el-select v-model="rankSelect" size="mini" @change="handleSelectChange">
      <el-option
        v-for="item in rank"
        :key="item.rankid"
        :label="item.rankname"
        :value="item.rankname"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AttendancePicker",
  data() {
    return {
      rankSelect: "默认班次"
    };
  },
  created() {
    this.getAttenData();
  },
  computed: {
    ...mapState({
      rank: state => state.atten.attenData
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