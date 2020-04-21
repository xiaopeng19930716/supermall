/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-02 07:43:10
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-21 23:46:18
 */
const database = require('../dbConfig/mysqlConfig');
const query = database.query;
const crypto = require('crypto')
var jwt = require('jsonwebtoken')
/**
 * @name: 登录接口
 * @param {String} username
 * @param {String} password
 * @return: 失败返回错误信息 成功返回token
 * @msg: 
 * @test: 
 */
// 系统用户登录服务接口
exports.login = (req, res, next) => {
  let { username, password } = req.body;
  const md5 = crypto.createHash("md5")
  password = md5.update(password).digest('hex');
  const sql = "select * from sys_user where username=? and password=?";
  const value = [username, password];
  query(sql, value, (err, data) => {
    if (err) {
      res.send({
        status: false,
        msg: "服务器内部错误!" + err
      })
    } else {
      // 验证成功
      if (data.length) {
        let content = { username: data[0].username, password: data[0].password }
        let privateKey = "appKey"
        var token = jwt.sign(
          content,
          privateKey,
          { expiresIn: 60 * 60 * 24 }
        )
        query("update sys_user set token=? where userno=?", [token, data[0].userno], (err, data) => {
          if (err) {
            res.send({
              status: false,
              msg: "服务器错误" + err
            })
          }
          res.send({
            status: true,
            msg: "登陆成功",
            token: token,
          })
        })
      } else {
        res.send({
          status: false,
          msg: "账号或者密码错误"
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
/**
 * @name:更新用户密码
 * @param {Object} oldPwd newPwd
 * @return: 
 * @msg: 先判断是否登录
 * @test: 
 */
exports.updatepwd = (req, res, next) => {
  let { oldPwd, newPwd } = req.body
  oldPwd = crypto.createHash("md5").update(oldPwd).digest('hex');
  newPwd = crypto.createHash("md5").update(newPwd).digest('hex');
  const token = req.headers.authorization
  const SQL = "update sys_user set password=? where token =? and password=?"
  query(SQL, [newPwd, token, oldPwd], (err, data) => {
    if (err) {
      res.send({
        stateCode: 1,
        msg: "更新失败" + err
      })
    }
    res.send({
      stateCode: 2,
      msg: "修改成功"
    })
  })
}