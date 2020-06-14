<template>
  <!-- 动态生成的对话框对话框只有input-->
  <el-drawer
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    size="50%"
    @close="cancelSubmit('quantum')"
  >
    <el-form
      :model="formData"
      size="mini"
      :rules="rules"
      label-width="100px"
      class="form"
      ref="quantum"
    >
      <fieldset class="left">
        <legend>基本配置</legend>
        <el-form-item
          label="时间段名称"
          prop="quanname"
        >
          <el-input v-model="formData.quanname"></el-input>
        </el-form-item>
        <el-form-item
          label="上班时间"
          prop="quanstart"
        >
          <el-time-picker
            v-model="formData.quanstart"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="任意时间点"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>

        <el-form-item
          label="下班时间"
          prop="quanend"
        >
          <el-tooltip
            content="下班时间小于上班时间时结束时间时记为第二天"
            placement="right"
            effect="light"
          >
            <!-- content to trigger tooltip here -->
            <el-time-picker
              v-model="formData.quanend"
              :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
              placeholder="任意时间点"
              value-format="HH:mm"
            ></el-time-picker>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="允许迟到">
          <el-tooltip
            content="上班允许迟到多少分钟"
            placement="right"
            effect="light"
          >
            <el-input-number
              v-model="formData.allowlate"
              :min="0"
              :max="360"
            ></el-input-number>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="允许早退">
          <el-tooltip
            content="下班允许早退多少分钟"
            placement="right"
            effect="light"
          >
            <!-- content to trigger tooltip here -->
            <el-input-number
              v-model="formData.allowleave"
              :min="0"
              :max="360"
            ></el-input-number>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="必须签到">
          <el-radio
            v-model="formData.signin"
            label="是"
          >是</el-radio>
          <el-radio
            v-model="formData.signin"
            label="否"
          >否</el-radio>
        </el-form-item>
        <el-form-item label="上班前">
          <el-tooltip
            content="多少分钟可以签到"
            placement="right"
            effect="light"
          >
            <!-- content to trigger tooltip here -->
            <el-input-number
              v-model="formData.signinbefore"
              :min="0"
              :max="360"
            ></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="上班后">
          <el-tooltip
            content="多少分钟可以签到"
            placement="right"
            effect="light"
          >
            <!-- content to trigger tooltip here -->
            <el-input-number
              v-model="formData.signinafter"
              :min="0"
              :max="360"
            ></el-input-number>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="必须签退">
          <el-radio
            v-model="formData.signoff"
            label="是"
          >是</el-radio>
          <el-radio
            v-model="formData.signoff"
            label="否"
          >否</el-radio>
        </el-form-item>
        <el-form-item label="下班前">
          <el-tooltip
            content="多少分钟可以签退"
            placement="right"
            effect="light"
          >
            <!-- content to trigger tooltip here -->
            <el-input-number
              v-model="formData.signoffbefore"
              :min="0"
              :max="360"
            ></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="下班后">
          <el-tooltip
            content="多少分钟可以签退"
            placement="right"
            effect="light"
          >
            <!-- content to trigger tooltip here -->
            <el-input-number
              v-model="formData.signoffafter"
              :min="0"
              :max="360"
            ></el-input-number>
          </el-tooltip>
        </el-form-item>
      </fieldset>
      <fieldset class="right">
        <legend>拓展配置</legend>
        <el-form-item label="扣除休息">
          <el-radio
            v-model="formData.rest"
            label="是"
          >是</el-radio>
          <el-radio
            v-model="formData.rest"
            label="否"
          >否</el-radio>
        </el-form-item>
        <el-form-item label="休息开始">
          <el-time-picker
            v-model="formData.firststart"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="第一段休息时间开始"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="休息结束">
          <el-time-picker
            v-model="formData.firstend"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="第一段休息时间结束"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="休息开始">
          <el-time-picker
            v-model="formData.secondstart"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="第二段休息时间开始"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="休息结束">
          <el-time-picker
            v-model="formData.secondend"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="第二段休息时间结束"
            value-format="HH:mm"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="是否记加班">
          <!-- 带冒号为绑定数字不带冒号为绑定字符串后台传过来的一般都是字符串绑定字符串统一格式 -->
          <el-checkbox-group v-model="formData.overtime">
            <el-checkbox label="1">班前记加班</el-checkbox>
            <el-checkbox label="2">班后记加班</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="上班前">
          <el-tooltip
            content="多少分钟之前签到记为加班"
            placement="left"
            effect="light"
          >
            <!-- content to trigger tooltip here -->
            <el-input-number
              v-model="formData.overtimebefore"
              :min="0"
              :max="360"
            ></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="下班后">
          <el-tooltip
            content="多少分钟后签退记为加班"
            placement="left"
            effect="light"
          >
            <!-- content to trigger tooltip here -->
            <el-input-number
              v-model="formData.overtimeafter"
              :min="0"
              :max="360"
            ></el-input-number>
          </el-tooltip>
        </el-form-item>
      </fieldset>
    </el-form>
    <el-button
      type="primary"
      @click="cancelSubmit('quantum')"
    >取消</el-button>
    <el-button
      type="primary"
      @click="onSubmit('quantum')"
    >确定</el-button>
  </el-drawer>
</template>
<script>
export default {
  name: "QuantumDialog",
  props: {
    dialog: {
      title: String,
      visible: Boolean
    },
    form: Object
  },
  data () {
    var validateName = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/g;
      if (!value) {
        callback(new Error("时间段名称不可以为空"));
      } else if (!reg.test(value)) {
        callback(new Error("名称只能包含数字英文和中文"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        quanname: "",
        quanstart: "",
        quanend: "",
        allowlate: 0,
        allowleave: 0,
        rest: "否",
        firststart: "11:30:00",
        firstend: "12:30:00",
        secondstart: "17:30:00",
        secondend: "18:30:00",
        overtime: ["1", "2"],
        overtimeafter: 60,
        overtimebefore: 60,
        signin: "是",
        signinafter: 150,
        signinbefore: 150,
        signoff: "是",
        signoffafter: 150,
        signoffbefore: 150
      },
      rules: {
        quanname: [{ validator: validateName, trigger: "blur" }],
        quanstart: [
          { required: true, message: "开始时间必须选择", trigger: "blur" }
        ],
        quanend: [
          { required: true, message: "结束时间必须选择", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    form: function changeConfig (newVal) {
      if (newVal.overtime.toString() === "0") {
        newVal.overtime = [];
      }
      this.formData = newVal;
    }
  },
  methods: {
    cancelSubmit (formName) {
      this.dialog.visible = false;
      this.formData = {
        quanname: "",
        quanstart: "",
        quanend: "",
        allowlate: 0,
        allowleave: 0,
        rest: "否",
        firststart: "11:30:00",
        firstend: "12:30:00",
        secondstart: "17:30:00",
        secondend: "18:30:00",
        overtime: ["1", "2"],
        overtimeafter: 60,
        overtimebefore: 60,
        signin: "是",
        signinafter: 150,
        signinbefore: 150,
        signoff: "是",
        signoffafter: 150,
        signoffbefore: 150
      };
      this.$refs[formName].resetFields();
    },
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formData.overtime.toString() == "") {
            this.formData.overtime = ["0"];
          }
          console.log(this.formData.overtime);
          this.$emit("onSubmit", this.formData);
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

.el-input-number {
  width: 220px;
}
</style>