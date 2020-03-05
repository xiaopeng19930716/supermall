/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-25 13:05:34
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-05 15:44:10
 */

const state = {
  current: 1,
  pageSize: 0,
  total: 0
}
const mutations = {
  setPageSize: (state, size) => {
    state.pageSize = size
  },
  setCurrent: (state, current) => { state.current = current },
  setTotal: (state, total) => { state.total = total },
}
export default {
  namespace: true,
  state,
  mutations,
}