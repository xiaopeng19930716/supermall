/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-04-01 17:38:01
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-01 17:46:44
 */
import { Loading } from 'element-ui'
let loadingCount = 0
let loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: "获取数据中",
    background: rgba(0, 0, 0, 0.7)
  })
}
const endLoading = () => {
  loading.close()
}
/**
 * @name: 显示加载页面
 * @param {type} 
 * @return: 
 * @msg: 
 * @test: 
 */
export const showLoading = () => {
  if (loadingCount === 0) {
    startLoading();
  }
  loadingCount += 1;
};
/**
 * @name: 关闭加载页面
 * @param {type} 
 * @return: 
 * @msg: 
 * @test: 
 */
export const hideLoading = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    endLoading();
  }
};