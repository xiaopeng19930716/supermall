/*
 * @Descripttion:"部门操作接口" 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 02:13:28
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-04-01 19:03:56
 */

const database = require('../dbConfig/mysqlConfig');
const query = database.query
/**
 * 查询考勤记录接口
 */
exports.query = (req, res, next) => {
  var { current, pageSize, startTime, endTime, nameOrNo } = req.body
  nameOrNo = "%" + nameOrNo + "%"
  const dataSQL =
    "select card_record.userid,card_record.record,card_record.dev,card_record.devSN,card_record.serial, users.deptname,users.name from card_record,users where (card_record.record between ? and ?) and card_record.userid = users.userid and (users.name or users.userid like ?) limit ?,?;"
  const countSQL = "select count(*) as count from card_record,users where (card_record.record between ? and ?) and (users.name or users.userid like ?) and card_record.userid=users.userid"
  const value = [startTime, endTime, nameOrNo, (current - 1) * pageSize, pageSize]
  query(countSQL, [startTime, endTime, nameOrNo], (err, data) => {
    if (err) {
      throw err
    } else {
      const count = data[0].count
      query(dataSQL, value, (err, data) => {
        if (err) {
          throw err
        } else {
          res.send({
            status: true,
            count: count,
            data: data
          })
        }
      })
    }
  })
}

exports.insertfile = (req, res, next) => {
  let pramas = req.body;
  const length = pramas.length;
  let value = [];
  for (let index = 0; index < length; index++) {
    const element = pramas[index];
    // 将pid转换为数字
    element.pid = Number(element.pid)
    value[index] = Object.values(element)
  }
  console.log(value);
  // 因为删除了pidname增加了pid所以pid在后面
  const sql = "insert into dept(deptname,deptow,deptphone,pid) values?";
  database.query(sql, [value], (err, data) => {
    if (err) {
      res.send("批量增加部门失败" + err.code);
    } else {
      res.send(data);
    }
  })
}
/**
 * @name: 部门删除
 * @test:
 * @msg:
 * @param {String} deptName
 * @return:部门是否能被删除true or false 部门下有子部门remark 0 部门下有人员 remark 1 部门删除成功
 */
exports.deptdel = (req, res, next) => {
  const deptName = req.body.deptname
  // 部门是否有人员
  const userSQL = "select * from users where deptname =? limit 1;"
  // 部门是否是上级部门
  const pidSQL = "select * from dept where pid=(select deptno from dept where deptname =?);"
  const sql = pidSQL + userSQL
  query(sql, [deptName, deptName], (err, data) => {
    if (err) {
      throw err
    } else if (data[0].length) {
      res.send({
        status: 1
      })
    } else if (!data[0].length && data[1].length) {
      res.send({
        status: 2,
      })
    } else {
      const delSQL = "delete from dept where deptname=?"
      query(delSQL, deptName, (err, data) => {
        if (err) {
          throw err
        }
        res.send({
          status: 0,
        })
      })
    }
  })
}