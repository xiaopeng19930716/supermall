<template>
  <!-- 动态生成的对话框对话框只有input-->
  <el-drawer
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    size="50%"
    @close="cancelSubmit('editquan')"
  >
    <el-form
      :model="quan"
      size="mini"
      :rules="rules"
      label-width="100px"
      class="form"
      ref="editquan"
    >
      <fieldset class="left">
        <legend>基本配置</legend>
        <el-form-item label="时间段名称" prop="quanname">
          <el-input v-model="quan.quanname"></el-input>
        </el-form-item>
        <el-form-item label="上班时间" prop="quanstart">
          <el-time-picker
            v-model="quan.quanstart"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="任意时间点"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="下班时间" prop="quanend">
          <el-time-picker
            v-model="quan.quanend"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="任意时间点"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="允许迟到">
          <el-tooltip content="上班允许迟到多少分钟" placement="right" effect="light">
            <el-input-number v-model="quan.allowlate" :min="0" :max="360"></el-input-number>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="允许早退">
          <el-tooltip content="下班允许早退多少分钟" placement="right" effect="light">
            <!-- content to trigger tooltip here -->
            <el-input-number v-model="quan.allowleave" :min="0" :max="360"></el-input-number>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="必须签到">
          <el-radio v-model="quan.signin" label="1">是</el-radio>
          <el-radio v-model="quan.signin" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="上班前">
          <el-tooltip content="多少分钟可以签到" placement="right" effect="light">
            <!-- content to trigger tooltip here -->
            <el-input-number v-model="quan.signinbefore" :min="0" :max="360"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="上班后">
          <el-tooltip content="多少分钟可以签到" placement="right" effect="light">
            <!-- content to trigger tooltip here -->
            <el-input-number v-model="quan.signinafter" :min="0" :max="360"></el-input-number>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="必须签退">
          <el-radio v-model="quan.signoff" label="1">是</el-radio>
          <el-radio v-model="quan.signoff" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="下班前">
          <el-tooltip content="多少分钟可以签退" placement="right" effect="light">
            <!-- content to trigger tooltip here -->
            <el-input-number v-model="quan.signoffbefore" :min="0" :max="360"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="下班后">
          <el-tooltip content="多少分钟可以签退" placement="right" effect="light">
            <!-- content to trigger tooltip here -->
            <el-input-number v-model="quan.signoffafter" :min="0" :max="360"></el-input-number>
          </el-tooltip>
        </el-form-item>
      </fieldset>

      <fieldset class="right">
        <legend>拓展配置</legend>
        <el-form-item label="所属部门">
          <el-select v-model="quan.deptname">
            <el-option
              v-for="item in dept"
              :key="item.deptno"
              :label="item.deptname"
              :value="item.deptname"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="扣除休息">
          <el-radio v-model="quan.rest" label="1">是</el-radio>
          <el-radio v-model="quan.rest" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="休息开始">
          <el-time-picker
            v-model="quan.firststart"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="第一段休息时间开始"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="休息结束">
          <el-time-picker
            v-model="quan.firstend"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="第一段休息时间结束"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="休息开始">
          <el-time-picker
            v-model="quan.secondstart"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="第二段休息时间开始"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="休息结束">
          <el-time-picker
            v-model="quan.secondend"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="第二段休息时间结束"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="是否记加班">
          <el-checkbox-group v-model="quan.overtime">
            <el-checkbox label="1">班前记加班</el-checkbox>
            <el-checkbox label="2">班后记加班</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="上班前">
          <el-tooltip content="多少分钟之前签到记为加班" placement="left" effect="light">
            <!-- content to trigger tooltip here -->
            <el-input-number v-model="quan.overtimebefore" :min="0" :max="360"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="下班后">
          <el-tooltip content="多少分钟后签退记为加班" placement="left" effect="light">
            <!-- content to trigger tooltip here -->
            <el-input-number v-model="quan.overtimeafter" :min="0" :max="360"></el-input-number>
          </el-tooltip>
        </el-form-item>
      </fieldset>
    </el-form>
    <el-button class="button" type="primary" @click="cancelSubmit('editquan')">取消</el-button>
    <el-button class="button" type="primary" @click="onSubmit('editquan')">确定</el-button>
  </el-drawer>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "editdialog",
  props: {
    dialog: {
      title: String,
      width: String,
      visible: Boolean
    },
    quan: Object
  },
  data() {
    return {
      rules: {
        quanname: [
          { required: true, message: "时间段名称必填", trigger: "blur" }
        ],
        quanstart: [
          { required: true, message: "开始时间必须选择", trigger: "blur" }
        ],
        quanend: [
          { required: true, message: "结束时间必须选择", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getAllDept();
  },
  computed: {
    ...mapState({
      dept: state => state.dept.alldept
    })
  },
  methods: {
    ...mapActions(["getAllDept"]),
    cancelSubmit(formName) {
      this.dialog.visible = false;
      this.quan = {
        quanname: null,
        deptname: "总公司",
        quanstart: null,
        quanend: null,
        allowlate: 0,
        allowleave: 0,
        rest: "0",
        firststart: "11:30:00",
        firstend: "12:30:00",
        secondstart: "17:30:00",
        secondend: "18:30:00",
        overtime: [],
        overtimeafter: 60,
        overtimebefore: 60,
        signin: "1",
        signinafter: 150,
        signinbefore: 150,
        signoff: "1",
        signoffafter: 150,
        signoffbefore: 150
      };
      this.$refs[formName].resetFields();
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("onSubmit", this.quan);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.form {
  display: flex;
}

.left {
  width: 35%;
}

.right {
  width: 55%;
}

.el-input, .el-input-number, .el-select {
  width: 220px;
}
</style>