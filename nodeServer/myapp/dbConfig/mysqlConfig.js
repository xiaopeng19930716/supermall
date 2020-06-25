/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-02 07:42:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-25 10:28:05
 */
var mysql = require('mysql');
/**
 * @name: query
 * @test: 
 * @msg: 
 * @param {String} sql 数据库查询语句
 * @param {Array} value 转义替换
 * @param {Function} callback 处理结果和错误的回调函数
 * @return: 数据库返回数组 
 */
exports.query = (sql, value, callback) => {
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
  connection.query(sql, value, callback);
  // 3. 关闭连接
  connection.end();
}
/**
 * @name: 连接池
 * @param {String} sql sql语句
 * @param {Array} params 转义值 数组形式
 * @return: 
 * @msg: 
 * @test: 
 */
const pool = mysql.createPool({
  host: 'localhost',
  port: 33060,
  user: 'zytk',
  password: 'zytk159357',
  database: 'zytk',
  multipleStatements: true
})
exports.poolquery = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
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