<template>
  <!-- 编辑和增加基本配置 -->
  <el-dialog
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :width="dialog.width"
    @close="restForm"
    @open="setDialog"
  >
    <el-form
      :model="formData"
      ref="form"
      label-width="80px"
      size="mini"
      :rules="rules"
      class="flex"
    >
      <el-form-item label="*班次名称" prop="rankname">
        <el-input v-model="formData.rankname" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="*归属单位">
        <el-select v-model="formData.deptname" placeholder="请选择">
          <el-option
            v-for="item in dept"
            :key="item.deptno"
            :label="item.deptname"
            :value="item.deptname"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="*日期范围">
        <el-date-picker
          v-model="formData.rank"
          type="daterange"
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="*周期单位">
        <el-select v-model="formData.cycleunit" placeholder="请选择周期单位">
          <el-option v-for="item in cycle" :key="item.key" :label="item.label" :value="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="周期数目">
        <el-input-number v-model="formData.cycle" placeholder></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="submitForm">提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AttenAdd",
  props: {
    dialog: {
      title: String,
      width: String,
      visible: Boolean
    },
    form: Object
  },
  data() {
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
    return {
      formData: {
        rank: []
      },
      cycle: [
        { label: "周", key: 7 },
        { label: "月", key: 31 }
      ],
      rules: {
        rankname: [{ validator: validateName, trigger: "blur" }]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "下三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      dept: state => state.dept.alldept
    })
  },
  created() {
    this.getAllDept();
  },
  methods: {
    ...mapActions(["getAllDept"]),
    setDialog() {
      this.formData = { ...this.form };
    },
    restForm() {
      this.$refs.form.resetFields();
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid && this.formData.rank.length === 2) {
          this.formData.rankstart = this.formData.rank[0];
          this.formData.rankend = this.formData.rank[1];
          delete this.formData.rank;
          this.$emit("onSubmit", this.formData);
        } else {
          this.$notify({
            title: "提示",
            message: "带星号为必填信息"
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.el-input, .el-select, .el-input-number {
  background: yellow;
  width: 350px;
}
</style>