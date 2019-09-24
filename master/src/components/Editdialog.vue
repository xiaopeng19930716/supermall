<template>
  <div>
    <el-dialog :visible.sync="visible">
        <el-form :model="form" :span="20">
          <el-form-item label="部门编号" :label-width="formLabelWidth">
            <el-input :value="form.info1" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门名称" :label-width="formLabelWidth">
            <el-input :value="form.info1"></el-input>
          </el-form-item>
          <el-form-item label="上级部门" :label-width="formLabelWidth">
            <el-input :value="form.info1" disabled></el-input>
          </el-form-item>
          <el-form-item label="部门负责人" :label-width="formLabelWidth">
            <el-input :value="form.info1"></el-input>
          </el-form-item>
          <el-form-item label="部门地址" :label-width="formLabelWidth">
            <el-input :value="form.info1"></el-input>
          </el-form-item>
        </el-form>
     
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="makesure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      FormVisible: false,
      form: {
        info1: "",
        info2: "",
        info3: "",
        info4: "",
        info5: ""
      },
      formLabelWidth: "6rem"
    };
  },
  methods:{
    cancel(){},
    makesure(){}
  }
};
</script>

<style lang="css">
</style>