/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-29 12:20:41
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-26 05:58:24
 */

const database = require('../dbConfig/mysqlConfig');
const query = database.query;
/**
 * @name: 
 * @test: 
 * @msg: 
 * @param {type} 
 * @return: 
 */
exports.query = (req, res, next) => {
  const dataSQL = "select attenrank.*,quanname from attenrank,quantum where attenrank.rankquantum= quantum.quanid"
  query(dataSQL, (err, data) => {
    if (err) {
      res.send({
        status: false,
        data: err,
      })
    }
    // 格式化日期转 字符串换成数组
    data.forEach(element => {
      element.rankend = element.rankstart.getTime() + element.cycleunit * element.cycle * 60 * 60 * 24 * 1000;
      element.rankend = new Date(element.rankend).toLocaleDateString()
      element.rankstart = element.rankstart.toLocaleDateString();
      element.rankdays = element.rankdays.split("-");
      element.cycleunit = element.cycleunit === 7 ? "周" : "月";
    });
    res.send({
      status: true,
      data: data,
    })
  })
}
/**
 * @name: 更新班次信息
 * @test: 
 * @msg: 
 * @param {Object} req 班次信息 
 * @return: 是否执行成功
 */
exports.update = (req, res, next) => {
  let value = req.body;
  const sql = "update attenrank set ? where rankid=?"
  value.rankdays = value.rankdays.join("-")
  if (value.cycleunit) {
    value.cycleunit = value.cycleunit === "周" ? 7 : 31
  }
  if (value.rankend) {
    delete value.rankend
  }
  if (value.quanname) {
    delete value.quanname
  }
  value = [value, value.rankid]
  query(sql, value, (err, data) => {
    if (err) {
      console.log(err);
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
  const sql = "insert into attenrank set ?";
  let value = req.body;
  value.cycleunit = value.cycleunit === "周" ? 7 : 31
  if (value.rankend) {
    delete value.rankend
  }
  if (value.quanname) {
    delete value.quanname
  }
  query(sql, value, (err, data) => {
    if (err) {
      res.send("插入失败" + err)
    }
    res.send({
      status: true,
      rankid: data.insertId
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
  var sql = "delete from attenrank where rankid in("
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
