const database = require('../dbConfig/mysqlConfig');

// 查询部门接口
exports.querydept = (req, res, next) => {
  const sql = "select * from dept order by pid";
  const value = req.body;
  // console.log(res);
  database.query(sql, (err, data) => {
    if (err) {
      res.send("查询数据库出错")
    } else {
      res.send(data)
    }
  })
}
// 更新部门接口
exports.updatedept = (req, res, next) => {
  const sql = "update dept set ?";
  const value = req.body;
  // console.log(res);
  database.query(sql, value, (err, data) => {
    if (err) {
      res.send("查询数据库出错")
    } else {
      res.send(data.changedRows)
    }
  })
}