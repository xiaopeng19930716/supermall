<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-30 20:27:22
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-13 15:53:35
 -->
<template>
  <!-- 考勤设置 -->
  <div>
    <fieldset>
      <legend>基本配置</legend>
      <p>
        每周从
        <el-select v-model="weekStart" size="mini" class="setinput">
          <el-option v-for="item in week" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>开始
      </p>
    </fieldset>

    <fieldset>
      <legend>考勤计算</legend>
      <p>
        <strong>一个工作日记:</strong>
        <el-input v-model="day" size="mini" class="setinput"></el-input>分钟
        <el-checkbox v-model="reality" label="计算实到减去迟到早退时间"></el-checkbox>
      </p>
      <p>
        <strong>上班无签到记:</strong>
        <el-select v-model="signIn" size="mini" class="setinput">
          <el-option label="迟到" value="late"></el-option>
          <el-option label="旷工" value="absent"></el-option>
        </el-select>
      </p>
      <p>
        <strong>下班无签退记:</strong>
        <el-select v-model="signOff" size="mini" class="setinput">
          <el-option label="早退" value="leave"></el-option>
          <el-option label="旷工" value="absent"></el-option>
        </el-select>
      </p>
      <p>
        <strong>一次迟到大于:</strong>
        <el-input v-model="alate" size="mini" class="setinput"></el-input>分钟记为旷工
      </p>
      <p>
        <strong>一次早退大于:</strong>
        <el-input v-model="bleave" size="mini" class="setinput"></el-input>分钟记为旷工
      </p>
      <p>
        <el-checkbox v-model="overtime" label="根据签卡记录计算加班"></el-checkbox>
      </p>
    </fieldset>
  </div>
</template>
<script>
export default {
  data() {
    return {
      weekStart: "星期日",
      signIn: "旷工",
      signOff: "旷工",
      radio: true,
      max: 1420,
      during: 5,
      min: 120,
      day: 480,
      reality: true,
      alate: 150,
      bleave: 150,
      overtime: true,
      week: [
        { value: "mon", label: "星期一" },
        { value: "tue", label: "星期二" },
        { value: "wed", label: "星期三" },
        { value: "thur", label: "星期四" },
        { value: "fri", label: "星期五" },
        { value: "sat", label: "星期六" },
        { value: "sun", label: "星期日" }
      ]
    };
  }
};
</script>
<style lang="css">
.setinput {
  width: 8rem;
}
</style>