<template>
  <!-- 动态生成的对话框对话框只有input-->
  <el-dialog
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    width="500px"
    @close="cancel"
  >
    <el-form :model="dept" :rules="rules" ref="deptform" size="mini" label-width="80px">
      <el-form-item label="部门名称" prop="deptname">
        <el-input v-model="dept.deptname" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="上级部门">
        <DeptPicker :isDisabled="isDisabled" :defaultSelect="dept.pidname" ref="deptpicker"></DeptPicker>
      </el-form-item>
      <el-form-item label="负责人">
        <el-input v-model="dept.deptow" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="部门电话">
        <el-input v-model="dept.deptphone" maxlength="20"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button class="button" type="primary" @click="cancel">取消</el-button>
      <el-button class="button" type="primary" @click="onSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import DeptPicker from "./DeptPicker";
export default {
  name: "editdialog",
  components: {
    DeptPicker
  },
  props: {
    dialog: {
      title: String,
      visible: Boolean
    },
    isDisabled: Boolean,
    form: Object
  },
  data() {
    var valiName = (rule, value, callback) => {
      const deptno = this.dept.deptno;
      const i = this.getDeptNo.findIndex(e => e == deptno);
      const array = this.getDeptName;
      let rep = false;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (index != i && element == value) {
          rep = true;
        }
      }
      const reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
      if (value === "") {
        callback(new Error("部门名称必须填写"));
      } else if (reg.test(value)) {
        callback(new Error("部门名称必须为中文英文或者数字"));
      } else if (rep) {
        callback(new Error("部门名称不能与其他部门重复"));
      } else {
        callback();
      }
    };
    return {
      dept: { pidname: "总公司" },
      rules: {
        deptname: [{ validator: valiName, trigger: "blur" }]
      }
    };
  },
  watch: {
    form: function(val) {
      this.dept = val;
    }
  },
  computed: {
    ...mapGetters(["getDeptName", "getDeptNo"])
  },
  methods: {
    cancel() {
      this.$refs["deptform"].resetFields();
      this.dialog.visible = false;
    },
    onSubmit() {
      this.$refs["deptform"].validate(valid => {
        if (valid) {
          this.dept.pidname = this.$refs["deptpicker"].deptSelect;
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
<style lang="stylus" scoped>
.el-input {
  width: 300px;
}
</style>