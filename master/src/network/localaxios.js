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
//获得检查数据
export default function http(url, pramas) {
  pramas = pramas || null;
  return instance.post(url, pramas)
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}
export function querry(apiUrl, params) {
  return http(apiUrl, params)
    .then(res => {
      if (res.status === 200) {
        return res.data
      } else {
        return res
      }
    }).catch(err => err)
}



