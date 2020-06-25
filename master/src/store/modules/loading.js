/*
 * @Descripttion: 控制表格是否加载
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-25 13:05:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-24 22:57:05
 */

const state = {
    isLoading: false
}
const mutations = {
    setLoading: (state, isLoading) => {
        state.isLoading = isLoading
    },
}
const actions = {
    setLoading({ commit }, isLoading) {
        commit('setLoading', isLoading)
    }
}
export default {
    namespace: true,
    state,
    mutations,
    actions,
}