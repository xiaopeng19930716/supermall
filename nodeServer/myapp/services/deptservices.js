/*
 * @Descripttion:"部门操作接口" 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 02:13:28
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 05:14:44
 */

const database = require('../dbConfig/mysqlConfig');
/**
 * 查询部门接口
 */
exports.querydept = (req, res, next) => {
  const sql = "select * from dept order by deptno";
  database.query(sql, (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code)
    } else {
      res.send(data);
    }
  })
}
/**
 * 更新部门接口
 */
exports.updatedept = (req, res, next) => {
  const sql = "update dept set ? where deptno =?;select * from dept";
  database.query(sql, [req.body, req.body.deptno], (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code);
    } else {
      res.send({
        status: true,
        msg: "保存成功",
        result: data[1],
      });
    }
  });
}
/**
 * 增加部门接口
 */
exports.insertdept = (req, res, next) => {
  const sql = "insert into dept set ?";
  var date = new Date();
  // 增加系统时间
  req.body.edittime = date;
  const value = req.body;
  database.query(sql, value, (err, data) => {
    if (err) {
      res.send("增加部门失败" + err.code);
    } else {
      res.send(data);
    }
  })
}