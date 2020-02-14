const database = require('../dbConfig/mysqlConfig');

// 查询部门接口
exports.querydept = (req, res, next) => {
  const sql = "select * from dept order by deptno";
  database.query(sql, (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code)
    } else {
      res.send(data)
    }
  })
}
// 更新部门接口
exports.updatedept = (req, res, next) => {
  console.log(req.body);
  const sql = "update dept set ? where deptno =?;select * from dept";
  database.query(sql, [req.body, req.body.deptno], (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code)
    } else {
      res.send({
        status: true,
        msg: "保存成功",
        result: data[1],
      })
    }
  })
}