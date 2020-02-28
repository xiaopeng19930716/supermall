const database = require('../dbConfig/mysqlConfig');
const query = database.query;
// 系统用户登录服务接口
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = "select * from sys_user where username=? and password=?";
  const value = [username, password];
  query(sql, value, (err, data) => {
    if (err) {
      res.send("查询数据库出错")
      return;
    } else {
      res.send(data);
      if (data.length) {
        query("update sys_user set login=1 where userno=?", [data[0].userno], (err, data) => {
          if (err) {
            console.log(err);
          }
        })
      }
    };
  });
}
// 查询系统用户
exports.querysys = (req, res, next) => {
  const sql = "select userno,username,optiontime from sys_user order by userno"
  query(sql, (err, data) => {
    if (err) {
      res.send("查询数据库出错")
      return;
    } else {
      res.send(data);
    };
  });
}
// 增加系统用户
exports.addsys = (req, res, next) => {
  console.log(req.body)
  const sql = "insert into sys_user set ?"
  var date = new Date()
  date = date.toLocaleString();
  const value = {
    username: req.body.username,
    password: req.body.password,
    date: date
  };
  database.query(sql, value, (err, data) => {
    if (err) {
      res.send({
        status: 0,
        msg: "查询数据库出错"
      });
      return;
    } else {
      console.log(data);
      res.send({
        status: 1,
        msg: "添加成功",
        userno: data.insertId
      });
    };
  });
}