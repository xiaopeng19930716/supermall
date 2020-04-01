/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-26 19:04:21
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-31 21:42:46
 */
const crypto = require("crypto")
const database = require('../dbConfig/mysqlConfig');
const query = database.query;
/**
 * @name: 手机端登录
 * @param {Object}
 * @return:
 * @msg:手机上普通用户登录
 * @test:
 */
exports.login = (req, res) => {
  let { account, password } = req.body
  const md5 = crypto.createHash("md5")
  password = md5.update(password).digest('hex');
  const sql = "select userid,name,rankname from users where userid like ? and password = ?"
  let value = ["%" + account, password]
  query(sql, value, (err, data) => {
    if (err) {
      console.log(err);
    } else if (data.length) {
      res.send({
        status: true,
        data: data[0]
      })
    } else if (!data.length) {
      res.send({
        status: false
      })
    }
  })
}

exports.userinfo = (req, res) => {
  const { userid } = req.body
  const sql = "select users.*, attenrank.*,quantum.* from attenrank,quantum ,users WHERE (attenrank.rankquantum =quantum.quanid) and (users.rankname=attenrank.rankname) and users.userid =?"
  query(sql, userid, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data[0])
  })
}