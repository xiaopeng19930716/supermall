/*
 * @Descripttion: "对接后台服务"
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-10 02:08:48
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 09:38:11
 */
import http from '../localaxios'
const [querry, update, add, del] = ["/dept/querrydept", "/dept/updatedept", "/dept/insertdept", "/dept/deldept"]

export function deptQuerry(pramas) {
  return http(querry, pramas).then(res => res.data).catch(err => err)
}
/**
 * @name: 
 * @test: 
 * @msg: 更新部门
 * @param {Json} 
 * @return: resdata
 */
export function deptUpdate(pramas) {
  return http(update, pramas).then(res => {
    if (res.status == 200) {
      return res.data.result
    } else {
      return res.status
    }
  }).catch(err => err)
}
/**
 * @name: 
 * @test: 
 * @msg: 增加部门
 * @param {Json} 
 * @return: Json
 */
export function deptAdd(pramas) {
  return http(add, pramas).then(res => res.data).catch(err => err)
}