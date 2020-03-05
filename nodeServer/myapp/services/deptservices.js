/*
 * @Descripttion:"部门操作接口" 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 02:13:28
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-05 22:28:02
 */

const database = require('../dbConfig/mysqlConfig');
const query = database.query
/**
 * 查询部门接口
 */
exports.query = (req, res, next) => {
  var sql = "select * from dept order by deptno";
  query(sql, (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code)
    } else {
      let all = data
      let resdata = data
      // 增加一项属性pidname为父部门名称
      for (let i = 0; i < all.length; i++) {
        for (let j = 0; j < resdata.length; j++) {
          if (resdata[j].pid === Number(all[i].deptno)) {
            resdata[j].pidname = all[i].deptname
          }
        }
      }
      res.send({
        status: true,
        data: resdata
      });
    }
  })
}
/**
 * 更新部门接口
 */
exports.update = (req, res, next) => {
  let value = req.body;
  delete value.edittime;
  delete value.pidname;
  const sql = "update dept set ?where deptno =?";
  database.query(sql, [value, value.deptno], (err, data) => {
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
exports.insert = (req, res, next) => {
  var value = req.body
  const pidSQL = "select deptno from dept where deptname=?"
  const insertSQL = "insert into dept set ?";
  query(pidSQL, value.pidname, (err, data) => {
    if (err) {
      throw err
    }
    value.pid = data[0].deptno
    delete value.pidname
    query(insertSQL, value, (err, data) => {
      if (err) {
        throw err
      }
      res.send({
        status: true,
        insertId: data.insertId
      })
    })
  })
}

exports.insertfile = (req, res, next) => {
  let pramas = req.body;
  const length = pramas.length;
  let value = [];
  for (let index = 0; index < length; index++) {
    const element = pramas[index];
    // 将pid转换为数字
    element.pid = Number(element.pid)
    value[index] = Object.values(element)
  }
  console.log(value);
  // 因为删除了pidname增加了pid所以pid在后面
  const sql = "insert into dept(deptname,deptow,deptphone,pid) values?";
  database.query(sql, [value], (err, data) => {
    if (err) {
      res.send("批量增加部门失败" + err.code);
    } else {
      res.send(data);
    }
  })
}