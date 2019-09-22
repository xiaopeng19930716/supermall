<template>
  <div>
    <el-dialog title="新增" :visible.sync="visible">
      <el-form :model="form">
        <el-form-item label="部门编号" :label-width="formLabelWidth">
          <el-input :value="form.info1"  disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input :value="form.info1" ></el-input>
        </el-form-item>
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-input :value="form.info1"  disabled></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" :label-width="formLabelWidth">
          <el-input :value="form.info1" ></el-input>
        </el-form-item>
        <el-form-item label="部门地址" :label-width="formLabelWidth">
          <el-input :value="form.info1"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: true,
        FormVisible: false,
        form: {
          info1:''
        },
        formLabelWidth: '100px'
      };
    }
  };
</script>