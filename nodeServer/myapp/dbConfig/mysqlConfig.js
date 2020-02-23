var mysql = require('mysql');
/**
 * 封装通用数据库操作函数
 */
// 单条查询
exports.query = (sqlString, value, callback) => {
  //1. 配置数据库连接参数,创建连接对象
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 33060,
    user: 'zytk',
    password: 'zytk159357',
    database: 'zytk',
    multipleStatements: true
  });
  //1. 建立连接
  connection.connect();
  // 2. 发送SQL语句到mysql服务端执行
  connection.query(sqlString, value, callback);
  // 3. 关闭连接
  connection.end();
}

// 连接池
exports.poolquery = (sql, params = []) => {
  const pool = mysql.createPool({
    host: 'localhost',
    port: 33060,
    user: 'zytk',
    password: 'zytk159357',
    database: 'zytk',
  })
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(sql, params, (err, data) => {
        if (err) {
          return reject(err);
        }
        //释放连接
        resolve(data);
        connection.release();
      });
    });
  });
};
// 简单的事务
exports.connection = mysql.createConnection({
  host: 'localhost',
  port: 33060,
  user: 'zytk',
  password: 'zytk159357',
  database: 'zytk',
});
// 示例
// connection.beginTransaction((err) => {
//   if (err) { throw err; }
//   connection.query(firstSQL, value, (err, result) => {
//     if (err) {
//       return connection.rollback(() => console.log(err));
//     }
//     const params = result;
//     connection.query(secondSQL, params, (err, data) => {
//       if (err) {
//         return connection.rollback(() => console.log(err));
//       }
//       connection.commit((err) => {
//         if (err) {
//           return connection.rollback(() => console.log(err));
//         }
//         console.log('成功执行事务');
//       });
//     });
//   });
// });