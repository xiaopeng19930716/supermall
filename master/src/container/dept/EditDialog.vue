<template>
  <!-- 动态生成的对话框对话框只有input-->
  <el-dialog
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :width="dialog.width"
    @close="resetForm"
    @open="configForm"
  >
    <el-form label-width="80px" size="small" :rules="rules">
      <el-form :model="dept" ref="deptedit" size="small" label-width="80px">
        <el-form-item label="部门编号">
          <el-input v-model="dept.deptno" disabled></el-input>
        </el-form-item>

        <el-form-item label="部门名称" prop="deptname">
          <el-input v-model="dept.deptname" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item label="上级部门">
          <el-input v-model="dept.pidname" disabled></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="dept.deptow" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item label="部门电话">
          <el-input v-model="dept.deptphone" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
    </el-form>
    <span slot="footer">
      <el-button class="button" type="primary" @click="cancelSubmit">取消</el-button>
      <el-button class="button" type="primary" @click="onSubmit('deptedit')">确定</el-button>
    </span>
  </el-dialog>
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
    }
  },
  computed: {
    ...mapState({ config: state => state.dept.dept }),
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
    resetForm() {
      this.dept = {
        deptname: "",
        pid: 0,
        pidname: "单位本部",
        deptow: "",
        deptphone: ""
      };
    },
    configForm() {
      this.dept = JSON.stringify(this.config);
      this.dept = JSON.parse(this.dept);
    },
    cancelSubmit() {
      this.dialog.visible = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("onSubmit", this.dept);
        } else {
          this.$message({
            message: "表单验证未通过",
            type: "info"
          });
          return false;
        }
      });
    }
  }
};
</script>
