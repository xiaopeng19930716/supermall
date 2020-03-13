/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-02 07:43:10
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-13 20:09:00
 */
const database = require('../dbConfig/mysqlConfig');
const query = database.query;
const crypto = require('crypto')


// 系统用户登录服务接口
exports.login = (req, res, next) => {
  let { username, password } = req.body;
  const md5 = crypto.createHash("md5")
  password = md5.update(password).digest('hex');
  const sql = "select * from sys_user where username=? and password=?";
  const value = [username, password];
  query(sql, value, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data.length) {
        query("update sys_user set login=1 where userno=?", [data[0].userno], (err, data) => {
          if (err) {
            console.log(err);
          }
          res.send({
            status: true,
          })
        })
      } else {
        res.send({
          status: false,
        })
      }
    };
  });
}
// 查询系统用户
exports.querysys = (req, res, next) => {
  const sql = "select userno,username,optiontime from sys_user order by userno"
  query(sql, (err, data) => {
    if (err) {
      res.send("查询数据库出错")
      return;
    } else {
      res.send(data);
    };
  });
}
// 增加系统用户
exports.addsys = (req, res, next) => {
  let { username, password } = req.body
  const md5 = crypto.createHash("md5")
  password = md5.update(password).digest('hex');
  const value = { username, password };
  const sql = "insert into sys_user set ?"
  query(sql, value, (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        status: false,
      });
    } else {
      res.send({
        status: true,
        userno: data.insertId
      });
    };
  });
}
exports.updatepwd = (req, res, next) => {

}