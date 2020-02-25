<!--
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2019-09-22 17:41:01
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 09:32:59
 -->
<template>
  <el-dialog
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :width="dialog.width"
    @close="resertForm"
  >
    <span slot="footer">
      <el-button type="primary" @click="resertForm">重置</el-button>
      <el-button type="primary" @click="submitForm('adddept')">提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "quanaddialog",
  props: {
    dialog: {
      title: String,
      width: String,
      visible: Boolean
    }
  },
  computed: {
    ...mapState({
      alldept: state => state.dept.alldept
    }),
    ...mapGetters(["getDeptName"])
  },
  data() {
    var validateName = (rule, value, callback) => {
      var reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
      if (value === "") {
        callback(new Error("部门名称必须填写"));
      } else if (this.getDeptName.indexOf(value) !== -1) {
        callback(new Error("部门名称重复"));
      } else if (reg.test(value)) {
        callback(new Error("部门名称必须为中文英文或者数字"));
      } else {
        callback();
      }
    };
    return {
      dept: {
        deptname: "",
        pid: 0,
        pidname: "单位本部",
        deptow: "",
        deptphone: ""
      },
      rules: {
        deptname: [{ validator: validateName, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 发送信息至前台接口
          this.$emit("onSubmit", this.dept);
        }
      });
    },
    resertForm() {}
  }
};
</script>