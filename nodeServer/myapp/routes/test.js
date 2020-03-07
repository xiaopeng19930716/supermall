/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 17:50:47
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-07 02:08:10
 */
var mysql = require('mysql');
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
connection.query("insert into users set ?",
  {
    name: '肖鹏',
    cardcode: '',
    sex: '男',
    deptname: '总公司',
    email: '',
    phone: '',
    identitycard: ''
  }, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  })
// 3. 关闭连接
connection.end();
