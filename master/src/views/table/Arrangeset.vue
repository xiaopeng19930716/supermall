<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-30 20:27:22
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-20 06:30:29
 -->
<template>
  <!-- 考勤设置 -->
  <div>
    <fieldset>
      <legend>基本配置</legend>
      <p>
        每周从
        <el-select v-model="arrangeSet.weekstart" size="mini" class="setinput">
          <el-option v-for="item in week" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>开始
      </p>
    </fieldset>

    <fieldset>
      <legend>考勤计算</legend>
      <p>
        <strong>一个工作日记:</strong>
        <el-input v-model="arrangeSet.aday" size="mini" class="setinput"></el-input>分钟
        <el-checkbox v-model="arrangeSet.reality" label="计算实到减去迟到早退时间"></el-checkbox>
      </p>
      <p>
        <strong>上班无签到记:</strong>
        <el-select v-model="arrangeSet.signin" size="mini" class="setinput">
          <el-option label="迟到" value="迟到"></el-option>
          <el-option label="旷工" value="旷工"></el-option>
        </el-select>
      </p>
      <p>
        <strong>下班无签退记:</strong>
        <el-select v-model="arrangeSet.signoff" size="mini" class="setinput">
          <el-option label="早退" value="早退"></el-option>
          <el-option label="旷工" value="旷工"></el-option>
        </el-select>
      </p>
      <p>
        <strong>一次迟到大于:</strong>
        <el-input v-model="arrangeSet.alate" size="mini" class="setinput"></el-input>分钟记为旷工
      </p>
      <p>
        <strong>一次早退大于:</strong>
        <el-input v-model="arrangeSet.bleave" size="mini" class="setinput"></el-input>分钟记为旷工
      </p>
      <p>
        <el-checkbox v-model="arrangeSet.overtime" label="根据签卡记录计算加班"></el-checkbox>
      </p>
    </fieldset>
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      week: [
        { value: "星期一", label: "星期一" },
        { value: "星期二", label: "星期二" },
        { value: "星期三", label: "星期三" },
        { value: "星期四", label: "星期四" },
        { value: "星期五", label: "星期五" },
        { value: "星期六", label: "星期六" },
        { value: "星期日", label: "星期日" }
      ]
    };
  },
  computed: {
    ...mapState({ arrangeSet: state => state.set.config })
  },
  created() {
    this.getConfigData();
  },
  methods: {
    ...mapMutations(["updateConfigData"]),
    ...mapActions(["getConfigData"]),
    onSubmit() {
      console.log(this.arrangeSet);
    }
  }
};
</script>
<style lang="css">
.setinput {
  width: 8rem;
}
</style>