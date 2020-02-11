var express = require('express');
var router = express.Router();
var dept = require("../services/deptservices")

router.get('/',function (req,res,next) {
  res.send('部门接口');
})
// 获取部门
router.post('/querrydept',dept.querydept)
// 更新部门
router.post('/updatedept',dept.updatedept)

module.exports = router;