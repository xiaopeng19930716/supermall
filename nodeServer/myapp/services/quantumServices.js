/*
 * @Descripttion:"排班操作接口" 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 02:13:28
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 05:14:44
 */

const database = require('../dbConfig/mysqlConfig');
const query = database.query;
/**
 * 初始化排班页接口
 * 需要传入的参数：当前页数,每页大小
 * 返回:总条数 当前页数据
 */
exports.querry = (req, res, next) => {
  const current = req.body.current;
  const pageSize = req.body.pageSize;
  const dataSQL = "select * from quantum  limit ?,?;"
  const countSQL = "select count(quanid) as count from quantum;"
  const value = [(current - 1) * pageSize, pageSize]
  query(countSQL, (err, data) => {
    if (err) {
      console.log(err);
    }
    const count = data[0].count;
    query(dataSQL, value, (err, data) => {
      if (err) {
        console.log(err);
        res.send(err)
      }
      // 将overtime选项转变成数组
      data.forEach(element => {
        element.overtime = element.overtime.split("/")
      });
      res.send({
        status: true,
        data: data,
        count: count
      })
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
  if (value.overtime.length === 0) {
    value.overtime = "0"
  } else {
    value.overtime = value.overtime.join("/")
  }
  value = [value, value.quanid]
  console.log(value);
  query(sql, value, (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code);
    } else {
      res.send({
        status: true,
        msg: "保存成功",
        affectedRows: data.affectedRows,
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
  if (value.overtime.length === 0) {
    value.overtime = "0"
  } else {
    value.overtime = value.overtime.join("/")
  }
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
