var express = require('express');
var router = express.Router();
var sysuser = require('../services/sysuserServices')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('欢迎使用API');
});
// 用户登录验证
router.post('/login',sysuser.login);
// 查询系统用户
router.post('/querysys',sysuser.querysys);
// 增加系统用户
router.post('/addsys',sysuser.addsys);
// 添加用户
// 查询用户
// 更新用户

// 导出路由
module.exports = router;
