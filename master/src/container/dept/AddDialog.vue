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
    <el-form :model="dept" :rules="rules" ref="dept" size="small" label-width="80px">
      <el-form-item label="部门编号">
        <el-input v-model="getMaxNo" disabled></el-input>
      </el-form-item>

      <el-form-item label="部门名称" prop="deptname">
        <el-input v-model="dept.deptname" maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="上级部门">
        <el-select v-model="dept.pid">
          <el-option v-for="item in data" :key="item.deptno" :value="item.deptname"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="负责人">
        <el-input v-model="dept.deptow" maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="部门电话">
        <el-input v-model="dept.deptphone" maxlength="20"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="primary" @click="resertForm">重置</el-button>
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
    }
  },
  computed: {
    ...mapState({ data: state => state.dept.data }),
    ...mapGetters(["getMaxNo", "getDeptName"])
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
        deptno: 0,
        pid: "单位本部",
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
          this.dept.deptno = this.getMaxNo;
          var pid = 0;
          // 转换父部门名称为数字
          this.data.forEach(e => {
            if (e.deptname === this.dept.pid) {
              pid = Number(e.deptno);
              this.dept.pid = pid;
            }
          });
          // 发送信息至后台
          console.log(this.dept);
          this.$store
            .dispatch("addDept", this.dept)
            .then(res => {
              this.$message({
                message: "增加部门成功",
                type: "success"
              });
              this.dialog.visible = false;
            })
            .catch(err => {
              this.$message({
                message: "增加部门失败",
                type: "warning"
              });
            });
        }
      });
    },
    resertForm() {
      this.dept = {
        deptname: "",
        deptno: 0,
        pid: "单位本部",
        deptow: "",
        deptphone: ""
      };
    }
  }
};
</script>