import http from '../localaxios'
const [querry, update, add, del] = ["/dept/querrydept", "/dept/updatedept", "/dept/addept", "/dept/deldept"]
export function deptQuerry(pramas) {
  return http(querry, pramas).then(res => res.data).catch(err => err)
}
export function deptUpdate(pramas) {
  return http(update, pramas).then(res => {
    if (res.status == 200) {
      return res.data.result
    } else {
      return res.status
    }
  }).catch(err => err)
}
