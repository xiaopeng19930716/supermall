<template>
  <el-drawer
    :dialog="dialog"
    :title="dialog.title"
    :visible.sync="dialog.visible"
    :size="dialog.width"
    @open="open"
  >
    <el-form
      :model="form"
      ref="form"
      label-width="80px"
      class="flex"
    >
      <fieldset class="flex-col">
        <CheckGroup
          :items="items"
          :defaultChecked="defaultChecked"
          ref="checkGroup"
        ></CheckGroup>
      </fieldset>
      <fieldset>
        <el-select
          v-model="quantumSelect"
          placeholder="请选择"
          size="mini"
          style="width:300px"
        >
          <el-option
            v-for="item in quantums"
            :key="item.quanid"
            :label="item.quanname"
            :value="item.quanid"
          >
            <span>{{ item.quanname }}</span>
            <span style="float: right">&nbsp;&nbsp;&nbsp;{{ item.quanend }}</span>
            <span style="float: right">{{ item.quanstart }}</span>
          </el-option>
        </el-select>
        <el-button
          type="primary"
          @click="restForm"
        >重置</el-button>
        <el-button
          type="primary"
          @click="submitForm"
        >提交</el-button>
      </fieldset>
    </el-form>
  </el-drawer>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { MultipleTable, CheckGroup } from "components/index";
export default {
  name: "QuantumDialog",
  components: {
    MultipleTable,
    CheckGroup
  },
  props: {
    dialog: {
      type: Object,
      required: true,
      default: () => { }
    },
    form: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      quantumSelect: 1
    };
  },
  computed: {
    ...mapState({
      quantums: state => state.quan.data
    }),
    week: function () {
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
    month: function () {
      const month = [];
      for (let index = 1; index <= 31; index++) {
        month.push("第" + index + "天");
      }
      return month;
    },
    items: function () {
      return this.form && this.form.cycleuint === "周" ? this.week : this.month;
    },
    defaultChecked: function () {
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
  methods: {
    ...mapActions(["getAllQuantum"]),
    open () {
      // 获取时间段数据
      this.getAllQuantum();
    },
    restForm () {
      // 重置时间段选项
      this.$refs["multiTable"].clearSelection();
    },
    submitForm () {
      let rankdays = [];
      let rankid = this.form.rankid;
      const array = this.items;
      const days = this.$refs.checkGroup.checkItem;
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
  width: 12rem;
}
</style>