/*
 * @Descripttion:"人员操作接口" 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-09 02:13:28
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 05:14:44
 */

const database = require('../dbConfig/mysqlConfig');
/**
 * 初始化人员接口
 * 需要传入的参数：当前页数,每页大小
 * 返回:总条数 最大id 当前页数据（编号 姓名 性别,部门,卡号,手机号,邮箱号,身份证号码） 
 */
exports.queryusers = (req, res, next) => {
  const current = req.body.current;
  const pageSize = req.body.pageSize;
  var dataSQL =
    "select cast(users.userid as unsigned) as userid,users.name,users.sex,users.deptno,dept.deptname,users.cardcode,users.phone,users.email,users.identitycard from users,dept where users.deptno=dept.deptno order by userid limit ?,?;";
  var value = [(current - 1) * pageSize, pageSize];
  var countSQL = "select count(*) from users;";
  var sql = countSQL + dataSQL;
  database.query(sql, value, (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code)
    } else {

      res.send({
        status: true,
        count: Object.values(data[0][0])[0],
        data: data[1],
      });
    }
  })
}
/**
 * 查询人员接口
 * 需要传入的参数：当前页数,每页大小,部门编号,姓名或者编号
 * 返回查询到的总数 人员信息 最新的部门信息 仅仅返回当前部门不返回子部门
 */
exports.searchusers = (req, res, next) => {
  const [current, pageSize, deptName, nameOrNo] = [req.body.current, req.body.pageSize, req.body.deptName, "%" + req.body.nameOrNo + "%"];
  const dataSQL =
    "select cast(userid as unsigned) as userid,name,sex,cardcode,phone,email,identitycard from users where  deptno=(select deptno from dept where deptname=?) and  (userid like ? or name like ?) order by userid limit ?,?;"
  const value = [deptName, nameOrNo, nameOrNo, (current - 1) * pageSize, pageSize];
  const countSQL = "select count(*) as count from users where deptno=(select deptno from dept where deptname=?) and  (userid like ? or name like ?);"
  const deptSQL =
    database.query(countSQL, [deptName, nameOrNo, nameOrNo], (err, data) => {
      if (err) {
        throw err
      } else {
        const count = data[0].count;
        database.query(dataSQL, value, (err, data) => {
          if (err) {
            res.send(err)
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


},
  /**
   * 更新人员接口
   */
  exports.updateusers = (req, res, next) => {
    const date = new Date();
    const sql = "update users set ?,edittime=? where usersno =?";
    database.query(sql, [req.body, date, req.body.usersno], (err, data) => {
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
 * 增加人员接口
 */
exports.insertusers = (req, res, next) => {
  const sql = "insert into users set ?";
  var date = new Date();
  // 增加系统时间
  req.body.edittime = date;
  const value = req.body;
  database.query(sql, value, (err, data) => {
    if (err) {
      res.send("增加人员失败" + err.code);
    } else {
      res.send(data);
    }
  })
}

exports.insertfileusers = (req, res, next) => {
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
  const sql = "insert into users(usersname,usersow,usersphone,pid) values?";
  database.query(sql, [value], (err, data) => {
    if (err) {
      res.send("批量增加人员失败" + err.code);
    } else {
      res.send(data);
    }
  })
}