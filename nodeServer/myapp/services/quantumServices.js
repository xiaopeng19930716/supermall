/*
 * @Descripttion:"排班操作接口" 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 02:13:28
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-07 19:36:42
 */

const database = require('../dbConfig/mysqlConfig');
const query = database.query;
/**
 * 初始化排班页接口
 * 需要传入的参数：当前页数,每页大小
 * 返回:总条数 当前页数据
 */
exports.query = (req, res, next) => {
  const sql = "select * from quantum "
  query(sql, (err, data) => {
    if (err) {
      res.send("数据库错误", err)
    }
    // 将overtime选项转变成数组 0 1 转换成是或否
    data.forEach(element => {
      element.overtime = element.overtime.split("/")
      element.rest = element.rest ? "是" : "否";
      element.signin = element.signin ? "是" : "否";
      element.signoff = element.signoff ? "是" : "否";
    });
    res.send({
      status: true,
      data: data,
    })
  })
}


/**
 * 更新时间段接口
 */
exports.update = (req, res, next) => {
  var value = req.body;
  const sql = "update quantum set ? where quanid=?"
  // 将overtime转变为字符串
  value.overtime.sort()
  value.overtime = value.overtime.join("/")
  value.rest = value.rest === "是" ? 1 : 0;
  value.signin = value.signin === "是" ? 1 : 0;
  value.signoff = value.signoff === "是" ? 1 : 0;
  value = [value, value.quanid]
  console.log(value);
  query(sql, value, (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code);
    } else {
      res.send({
        status: true,
      });
    }
  });
}
/**
 * 增加时间段接口
 */
exports.insert = (req, res, next) => {
  const sql = "insert into quantum set ?";
  let value = req.body;
  // 将overtime转变为字符串
  value.overtime.sort()
  value.overtime = value.overtime.join("/")
  value.rest = value.rest === "是" ? 1 : 0;
  value.signin = value.signin === "是" ? 1 : 0;
  value.signoff = value.signoff === "是" ? 1 : 0;
  console.log(value);
  query(sql, value, (err, data) => {
    if (err) {
      res.send("插入失败" + err)
    }
    res.send({
      status: true,
      quanid: data.insertId
    })
  })
}
/**
 * 删除时间段接口 
 * */
exports.del = (req, res, next) => {
  const value = req.body;
  const length = value.length;
  // 拼接sql
  var sql = "delete from quantum where quanid in("
  for (let i = 0; i < length - 1; i++) {
    sql += value[i] + ","
  }
  sql += value[length - 1] + ");"
  query(sql, (err, data) => {
    if (err) {
      res.send("删除出错" + err)
    } else {
      res.send({
        status: true,
        affectedRows: data.affectedRows
      })
    }
  })
}
