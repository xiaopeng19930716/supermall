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
    <el-form :model="quan" size="mini" label-width="100px" class="form">
      <fieldset class="left">
        <legend>基本配置</legend>
        <el-form-item label="时间段名称">
          <el-input v-model="quan.quanname"></el-input>
        </el-form-item>
        <el-form-item label="上班时间">
          <el-time-picker
            v-model="quan.quanstart"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="任意时间点"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="下班时间">
          <el-time-picker
            v-model="quan.quanend"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="任意时间点"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="允许迟到">
          <el-input v-model="quan.allowlate" maxlength="20" placeholder="分钟"></el-input>
        </el-form-item>

        <el-form-item label="允许早退">
          <el-input v-model="quan.allowleave" maxlength="20" placeholder="分钟"></el-input>
        </el-form-item>
        <el-form-item label="必须签到">
          <el-input v-model="quan.signin"></el-input>
        </el-form-item>

        <el-form-item label="必须签退" prop="quanname">
          <el-input v-model="quan.signoff" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item label="上班前">
          <el-input v-model="quan.signinbefore" placeholder="多长时间允许签到"></el-input>
        </el-form-item>
        <el-form-item label="上班后">
          <el-input v-model="quan.signinafter" maxlength="20" placeholder="多长时间允许签到"></el-input>
        </el-form-item>

        <el-form-item label="下班前">
          <el-input v-model="quan.signoffbefore" maxlength="20" placeholder="多长时间允许签退"></el-input>
        </el-form-item>
        <el-form-item label="下班后">
          <el-input v-model="quan.signoffa" maxlength="20" placeholder="多长时间允许签退"></el-input>
        </el-form-item>
      </fieldset>

      <fieldset class="right">
        <legend>拓展配置</legend>
        <el-form-item label="所属部门">
          <el-select v-model="quan.deptname">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="扣除休息">
          <el-select v-model="quan.deptname">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="休息开始">
          <el-time-picker
            v-model="quan.quanstart"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="任意时间点"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="休息结束">
          <el-time-picker
            v-model="quan.quanend"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="任意时间点"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="休息开始2">
          <el-time-picker
            v-model="quan.quanstart"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="任意时间点"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="休息结束2">
          <el-time-picker
            v-model="quan.quanend"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
            placeholder="任意时间点"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="班前">
          <el-input v-model="quan.allowlate" maxlength="20" placeholder="分钟签到记为加班"></el-input>
        </el-form-item>

        <el-form-item label="班后">
          <el-input v-model="quan.allowleave" maxlength="20" placeholder="分钟签退记为加班"></el-input>
        </el-form-item>
        <el-form-item label="弹性上班">
          <el-select v-model="quan.deptname">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="可提前" prop="quanname">
          <el-input v-model="quan.signoff" placeholder="分钟上班"></el-input>
        </el-form-item>

        <el-form-item label="可延后">
          <el-input v-model="quan.signinbefore" placeholder="分钟上班"></el-input>
        </el-form-item>
      </fieldset>
    </el-form>

    <span slot="footer">
      <el-button class="button" type="primary" @click="cancelSubmit">取消</el-button>
      <el-button class="button" type="primary" @click="onSubmit('editquan')">确定</el-button>
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
  computed: {},
  data() {
    return {
      quan: {
        afterremark: 1,
        allowlate: 1,
        allowleave: 30,
        beforeremark: 1,
        deptname: "总公司",
        quanstart: new Date(2016, 9, 10, 7, 40),
        quanend: new Date(2016, 9, 10, 18, 40),
        quanid: "001",
        quanname: "默认时间段",
        signin: 1,
        signinafter: 150,
        signinbefore: 150,
        signoff: 1,
        signoffafter: 120,
        signoffbefore: 120
      }
    };
  },
  methods: {
    resetForm() {},
    configForm() {
      this.quan = JSON.parse(JSON.stringify(this.init));
    },
    cancelSubmit() {
      this.dialog.visible = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("onSubmit", this.quan);
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
.form {
  display: flex;
}

.left {
  flex: 0 0 20%;
}

.right {
  flex: 1;
}
</style>