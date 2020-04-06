/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-02 23:36:20
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-06 17:19:36
 */
import axios from "axios"
import { showLoading, hideLoading } from './loading';
const baseURL = "http://localhost:3000"
const instance = axios.create({
  timeout: 10000,
  baseURL: baseURL,
})
// 请求拦截器
axios.interceptors.request.use(config => {
  showLoading();
  // Do something before request is sent
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(response => {
  // Do something before response is sent
  hideLoading();
  return response;
}, error => {
  // Do something with response error
  // hideLoading();
  return Promise.reject(error);
});
/**
 * @name:http 
 * @test: 
 * @msg: 
 * @param {Object} pramas
 * @return: data type array 
 */
export default function http(url, pramas) {
  pramas = pramas || null;
  return instance.post(url, pramas)
    .then(res => {
      if (res.status === 200) {
        return res.data
      } else {
        return res
      }
    })
    .catch(err => {
      return err
    })
}



