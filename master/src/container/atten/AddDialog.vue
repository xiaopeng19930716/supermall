<template>
  <el-drawer
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :size="dialog.width"
  >
    <el-form :model="form" ref="form" label-width="80px" size="mini" :rules="rules" class="flex">
      <fieldset>
        <el-form-item label="*班次名称" prop="rankname">
          <el-input v-model="form.rankname" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="*归属单位">
          <el-select v-model="form.deptname" placeholder="请选择">
            <el-option
              v-for="item in dept"
              :key="item.deptno"
              :label="item.deptname"
              :value="item.deptno"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*日期范围" prop="rank">
          <el-date-picker
            v-model="rank"
            type="daterange"
            :unlink-panels="true"
            range-separator="到"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="*周期单位">
          <el-select v-model="form.cycleunit" placeholder="请选择周期单位" @change="handleSelectChange">
            <el-option
              v-for="item in cycle"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <Table :header="header" :data="data">
          <template slot="start">
            <el-table-column type="selection" width="35"></el-table-column>
          </template>
        </Table>
      </fieldset>
      <fieldset>
        <el-checkbox v-model="all" label="全选" @change="selectAll"></el-checkbox>
        <el-checkbox-group v-model="dates" class="flex flex-col">
          <el-checkbox v-for="item in items" :key="item.key" :label="item.label"></el-checkbox>
        </el-checkbox-group>
      </fieldset>
    </el-form>
    <!-- <el-button type="primary" @click="submitForm">提交</el-button> -->
  </el-drawer>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Table } from "components/index";
export default {
  name: "adddialog",
  components: {
    Table
  },
  props: {
    dialog: {
      title: String,
      width: String,
      visible: Boolean
    }
  },
  computed: {
    ...mapState({
      dept: state => state.dept.alldept,
      data: state => state.quan.quanData
    }),
    // 当月天数
    days: () => {
      let date = new Date();
      let days = date.getDate();
      return days;
    }
  },
  data() {
    var validateName = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/g;
      if (!value) {
        callback(new Error("名称不可为空"));
      } else if (!reg.test(value)) {
        callback(new Error("名称只能由中文英文和数字组成"));
      } else {
        callback();
      }
    };
    return {
      form: {
        rankname: "",
        rankstart: null,
        rankend: null,
        cycleunit: "7",
        deptname: "总公司"
      },
      rank: [],
      cycle: [
        { label: "周", value: "7" },
        { label: "月", value: "31" }
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
      },
      header: [
        { id: "quanname", label: "时间段名称" },
        { id: "quanstart", label: "时间段开始" },
        { id: "quanend", label: "时间段结束" }
      ],
      dates: [],
      items: [
        { key: 1, label: "星期一" },
        { key: 2, label: "星期二" },
        { key: 3, label: "星期三" },
        { key: 4, label: "星期四" },
        { key: 5, label: "星期五" },
        { key: 6, label: "星期六" },
        { key: 7, label: "星期日" }
      ],
      all: false
    };
  },
  created() {
    this.getQuanData();
  },
  methods: {
    ...mapActions(["getQuanData"]),
    handleSelectChange(val) {
      console.log(this.days);
      // 清空选择框
      this.dates = [];
      this.all = false;
      if (val === "31") {
        var items = [];
        for (let index = 1; index <= this.days; index++) {
          items.push({ key: index, label: index + "号" });
        }
        this.items = items;
      } else {
        this.items = [
          { key: 1, label: "星期一" },
          { key: 2, label: "星期二" },
          { key: 3, label: "星期三" },
          { key: 4, label: "星期四" },
          { key: 5, label: "星期五" },
          { key: 6, label: "星期六" },
          { key: 7, label: "星期日" }
        ];
      }
    },
    selectAll() {
      const select = Number(this.form.cycleunit);
      this.dates = [];
      if (this.all === false) {
        this.dates = [];
      } else {
        if (select === 7) {
          this.dates = [
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
            "星期日"
          ];
        } else {
          for (let index = 1; index <= this.days; index++) {
            this.dates.push(index + "号");
          }
        }
      }
    },
    submitForm() {
      this.form.rankstart = this.rank[0];
      this.form.rankend = this.rank[1];
      this.$refs["form"].validate(valid => {
        if (valid && this.form.rankstart && this.form.rankend) {
          // this.$emit("onSubmit", this.form);
        } else {
          this.$message({
            message: "请填写必要信息",
            type: "info"
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.el-input, .el-select {
  background: yellow;
  width: 350px;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}
</style>