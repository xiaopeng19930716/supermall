<template>
  <!-- 编辑和增加基本配置 -->
  <el-dialog
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :width="dialog.width"
    @closed="resetForm"
  >
    <el-form
      :model="formData"
      ref="form"
      label-width="80px"
      size="mini"
      :rules="rules"
      class="flex"
    >
      <el-form-item
        label="*班次名称"
        prop="rankname"
      >
        <el-input
          v-model="formData.rankname"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="开始日期"
        prop="rankstart"
      >
        <el-date-picker
          v-model="formData.rankstart"
          type="date"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        label="*周期单位"
        prop="cycleunit"
      >
        <el-select
          v-model="formData.cycleunit"
          placeholder="请选择周期单位"
        >
          <el-option
            v-for="item in cycle"
            :key="item.key"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="周期数目">
        <el-input-number v-model="formData.cycle"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button
        type="primary"
        @click="submitForm"
      >提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "BaseConfigDialog",
  props: {
    dialog: {
      title: String,
      width: String,
      visible: Boolean
    },
    form: Object
  },
  data () {
    var validateName = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/g;
      if (!value) {
        callback(new Error("请填写名称"));
      } else if (!reg.test(value)) {
        callback(new Error("名称只能由中文英文和数字组成"));
      } else {
        callback();
      }
    };
    var validateCycleunit = (rule, value, callback) => {
      const cycleUnit = this.formData.cycleunit;
      // 判断是是编辑还是新增
      if (
        this.form &&
        this.form.rankdays.toString() &&
        this.form.cycleunit !== cycleUnit
      ) {
        // 编辑信息时
        callback(new Error("更改周期单位前请先清除原日期选择"));
      } else {
        // 新增信息时
        callback();
      }
    };
    return {
      formData: {
        rankname: "",
        rank: [],
        rankstart: "",
        cycleunit: "周",
        cycle: 0
      },
      cycle: [
        { label: "周", key: 7 },
        { label: "月", key: 31 }
      ],
      rules: {
        rankstart: [
          { required: true, message: "起始日期必须选择", trigger: "blur" }
        ],
        rankname: [{ validator: validateName, trigger: "blur" }],
        cycleunit: [{ validator: validateCycleunit, trigger: "change" }]
      }
    };
  },
  watch: {
    form: function configBase (newVal) {
      this.formData = { ...newVal };
    }
  },
  methods: {
    resetForm () {
      this.formData = {
        rankname: "",
        rankstart: "",
        cycleunit: "周",
        deptname: "总公司",
        cycle: 0
      };
      this.$refs.form.resetFields();
    },
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("onSubmit", this.formData);
        } else {
          this.$notify({
            title: "提示",
            message: "验证未通过 带*号的是必填项"
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.el-input,
.el-select,
.el-input-number {
  width: 350px;
}
</style>