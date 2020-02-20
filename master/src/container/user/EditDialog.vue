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
    <el-form :model="dept" :rules="rules" ref="editdept" size="small" label-width="80px">
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
    <span slot="footer">
      <el-button class="button" type="primary" @click="cancelSubmit">取消</el-button>
      <el-button class="button" type="primary" @click="onSubmit('editdept')">确定</el-button>
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
    ...mapState({ init: state => state.dept.dept }),
    ...mapGetters(["getDeptNo", "getDeptName"])
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
      console.log(rep);
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
      dept: {
        deptname: "",
        pid: 0,
        pidname: "单位本部",
        deptow: "",
        deptphone: ""
      },
      rules: {
        deptname: [{ validator: valiName, trigger: "blur" }]
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
      this.dept = JSON.parse(JSON.stringify(this.init));
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
