/*
 * @Descripttion:"人员操作接口" 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 02:13:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-25 09:10:05
 */
const crypto = require("crypto")
const database = require('../dbConfig/mysqlConfig');
const query = database.query;

exports.query = (req, res, next) => {
  var { current, pageSize, deptName, nameOrNo } = req.body
  nameOrNo = "%" + nameOrNo + "%";
  const dataSQL =
    "select cast(userid as unsigned) as userid,name,sex,cardcode,deptname,phone,email,identitycard,rankname ,atten from users where deptname=? and  (userid like ? or name like ?) order by userid limit ?,?;"
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
          data.forEach(element => {
            element.atten = element.atten === 0 ? "否" : "是";
          });
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
  value.atten = value.atten === "是" ? 1 : 0;
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
 * 批量更新
 */
exports.updatebyid = (req, res, next) => {
  const { rankname, atten, userid } = req.body;
  const sql =
    "update users set rankname =?" +
    ",atten= " + `${atten === "是" ? 1 : 0}` +
    " where userid in (" + `${userid.join(",")}` + ");"
  query(sql, rankname, (err, data) => {
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
 * @name: 
 * @param {type} 
 * @return: 
 * @msg: 设置排班
 * @test: 
 */
exports.updatebydept = (req, res, next) => {
  const { rankname, deptname } = req.body
  const sql = "update users set  rankname =? , atten= 1 where deptname =?"
  const value = [rankname, deptname]
  query(sql, value, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        status: true
      })
    }
  })
}
/**
 * @name: 
 * @param {type} 
 * @return: 
 * @msg: 清除排班
 * @test: 
 */
exports.cleararrange = (req, res, next) => {
  const { userId, deptName } = req.body
  var sql = '';
  if (userId.length) {
    sql = "update users set atten = 0 where userid in (" + `${userId.join(",")}` + ");"
  } else {
    sql = "update users set atten = 0 where deptname='" + deptName + "';"
  }
  query(sql, (err, data) => {
    if (err) {
      res.send({
        status: false,
        msg: "更新出错" + err
      })
    } else {
      res.send({
        status: true,
      })
    }
  })
}
