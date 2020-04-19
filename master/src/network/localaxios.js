/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-02 23:36:20
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-19 19:51:24
 */
import axios from "axios"
import { showLoading, hideLoading } from './loading';
const baseURL = "http://localhost:3000"
const instance = axios.create({
  timeout: 10000,
  baseURL: baseURL,
})
instance.interceptors.request.use(config => {
  // Do something before request is sent
  const token = sessionStorage.getItem("token")
  if (token) {
    config.headers.Authorization = token
  }
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});
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



