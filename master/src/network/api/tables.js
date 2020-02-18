/*
 * @Descripttion: "对接后台服务"
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-10 02:08:48
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 09:38:11
 */
import http from '../localaxios'
import dept from '../../store/modules/dept'
const [querry, update, add, del, filein] = ["/dept/querrydept", "/dept/updatedept", "/dept/insertdept", "/dept/deldept", "/dept/insertfiledept"]

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
 * @name: 新增部门
 * @test: 
 * @msg: 批量新增传入数组,单个新增传入对象
 * @params {onject,array} 
 * @return: Json
 */
export function deptAdd(pramas) {
  if (pramas instanceof Array) {
    return http(filein, pramas).then(res => res.data).catch(err => err)
  }
  else {
    return http(add, pramas).then(res => res.data).catch(err => err)
  }

}