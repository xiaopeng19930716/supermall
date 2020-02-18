/*
 * @Descripttion: 部门后台接口
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 02:34:38
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 09:42:20
 */
var express = require('express');
var router = express.Router();
var dept = require("../services/deptservices")

router.get('/', function (req, res, next) {
  res.send('部门接口');
})
// 获取部门
router.post('/querrydept', dept.querydept)
// 更新部门
router.post('/updatedept', dept.updatedept)
// 增加部门
router.post('/insertdept', dept.insertdept)
//批量导入部门
router.post('/insertfiledept', dept.insertfiledept)
module.exports = router;