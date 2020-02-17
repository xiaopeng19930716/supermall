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
  console.log(req.body);
  // 按照姓名或者编号查找
  if (Object.keys(req.body).length !== 0) {
    const nameorno = "%" + req.body.value + "%";
    var sql = "select * from dept;select * from dept where deptno like ? or deptname like ? order by deptno;";
    var value = [nameorno, nameorno];
  } else {
    var sql = "select * from dept;select * from dept order by deptno;";
    var value = req.body;
  }
  database.query(sql, value, (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code)
    } else {
      let all = data[0]
      let resdata = data[1]
      // 增加一项属性pidname为父部门名称
      for (let i = 0; i < all.length; i++) {
        for (let j = 0; j < resdata.length; j++) {
          if (resdata[j].pid === Number(all[i].deptno)) {
            resdata[j].pidname = all[i].deptname
          }
        }
      }
      res.send(resdata);
    }
  })
}
/**
 * 更新部门接口
 */
exports.updatedept = (req, res, next) => {
  const date = new Date();
  const sql = "update dept set ?,edittime=? where deptno =?";
  database.query(sql, [req.body, date, req.body.deptno], (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code);
    } else {
      res.send({
        status: true,
        msg: "保存成功",
        result: data.changedRows,
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