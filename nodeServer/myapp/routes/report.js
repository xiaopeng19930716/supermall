/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-18 03:54:51
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-21 04:58:32
 */
var express = require('express');
var router = express.Router();
var report = require("../services/reportServices")

router.get('/', function (req, res, next) {
  res.send('部门接口');
})
// 查询生成报表
router.post('/query', report.query)

module.exports = router;