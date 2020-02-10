import http from '../localaxios'
const [querry, update, add, del] = ["/dept/querrydept", "/dept/updatedept", "/dept/addept", "/dept/deldept"]
export function deptQuerry(tb,pramas) {
  http(querry, pramas, res => tb(res.data))
}
