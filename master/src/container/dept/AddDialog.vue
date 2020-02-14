<template>
  <!-- 部门页面的增加 -->
  <el-dialog
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :width="dialog.width"
    @close="resetForm('dept')"
  >
    <el-form :model="dept" :rules="rules" ref="dept" size="small" label-width="80px">
      <el-form-item label="部门编号" prop="deptno">
        <el-input v-model="getMaxNo" disabled></el-input>
      </el-form-item>

      <el-form-item label="部门名称" prop="deptname">
        <el-input v-model="dept.deptname" maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="上级部门">
        <el-select v-model="dept.pid">
          <el-option v-for="item in parents" :key="item.key" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="负责人">
        <el-input v-model="dept.deptow" maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="部门电话">
        <el-input v-model="dept.phone" maxlength="20"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="primary" @click="resetForm('dept')">重置</el-button>
      <el-button type="primary" @click="submitForm('dept')">提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "adddialog",
  props: {
    dialog: {
      title: String,
      width: String,
      visible: Boolean
    },
    parents: Array
  },
  computed: {
    ...mapGetters(["getMaxNo", "getDeptName"])
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("部门名称必须填写"));
      } else if (this.getDeptName.indexOf(value) !== -1) {
        callback(new Error("部门名称重复"));
      } else {
        callback();
      }
    };
    return {
      dept: {
        deptno: 2,
        deptname: "",
        pid: 0,
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
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>