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
connection.query('select count(userid) as count from users where  deptno=(select deptno from dept where deptname="测试4") and  (userid like "%陈%" or name like "%陈%") order by userid;',
(err, data) => {
    console.log(data);
  })
// 3. 关闭连接
connection.end();
