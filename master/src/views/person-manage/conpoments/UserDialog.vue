<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-22 17:41:01
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-28 19:02:04
 -->
<template>
  <el-dialog
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    width="500px"
    @closed="cancelSubmit"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      size="mini"
      label-width="80px"
    >
      <el-form-item
        label="姓名"
        prop="name"
      >
        <el-input
          v-model="form.name"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <DeptPicker
          :defaultSelect="form.deptname"
          @handleSelectChange="selectChange"
        ></DeptPicker>
      </el-form-item>
      <el-form-item label="卡号">
        <el-input
          v-model="form.cardcode"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio
            label="男"
            border
          >男</el-radio>
          <el-radio
            label="女"
            border
          >女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input
          v-model="form.phone"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          v-model="form.email"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input
          v-model="form.identitycard"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="medium"
          type="primary"
          @click="onSubmit"
        >提交</el-button>
        <el-button
          size="medium"
          @click="cancelSubmit"
        >取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import DeptPicker from "./DeptPicker";
export default {
  name: "UserDialog",
  components: {
    DeptPicker
  },
  props: {
    dialog: {
      title: String,
      visible: Boolean
    },
    default: Object
  },
  data () {
    var validateName = (rule, value, callback) => {
      const reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
      if (value === "") {
        callback(new Error("部门名称必须填写"));
      } else if (reg.test(value)) {
        callback(new Error("部门名称必须为中文英文或者数字"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        cardcode: "",
        sex: "男",
        deptname: "总公司",
        email: "",
        phone: "",
        identitycard: "",
        rankname: "默认班次"
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }]
      }
    };
  },
  watch: {
    default: function config (newVal) {
      this.form = newVal;
    }
  },
  methods: {
    cancelSubmit () {
      this.dialog.visible = false;
      this.$refs["form"].resetFields();
    },
    selectChange (val) {
      this.form.deptname = val;
    },
    onSubmit () {
      this.$emit("onSubmit", this.form);
    }
  }
};
</script>
