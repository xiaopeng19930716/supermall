/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-20 02:28:24
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-20 06:33:06
 */
const database = require('../dbConfig/mysqlConfig');
const query = database.query;

exports.query = (req, res) => {
  const sql = "select * from arrangeset"
  query(sql, (err, data) => {
    if (err) {
      throw err
    }
    data.forEach(element => {
      element.reality = element.reality === 1 ? true : false
      element.overtime = element.overtime === 1 ? true : false
    });
    res.send(data[0])
  })
}

exports.update = (req, res) => {
  const sql = "update arrangeset set ?"
  query(sql, (err, data) => {
    if (err) {
      throw err
    }
    res.send({
      status: true
    })
  })
}