/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-26 19:05:15
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-27 05:11:50
 */
var express = require('express');
var router = express.Router();
const mobile = require('../services/mobileSevices')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// 手机登录页
router.post("/login", mobile.login)
// 个人考勤班次详情
router.post("/atteninfo", mobile.atteninfo)

module.exports = router;
