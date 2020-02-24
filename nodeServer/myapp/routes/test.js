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
connection.query("insert into users(name,deptname,sex,cardcode,phone,email,identitycard) values?", [[
  ['测试1', '二级部门3', '女', undefined, 15557376376, undefined, undefined],
  ['测试2', '二级部门3', undefined, 2020920, undefined, undefined, '421123199307166030']
]],
  (err, data) => {
    console.log(data);
  })
// 3. 关闭连接
connection.end();
