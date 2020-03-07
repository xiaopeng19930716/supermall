/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-24 21:25:49
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-07 15:17:53
 */
var express = require('express');
var router = express.Router();
var quantum = require('../services/quantumServices')

router.get('/', function (req, res, next) {
  res.send('排班管理');
});

// 获取用户
router.post('/query', quantum.query)
// 更新用户
router.post('/update', quantum.update)
// 增加用户
router.post('/insert', quantum.insert)
// 删除人员接口
router.post('/del', quantum.del)
// 导出路由
module.exports = router;
