import axios from "axios"
const baseURL = "http://localhost:3000"
const instance = axios.create({
  timeout: 10000,
  baseURL: baseURL,
})
//获得检查数据
export default function http(url, pramas, success) {
  pramas = pramas || {};
  instance.post(url, pramas)
    .then(res => {
      success(res)
    })
    .catch(err => {
      console.error(err);
    })
}



