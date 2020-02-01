<template>
<!-- 考勤设置 -->
  <div>
    <fieldset>
      <legend>基本配置</legend>
      <p>
        每周从
        <el-select v-model="week" size="mini" class="setinput">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>开始
      </p>
      <p>
        班次时段跨两日时
        <el-radio v-model="radio" label="记入第一日"></el-radio>
        <el-radio v-model="radio" label="记入第二日"></el-radio>最长的班次时段不超过
        <el-input v-model="max" size="mini" class="setinput"></el-input>分钟
      </p>
      <p>
        有效考勤记录时间间隔不小于
        <el-input v-model="during" size="mini" class="setinput"></el-input>分钟
        最长的班次时段不超过
        <el-input v-model="min" size="mini" class="setinput"></el-input>分钟
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
        <el-select v-model="on" size="mini" class="setinput">
          <el-option label="迟到" value="late"></el-option>
          <el-option label="旷工" value="absent"></el-option>
        </el-select>
      </p>
      <p>
        <strong>下班无签退记:</strong>
        <el-select v-model="off" size="mini" class="setinput">
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
    <fieldset>
      <legend>计算项目</legend>
      <el-tabs v-model="item" tab-position="top">
        <el-tab-pane v-for="item in items"
          :key="item.key"
          :label = "item.label"
          :name="item.id">
        </el-tab-pane>
      </el-tabs>
      
    </fieldset>
  </div>
</template>
<script>
export default {
  data() {
    return {
      week: "",
      item:"",
      on:"",
      off:"",
      radio: true,
      max: 1420,
      during: 5,
      min: 120,
      day: 480,
      reality: true,
      alate: 150,
      bleave: 60,
      overtime: false,
      options: [
        { value: "mon", label: "星期一" },
        { value: "tue", label: "星期二" },
        { value: "wed", label: "星期三" },
        { value: "thur", label: "星期四" },
        { value: "fri", label: "星期五" },
        { value: "sat", label: "星期六" },
        { value: "sun", label: "星期日" }
      ],
      items:[
        {id:0,key:"应到",label:"应到/实到"},
        {id:1,key:"应到",label:"应到/实到"},
        {id:2,key:"应到",label:"应到/实到"},
        {id:3,key:"应到",label:"应到/实到"},
        {id:4,key:"应到",label:"应到/实到"},
        {id:5,key:"应到",label:"应到/实到"},
        {id:6,key:"应到",label:"应到/实到"},
        {id:7,key:"应到",label:"应到/实到"},
      ]
    };
  }
};
</script>
<style lang="css">
.setinput{
  width: 8rem;
}
</style>