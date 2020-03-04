
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
  const dataSQL = "select * from attenrank limit ?,?;"
  const countSQL = "SELECT count(rankid) as count  FROM attenrank"
  const value = [(current - 1) * pageSize, pageSize]
  query(countSQL, (err, data) => {
    if (err) {
      console.log(err);
    }
    const count = data[0].count;
    query(dataSQL, value, (err, data) => {
      if (err) {
        res.send({
          status: false,
          data: err,
        })
      }
      // 格式化日期转 字符串换成数组
      data.forEach(element => {
        element.rankstart = element.rankstart.toLocaleDateString();
        element.rankend = element.rankend.toLocaleDateString();
        element.rankquantum = element.rankquantum.split("-");
        element.rankdays = element.rankdays.split("-");
        element.cycleunit = element.cycleunit === 7 ? "周" : "月";
      });
      res.send({
        status: true,
        data: data,
        count: count
      })
    })
  })
}

/**
 * 更新时间段接口
 */
exports.update = (req, res, next) => {
  let value = req.body;
  value.rankquantum = value.rankquantum.join("-");
  value.rankdays = value.rankdays.join("-")
  if (value.cycleunit) {
    value.cycleunit = value.cycleunit === "周" ? 7 : 31
  }
  const sql = "update attenrank set ? where rankid=?"
  value = [value, value.rankid]
  console.log(value);
  query(sql, value, (err, data) => {
    if (err) {
      res.send("数据库查询出错错误代码" + err.code);
    } else {
      res.send({
        status: true,
        msg: "保存成功",
        affectedRows: data.affectedRows,
      });
    }
  });
}
/**
 * 增加时间段接口
 */
exports.insert = (req, res, next) => {
  const sql = "insert into attenrank set ?";
  let value = req.body;
  value.cycleunit = value.cycleunit === "周" ? 7 : 31
  query(sql, value, (err, data) => {
    if (err) {
      res.send("插入失败" + err)
    }
    res.send({
      status: true,
      rankid: data.insertId
    })
  })
}
/**
 * 删除时间段接口 
 * */
exports.del = (req, res, next) => {
  const value = req.body;
  const length = value.length;
  // 拼接sql
  var sql = "delete from attenrank where rankid in("
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
