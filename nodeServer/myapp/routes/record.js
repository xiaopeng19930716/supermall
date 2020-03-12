/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-03-01 17:03:25
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-11 06:45:49
 */
var express = require('express');
var router = express.Router();
var record = require('../services/recordServices')

router.get('/', function (req, res, next) {
  res.send('考勤记录');
});

// 获取考勤记录
router.post('/query', record.query)
// 导入考勤记录
router.post('/filein', record.insertfile)

// 导出路由
module.exports = router;
