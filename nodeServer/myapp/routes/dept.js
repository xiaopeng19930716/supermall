/*
 * @Descripttion: 部门后台接口
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 02:34:38
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-05 14:30:06
 */
var express = require('express');
var router = express.Router();
var dept = require("../services/deptservices")

router.get('/', function (req, res, next) {
  res.send('部门接口');
})
// 获取部门
router.post('/query', dept.query)
// 更新部门
router.post('/update', dept.update)
// 增加部门
router.post('/insert', dept.insert)
//批量导入部门
router.post('/insertfile', dept.insertfile)
module.exports = router;