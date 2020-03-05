/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-02 23:36:20
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-05 14:13:34
 */
import axios from "axios"

const baseURL = "http://localhost:3000"
const instance = axios.create({
  timeout: 10000,
  baseURL: baseURL,
})
// 请求拦截器
instance.interceptors.request.use(config => {
  // Do something before request is sent
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});
// 响应拦截器
instance.interceptors.response.use(response => {
  // Do something before response is sent
  return response;
}, error => {
  // Do something with response error
  return Promise.reject(error);
});
/**
 * @name:http 
 * @test: 
 * @msg: 
 * @param {Object} postparams
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



