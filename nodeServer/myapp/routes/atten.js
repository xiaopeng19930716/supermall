var express = require('express');
var router = express.Router();
var atten = require('../services/attenServices')

router.get('/', function (req, res, next) {
  res.send('排班管理');
});

// 获取用户
router.post('/querry', atten.querry)
// 更新用户
router.post('/update', atten.update)
// 增加用户
router.post('/insert', atten.insert)
// 删除人员接口
router.post('/del', atten.del)
// 导出路由
module.exports = router;
