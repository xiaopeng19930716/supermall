var express = require('express');
var router = express.Router();
var quantum = require('../services/quantumServices')

router.get('/', function (req, res, next) {
  res.send('排班管理');
});

// 获取用户
router.post('/querry', quantum.querry)
// 更新用户
router.post('/update', quantum.updatequan)
// 增加用户
router.post('/insert', quantum.insertquan)
// 删除人员接口
router.post('/del', quantum.delquan)
// 导出路由
module.exports = router;
