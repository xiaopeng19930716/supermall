/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-29 12:21:51
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-07 23:36:59
 */
var express = require('express');
var router = express.Router();
var atten = require('../services/attenServices')

router.get('/', function (req, res, next) {
  res.send('排班管理');
});

// 获取用户
router.post('/query', atten.query)
// 更新用户
router.post('/update', atten.update)
// 增加用户
router.post('/insert', atten.insert)
// 删除人员接口
router.post('/del', atten.del)
// 导出路由
module.exports = router;
