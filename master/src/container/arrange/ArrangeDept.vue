<template>
  <!-- 动态生成的对话框对话框只有input-->
  <Dialog :dialog="dialog" :form="formData" @onSubmit="onSubmit">
    <template #formitem>
      <el-form-item label="选择部门">
        <DeptPicker ref="deptpicker"></DeptPicker>
      </el-form-item>
      <el-form-item label="选择班次">
        <AttenPicker ref="rankpiceker"></AttenPicker>
      </el-form-item>
    </template>
  </Dialog>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { Dialog } from "components/index";
import { DeptPicker } from "container/dept/index";
import { AttenPicker } from "container/atten/index";
export default {
  name: "editdialog",
  components: {
    Dialog,
    DeptPicker,
    AttenPicker
  },
  props: {
    visible: Boolean,
    form: Object
  },
  data() {
    return {
      formData: {},
      dialog: {
        title: "部门排班",
        width: "30%",
        visible: this.visible
      }
    };
  },
  methods: {
    cancelSubmit(formName) {
      this.dialog.visible = false;
    },
    onSubmit(formName) {
       const deptName=this.$refs.deptpicker.deptSelect,
       const rankName=this.$refs.rankpiceker.rankSelect
      this.$emit("onSubmit",deptName,rankName);
    }
  }
};
</script>
