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
 * 查询人员接口
 * 需要传入的参数：当前页数,每页大小
 * 返回:总条数 最大id 当前页数据（编号 姓名 性别,部门,卡号,手机号,邮箱号,身份证号码） 
 * 按部门查询时返回所有当前部门数据
 */
exports.queryusers = (req, res, next) => {
  const current = req.body.current;
  const pageSize = req.body.pageSize;
  const deptName = req.body.deptname;
  const nameOrNo = req.body.nameorno;
  // 按照姓名或者编号查找
  if (deptName || nameOrNo) {
    // const nameorno = "%" + req.body.value + "%";
    // var sql = "select * from users;select * from users where usersno like ? or usersname like ? order by usersno;";
    // var value = [nameorno, nameorno];
  } else {
    var dataSQL =
      "select cast(users.userid as UNSIGNED) as userid,users.name,users.sex,users.deptno,dept.deptname,users.cardcode,users.phone,users.email,users.identitycard from users,dept where users.deptno=dept.deptno order by userid limit ?,?;";
    var value = [(current - 1) * pageSize, pageSize];
    var countSQL = "select count(*) from users;";
    var maxNoSQL = "select max(userid) from users;"
    var deptInfo = "select deptno,deptname from dept;"
    var sql = countSQL + maxNoSQL + dataSQL + deptInfo;
  }
  database.query(sql, value, (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code)
    } else {

      res.send({
        status: true,
        count: Object.values(data[0][0])[0],
        maxID: Object.values(data[1][0])[0],
        data: data[2],
        deptInfo: data[3]
      });
    }
  })
}
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