var express = require('express');
var router = express.Router();
var sysuser = require('../services/sysuserServices')
var users = require("../services/userservices")

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('用户接口');
});
// 用户登录验证
router.post('/login', sysuser.login);
// 查询系统用户
router.post('/querysys', sysuser.querysys);
// 增加系统用户
router.post('/addsys', sysuser.addsys);
// 删除系统用户
// 系统用户权限

// 获取用户
router.post('/querryusers', users.queryusers)
// 查询用户(按名称或者编号)
router.post('/searchusers', users.searchusers)
// 更新用户
router.post('/updateusers', users.updateusers)
// 增加用户
router.post('/insertusers', users.insertusers)
//批量导入用户
router.post('/insertfileusers', users.insertfileusers)
// 删除人员接口
router.post('/delusers', users.delusers)
// 导出路由
module.exports = router;
