import axios from "axios"
var baseURL = "http://localhost:3000"
//获得检查数据
export default function http(apiurl, pramas, success, fail) {
  var url = baseURL + apiurl
  const instance = axios.create({
    // timeout: 10000
  })
  instance.post(url, pramas)
    .then(res => {
      success(res)
    })
    .catch(err => {
      console.error(err);
      fail(err)
    })
}



