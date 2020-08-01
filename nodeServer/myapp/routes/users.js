/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-02-02 07:54:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-01 10:59:16
 */

var express = require("express");
var sysuser = require("../services/sysuserServices");
var users = require("../services/userServices");
var router = express.Router();

router.post("/querysys", sysuser.querysys);
router.post("/login", sysuser.login);
router.post("/addsys", sysuser.addsys);
// 删除系统用户

// 系统用户权限
// 系统用户更新密码
router.post("/updatepwd", sysuser.updatepwd);

// 获取用户
router.post("/query", users.query);
// 更新用户
router.post("/update", users.update);
// 增加用户
router.post("/insert", users.insert);
//批量导入用户
router.post("/insertfile", users.insertfile);
// 删除人员接口
router.post("/del", users.del);

// 人员排班详情
// router.post('/arrange', users.arrange)
// 更新排班情况
router.post("/updatebyid", users.updatebyid);
router.post("/updatebydept", users.updatebydept);
// 清除排班
router.post("/cleararrange", users.cleararrange);
// 导出路由
module.exports = router;
