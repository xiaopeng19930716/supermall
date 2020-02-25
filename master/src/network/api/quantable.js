/*
 * @Descripttion: "对接后台服务"
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-10 02:08:48
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 09:38:11
 */
import http from '../localaxios'
const [querry, update, add, del] = ["/quan/querry", "/quan/update", "/quan/insert", "/quan/del"];
const quanQuerry = (pramas) => {
  return http(querry, pramas)
    .then(res => res.data)
    .catch(err => err)
}
/**
 * 更新用户
 */
const quanearch = (pramas) => {
  return http(search, pramas)
    .then(res => res.data)
    .catch(err => err)
};
/**
 * 更新用户
 */
const quanUpdate = (pramas) => {
  return http(update, pramas)
    .then(res => {
      if (res.status === 200) {
        return res.data
      } else {
        return res
      }
    })
    .catch(err => err)
}
/**
 * 新增用户
 */
const quanAdd = (pramas) => {
  if (pramas instanceof Array) {
    return http(filein, pramas)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          return res
        }
      })
      .catch(err => err)
  }
  else {
    return http(add, pramas)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          return res
        }
      })
      .catch(err => err)
  }
}
const quanDel = (pramas) => {
  return http(del, pramas)
    .then(res => {
      if (res.status === 200) {
        return res.data
      } else {
        return res
      }
    })
    .catch(err => err)
}
export {
  quanQuerry,
  quanAdd,
  quanearch,
  quanUpdate,
  quanDel
}