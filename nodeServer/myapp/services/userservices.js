/*
 * @Descripttion:"人员操作接口" 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 02:13:28
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-07 02:13:45
 */

const database = require('../dbConfig/mysqlConfig');
const query = database.query;
/**
 * 查询人员接口
 * 需要传入的参数：当前页数,每页大小,部门编号,姓名或者编号
 * 返回查询到的总数 人员信息 最新的部门信息 仅仅返回当前部门不返回子部门
 */
exports.query = (req, res, next) => {
  const [current, pageSize, deptName, nameOrNo] = [req.body.current, req.body.pageSize, req.body.deptName, "%" + req.body.nameOrNo + "%"];
  const dataSQL =
    "select cast(userid as unsigned) as userid,name,sex,cardcode,deptname,phone,email,identitycard,rankname from users where deptname=? and  (userid like ? or name like ?) order by userid limit ?,?;"
  const value = [deptName, nameOrNo, nameOrNo, (current - 1) * pageSize, pageSize];
  const countSQL = "select count(*) as count from users where deptname=? and  (userid like ? or name like ?);"
  query(countSQL, [deptName, nameOrNo, nameOrNo], (err, data) => {
    if (err) {
      throw err
    } else {
      const count = data[0].count;
      query(dataSQL, value, (err, data) => {
        if (err) {
          res.send("数据库错误" + err)
        } else {
          res.send({
            status: true,
            count: count,
            data: data
          })
        }
      })
    }
  })
}
/**
 * 更新人员接口
 */
exports.update = (req, res, next) => {
  const value = req.body
  const sql = "update users set ? where userid= ?"
  query(sql, [value, value.userid], (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code);
    } else {
      res.send({
        status: true,
      });
    }
  });
}
/**
 * 增加人员接口
 */
exports.insert = (req, res, next) => {
  const sql = "insert into users set ?";
  const value = req.body;
  query(sql, value, (err, data) => {
    if (err) {
      res.send("插入失败" + err)
    } else {
      console.log(data);
      res.send({
        status: true,
        userid: data.insertId
      })
    }
  })
}
exports.insertfile = (req, res, next) => {
  const values = req.body;
  var array = []
  values.forEach(element => {
    array.push([element.name, element.deptname, element.sex, element.cardcode, element.phone, element.email, element.identitycard])
  });
  console.log(array);
  const sql = "insert into users(name,deptname,sex,cardcode,phone,email,identitycard) values?"
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
  // const deptSQL = "select deptno from dept where deptname=?";
  // const insertSQL = "insert into users set ?";
  // 方法2参数全部转化成数组一次性插入

  // 解决方法1循环插入
  // dbTranQuerry.beginTransaction((err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   for (const value of values) {
  //     dbTranQuerry.query(deptSQL, value.deptname, (err, result) => {
  //       if (err) {
  //         return dbTranQuerry.rollback(() => console.log(err))
  //       }
  //       value.deptno = result[0].deptno;
  //       delete value.deptname;

  //       dbTranQuerry.query(insertSQL, value, (err, data) => {
  //         if (err) {
  //           return dbTranQuerry.rollback(() => console.log(err))
  //         }
  //         value.userid = data.insertId;
  //         res.send({
  //           status: true,
  //           user: value
  //         })
  //       })
  //     });
  //   };
  //   dbTranQuerry.commit((err) => {
  //     if (err) {
  //       return dbTranQuerry.rollback(() => console.log(err))
  //     }
  //   })
  // })
}
/**
 * 删除人员接口 
 * */
exports.del = (req, res, next) => {
  const value = req.body;
  const length = value.length;
  // 拼接sql
  var sql = "delete from users where userid in("
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

/**
 * 排班更新
 */
exports.updatearrange = (req, res, next) => {
  const sql = "update users set ? where userid= ?"
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

