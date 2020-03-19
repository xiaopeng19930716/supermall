/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-20 02:27:54
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-20 02:36:32
 */
var express = require('express');
var router = express.Router();
var arrngeset = require('../services/arrangeServices')

router.get('/', function (req, res, next) {
  res.send('考勤设置');
});

// 获得设置
router.post('/query', arrngeset.query)
// 更新设置
router.post('/update', arrngeset.update)

// 导出路由
module.exports = router;
