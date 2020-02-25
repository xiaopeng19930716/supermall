/*
 * @Descripttion:"排班操作接口" 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 02:13:28
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 05:14:44
 */

const database = require('../dbConfig/mysqlConfig');
const query = database.query;
/**
 * 初始化排班页接口
 * 需要传入的参数：当前页数,每页大小
 * 返回:总条数 当前页数据
 */
exports.querry = (req, res, next) => {
  const current = req.body.current;
  const pageSize = req.body.pageSize;
  const dataSQL = "select * from quantum  limit ?,?;"
  const countSQL = "select count(quanid) as count from quantum;"
  const value = [(current - 1) * pageSize, pageSize]
  query(countSQL, (err, data) => {
    if (err) {
      console.log(err);
    }
    const count = data[0].count;
    query(dataSQL, value, (err, data) => {
      if (err) {
        console.log(err);
        res.send(err)
      }
      res.send({
        status: true,
        data: data,
        count: count
      })
    })
  })
}

/**
 * 更新人员接口
 */
exports.updatequan = (req, res, next) => {
  console.log(req.body);
  const sql = "update quan set ? where userid= ?"
  query(sql, [req.body, req.body.userid], (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code);
    } else {
      res.send({
        status: true,
        msg: "保存成功",
        affectedRows: data.affectedRows,
        deptno: req.body.deptno
      });
    }
  });
}
/**
 * 增加人员接口
 */
exports.insertquan = (req, res, next) => {
  const dataSQL = "insert into quan set ?";
  const value = req.body;
  console.log(value);
  query(dataSQL, value, (err, data) => {
    if (err) {
      res.send("插入失败" + err)
    }
    res.send({
      status: true,
      userid: data.insertId
    })
  })
}
exports.insertfilequan = (req, res, next) => {
  const values = req.body;
  var array = []
  values.forEach(element => {
    array.push([element.name, element.deptname, element.sex, element.cardcode, element.phone, element.email, element.identitycard])
  });
  console.log(array);
  const sql = "insert into quan(name,deptname,sex,cardcode,phone,email,identitycard) values?"
  query(sql, [array], (err, data) => {
    if (err) {
      res.send("插入出错" + err)
    } else {
      res.send({
        status: true,
        start: data.insertId,
        count: data.affectedRows,
        msg: data.message
      })
    }

  })

}
/**
 * 删除人员接口 
 * */
exports.delquan = (req, res, next) => {
  const value = req.body;
  const length = value.length;
  // 拼接sql
  var sql = "delete from quan where userid in("
  for (let i = 0; i < length - 1; i++) {
    sql += value[i] + ","
  }
  sql += value[length - 1] + ");"
  query(sql, (err, data) => {
    if (err) {
      res.send("删除出错" + err)
    } else {
      res.send({
        status: true,
        affectedRows: data.affectedRows
      })
    }
  })
}
