const database = require('../dbConfig/mysqlConfig');

// 查询部门接口
exports.querydept = (req, res, next) => {
  const sql = "select * from dept order by pid";
  const value = req.body;
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
  const sql = "update dept set ? where id =?;select * from dept";
  database.query(sql, [req.body, req.body.id], (err, data) => {
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