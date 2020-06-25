/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-02 23:36:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-24 22:53:51
 */
import axios from "axios"
import store from '../store/store';

const baseURL = "http://localhost:3000"
const instance = axios.create({
  timeout: 10000,
  baseURL: baseURL,
})
instance.interceptors.request.use(config => {
  // 拦截请求设置token
  const token = sessionStorage.getItem("token")
  if (token) {
    config.headers.Authorization = token
  }
  store.dispatch("setLoading", true)
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  // Do something before response is sent
  store.dispatch("setLoading", false)
  return response;
}, error => {
  // Do something with response error
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
      if (res.status === 200 && res.data.status) {
        console.table(res.data.data);
        return res.data
      } else {
        this.$message.error(res.data.msg)
      }
    })
    .catch(err => {
      return err
    })
}



