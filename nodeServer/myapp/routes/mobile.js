/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-26 19:05:15
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-31 21:54:47
 */
var express = require('express');
var router = express.Router();
const mobile = require('../services/mobileSevices')

/* GET mobile home page. */
router.get('/', function (req, res, next) {
  res.send({
    status: true
  })
});
// 手机登录页
router.post("/login", mobile.login)
// 个人考勤班次详情
router.post("/userinfo", mobile.userinfo)

module.exports = router;
