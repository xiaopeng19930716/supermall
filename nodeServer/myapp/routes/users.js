var express = require('express');
var router = express.Router();
var services = require('../services/userServices')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('欢迎使用API');
});
// 用户登录验证
router.post('/login',services.login);
// 查询所有用户
router.post('/querysys',services.querysys)
// 增加系统用户
router.post('/addsys',services.addsys)
// 导出路由
module.exports = router;
