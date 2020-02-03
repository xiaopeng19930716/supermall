var mysql = require('mysql');
/**
 * 封装通用数据库操作函数
 */
exports.query = (sqlString, value, callback) => {
  //1. 配置数据库连接参数,创建连接对象
  var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'zytk',
    password: 'zytk159357',
    database: 'zytk'
  });
  //1. 建立连接
  connection.connect();
  // 2. 发送SQL语句到mysql服务端执行
  connection.query(sqlString, value, callback);
  // 3. 关闭连接
  connection.end();
}
