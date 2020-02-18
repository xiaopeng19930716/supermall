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
connection.query("insert into dept('deptname','pid','deptow','deptphone','edittime') values?", [[
  ['测试81', '肖鹏', 15995925338, 0, 2020 - 02 - 18T10: 25: 04.812Z],
  ['测试82', 'admin', 15995925339, 0, 2020 - 02 - 18T10: 25: 04.812Z]
]], (err, data) => {
  console.log(data);
})
// 3. 关闭连接
connection.end();
