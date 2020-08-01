/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-02 07:43:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-26 11:49:11
 */
const database = require('../dbConfig/mysqlConfig');
const query = database.query;
const crypto = require('crypto')
var jwt = require('jsonwebtoken')

/**
 * @api {post} /users/login 登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup 系统用户
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {number} userno 用户id
 * @apiSuccess {string} username 用户名
 * @apiSuccess {string} password 用户密码 密文
 * @apiSuccess {string} icon_url 用户头像地址
 * @apiSuccess {string} token 用户身份验证令牌
 * @apiSuccess {string} optiontime 最后操作时间
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "status" : "true",
 *      "data" : "{
 *         "userno":"1",
 *         "username":"admin"
 *         "password":"098f6bcd4621d373cade4e832627b4f6",
 *         "icon_url":"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
 *         "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiIsImlhdCI6MTU5MzA0OTI1MiwiZXhwIjoxNTkzMTM1NjUyfQ.5hPc1m7p85R5noOBWqzEObwAg1tY-bCGDXabhmkfUSA"
 *         "optiontime":"2020-06-25T01:40:52.000Z"
 *      }"
 *      "msg":"登陆成功"
 *  }
 * @apiSampleRequest http://localhost:3000/users/login
 * @apiVersion 1.0.0
 */
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
        msg: err
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
        query("update sys_user set token=? where userno=?;select * from sys_user where token=?", [token, data[0].userno, token], (err, data) => {
          if (err) {
            res.send({
              status: false,
              data: null,
              msg: err
            })
          }
          res.send({
            status: true,
            data: data[1][0],
            msg: "登陆成功",
          })
        })
      } else {
        res.send({
          status: false,
          data: null,
          msg: "账号或者密码错误"
        })
      }
    };
  });
}

/**
 * @api {post} /users/querysys 查询
 * @apiDescription 获取系统用户
 * @apiSampleRequest http://localhost:3000/users/querysys
 * @apiVersion 1.0.0
 * @apiName sysuser
 * @apiGroup 系统用户
 * @apiPermission token
 * @apiHeader {String} Authorization 用户的登录令牌
 * @apiParam {String} [userno] 用户id
 * @apiParam {String} [username] 用户名
 * @apiSuccess {Number} userno 用户id
 * @apiSuccess {String} username 用户名
 * @apiSuccess {String} icon_url 用户头像地址
 * @apiSuccess {String} optiontime 最后操作时间
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "status" : "true",
 *      "data" :"[{
 *         "userno":"1",
 *         "username":"admin"
 *         "icon_url":"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
 *         "optiontime":"2020-06-25T01:40:52.000Z"
 *        }]"
 *      "msg":"查询成功"
 *  }
 */
exports.querysys = (req, res, next) => {
  const sql = "select userno,username,icon_url,optiontime from sys_user order by userno"
  query(sql, (err, data) => {
    if (err) {
      res.send({
        status: false,
        data: null,
        msg: err
      })
      return;
    } else {
      res.send({
        status: true,
        data: data,
        msg: "查询成功"
      });
    };
  });
}
/**
 * @api {post} /users/addsys 注册
 * @apiDescription 增加系统用户
 * @apiSampleRequest http://localhost:3000/users/addsys1
 * @apiVersion 1.0.0
 * @apiName addsys
 * @apiGroup 系统用户
 * @apiParam {String} username 用户名称
 * @apiParam {String} password 密码
 * @apiSuccess {Number} userno 用户id
 * @apiSuccessExample {JSON} Success-Response:
 *  {
 *      "status" : "true",
 *      "data" :"{
 *         "userno":"1",
 *        }"
 *      "msg":"注册成功"
 *  }
 */
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
        data: null,
        msg: err
      });
    } else {
      res.send({
        status: true,
        data: {
          userno: data.insertId
        },
        msg: "注册成功"
      });
    };
  });
}
/**
 * @api {post} /users/updatepwd 更改密码
 * @apiDescription 更改密码
 * @apiSampleRequest http://localhost:3000/users/updatepwd
 * @apiVersion 1.0.0
 * @apiName updatepwd
 * @apiGroup 系统用户
 * @apiPermission token
 * @apiHeader {String} Authorization 用户的登录令牌
 * @apiParam {String} oldPwd 旧的密码
 * @apiParam {String} newPwd 新的密码
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "status" : "true",
 *      "data":null
 *      "msg":"更改成功"
 *  }
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
        status: false,
        data: null,
        msg: err
      })
    }
    res.send({
      status: true,
      data: null,
      msg: "修改成功"
    })
  })
}