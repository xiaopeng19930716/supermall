<template>
  <el-drawer
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :size="dialog.width"
    @open="open"
  >
    <el-form :model="form" ref="form" label-width="80px" class="flex">
      <fieldset>
        <Table :header="header" :data="tableData" ref="multiTable">
          <template slot="start">
            <el-table-column type="selection" width="35"></el-table-column>
          </template>
        </Table>
        <el-button type="primary" @click="restForm">重置</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </fieldset>
      <fieldset>
        <CheckGroup :items="items" :defaultChecked="defaultChecked" ref="checkGroup"></CheckGroup>
      </fieldset>
    </el-form>
  </el-drawer>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Table, CheckGroup } from "components/index";
export default {
  name: "AttenAdd",
  components: {
    Table,
    CheckGroup
  },
  props: ["dialog", "form"],
  data() {
    return {
      header: [
        { id: "quanname", label: "时间段名称", width: "120px" },
        { id: "quanstart", label: "时间段开始", width: "90px" },
        { id: "quanend", label: "时间段结束", width: "90px" }
      ]
    };
  },
  computed: {
    ...mapState({
      tableData: state => state.quan.quanData
    }),
    week: function() {
      return [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ];
    },
    month: function() {
      const month = [];
      for (let index = 1; index <= 31; index++) {
        month.push("第" + index + "天");
      }
      return month;
    },
    items: function() {
      const cycleUint = this.form.cycleunit;
      return cycleUint === 7 ? this.week : this.month;
    },
    defaultChecked: function() {
      const items = this.items;
      const array = [];
      const days = this.form.days;
      for (let index = 0; index < items.length; index++) {
        for (const iterator of days) {
          if (index + 1 === Number(iterator)) {
            array.push(items[index]);
          }
        }
      }
      return array;
    }
  },
  updated() {
    const id = this.form.quantum;
    this.toggleSelection(this.tableData, id);
  },
  methods: {
    ...mapActions(["getQuanData"]),
    toggleSelection(row, id) {
      for (const value of id) {
        row.forEach(element => {
          if (element.quanid === Number(value)) {
            this.$refs.multiTable.$children[0].toggleRowSelection(
              element,
              true
            );
          }
        });
      }
    },
    open() {
      // 获取时间段数据
      this.getQuanData();
    },
    restForm() {
      // 重置时间段选项
      this.$refs.multiTable.$children[0].clearSelection();
    },
    submitForm() {
      let rankquantum = [];
      let rankdays = [];
      let rankid = this.form.rankid;
      const array = this.items;
      const quantum = this.$refs.multiTable.$children[0].selection;
      const days = this.$refs.checkGroup.checkItem;
      quantum.forEach(element => {
        rankquantum.push(element.quanid);
      });
      for (const iterator of days) {
        for (let index = 0; index < array.length; index++) {
          if (iterator === array[index]) {
            rankdays.push(index + 1);
          }
        }
      }
      rankdays = rankdays.sort();
      this.$emit("onSubmit", { rankid, rankquantum, rankdays });
    }
  }
};
</script>
<style lang="stylus" scoped>
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}
</style>