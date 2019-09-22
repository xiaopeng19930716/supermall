<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible">
      <Editslot></Editslot>
      <slot name="0"></slot>
      <slot name="1"></slot>
      <slot name="2"></slot>
      <slot name="3"></slot>
      <slot name="4"></slot>
      <slot name="5"></slot>
    </el-dialog>
  </div>
</template>

<script>
import Editslot from './slot/Editslot'
export default {
  components:{
    Editslot
  },
  data() {
    return {
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      title: "编辑",
      visible: true,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  }
};
</script>