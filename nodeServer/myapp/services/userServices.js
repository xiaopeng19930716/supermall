const database = require('../dbConfig/mysqlConfig');
import {Select,Insert,Delete,Update} from '../sqlMap/sql'
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
// 增加系统用户
exports.addsys= (req,res)=>{
  const name = req.body.username;
  const pwd = req.body.password;
  const sql = Insert(sys_user,(username,password,date),(name,pwd,new Date()));
  // const value = [username, password];
  database.query(sql,(err, data) => {
    if (err) {
      console.log("查询数据库出错")
      return;
    } else {
      res.send(data.affectedRows+"行受影响");
    };
  });
}