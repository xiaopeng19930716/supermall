const database = require('../dbConfig/mysqlConfig');

// 查询部门接口
exports.querydept = (req, res) => {
  const sql = "select * from dept";
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