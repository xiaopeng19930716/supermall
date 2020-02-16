import axios from "axios"
const baseURL = "http://localhost:3000"
const instance = axios.create({
  timeout: 10000,
  baseURL: baseURL,
})
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



