var mysql = require('mysql');
/**
 * 封装通用数据库操作函数
 */
  //1. 配置数据库连接参数,创建连接对象
  var connection = mysql.createConnection({
    host: '115.221.9.115',
    port: 56123,
    user: 'root',
    password: 'admin@123',
    database: 'zytk'
  });
  //1. 建立连接
  connection.connect();
  // 2. 发送SQL语句到mysql服务端执行
  // connection.query(sqlString, value, callback);
  connection.query("select * from dept",(err,res)=>{
    if (err){
      console.log(err);
    } 
    console.log(res);
  })
  // 3. 关闭连接
  connection.end();
