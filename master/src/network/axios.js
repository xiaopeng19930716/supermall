import axios from "axios"
var baseURL = "http://110.80.38.74:6661/api/v2"
var key = "/?key=48ebcni1xafyxlez7zmfs5sja55dibrmvkaerkcgznky"
// 获得数据
export function getData(option, pramas, success, fail) {
  var url = baseURL + option + key
  const instance = axios.create({
    // timeout: 10000
  })
  instance.post(url, JSON.stringify(pramas))
    .then(res => {
      success(res)
    })
    .catch(err => {
      console.error(err);
      fail(err)
    })
}
// 编辑数据

// 更新数据
