/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 17:50:47
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-21 07:49:07
 */
var mysql = require('mysql');
const date = require('../util/date')

const getWeekXCount = date.getWeekXCount
const getDayXCount = date.getDayXCount
/**
 * 封装通用数据库操作函数
 */
//1. 配置数据库连接参数,创建连接对象
var connection = mysql.createConnection({
  host: 'localhost',
  port: 33060,
  user: 'zytk',
  password: 'zytk159357',
  database: 'zytk'
});
//1. 建立连接
connection.connect();
// 2. 发送SQL语句到mysql服务端执行
// connection.query(sqlString, value, callback);
const sql = "select users.userid,users.name,users.deptname,attenrank.rankstart,attenrank.rankend,attenrank.cycle,attenrank.cycleunit,attenrank.rankdays from users,attenrank where (users.rankname =attenrank.rankname) and users.atten=1;"
connection.query(sql, (err, data) => {
  if (err) {
    console.log(err);
  }
  data.forEach(element => {
    var count = 0
    element.rankdays = element.rankdays.split("-")
    element.rankdays.forEach(e => {
      if (element.cycleunit === 7) {
        count += getWeekXCount(element.rankstart, element.rankend, Number(e))
      } else {
        count += getDayXCount(element.rankstart, element.rankend, Number(e))
      }
    })
    element.count = count
  });
  console.log(data);
})
// 3. 关闭连接
connection.end();
