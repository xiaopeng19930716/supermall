/*
 * @Descripttion:插件
 * @version:
 * @Author: 肖鹏
 * @Date: 2020-06-14 15:40:51
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-06-24 21:52:01
 */
import PaginationTable from 'components/Table/PaginationTable.vue'

function plugins (Vue) {
  Vue.component('app-table', "PaginationTable")
}

export default plugins