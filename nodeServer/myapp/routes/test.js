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
connection.query("update users set ? where userid=?", [{
  userid: 1,
  name: 'TomReilly',
  sex: '男',
  deptno: '003',
  deptname: '二级部门3',
  cardcode: null,
  phone: '15557376176.0',
  email: '412036258@qq.com',
  identitycard: null
}, 1],
  (err, data) => {
    console.log(err);
  })
// 3. 关闭连接
connection.end();
