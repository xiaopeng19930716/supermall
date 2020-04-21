/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-02 07:54:29
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-21 22:55:01
 */
var express = require('express');
var router = express.Router();
var sysuser = require('../services/sysuserServices')
var users = require("../services/userServices")

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('用户接口');
});
// 系统用户登录验证
router.post('/login', sysuser.login);
// 查询系统用户
router.post('/querysys', sysuser.querysys);
// 增加系统用户
router.post('/addsys', sysuser.addsys);
// 删除系统用户

// 系统用户权限
// 系统用户更新密码
router.post('/updatepwd', sysuser.updatepwd)

// 获取用户
router.post('/query', users.query)
// 更新用户
router.post('/update', users.update)
// 增加用户
router.post('/insert', users.insert)
//批量导入用户
router.post('/insertfile', users.insertfile)
// 删除人员接口
router.post('/del', users.del)

// 人员排班详情
// router.post('/arrange', users.arrange)
// 更新排班情况
router.post('/updatebyid', users.updatebyid)
router.post('/updatebydept', users.updatebydept)
// 清除排班
router.post('/cleararrange', users.cleararrange)
// 导出路由
module.exports = router;
