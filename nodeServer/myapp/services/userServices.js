const database = require('../dbConfig/mysqlConfig');
// 系统用户登录服务接口
exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = "select * from sys_user where username=? and password=?";
  const value = [username, password];
  database.query(sql, value, (err, data) => {
    if (err) {
      console.log("查询数据库出错")
      return;
    } else {
      res.send(data);
    };
  });
}
// 查询系统用户
exports.querysys= (req,res)=>{
  const sql = "select * from sys_user order by userno"
  database.query(sql,(err, data) => {
    if (err) {
      console.log("查询数据库出错")
      return;
    } else {
      res.send(data);
    };
  });
}
// 增加系统用户
exports.addsys = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body)
  var date = new Date();
  date = date.toLocaleString();
  console.log(date);
  const sql = "insert into sys_user(username,password,date) values(?,?,?)"
  const value = [username, password,date];
  database.query(sql,value, (err, data) => {
    if (err) {
      res.send("已存在的用户名");
      return;
    } else {
      res.send(data.affectedRows + "行受影响");
    };
  });
}