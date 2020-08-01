/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-20 02:28:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-01 10:11:53
 */
const database = require('../dbConfig/mysqlConfig')
const query = database.query

exports.query = (req, res) => {
  const sql = 'select * from arrangeset'
  query(sql, (err, data) => {
    if (err) {
      throw err
    }
    data.forEach((element) => {
      element.reality = element.reality === 1 ? true : false
      element.overtime = element.overtime === 1 ? true : false
    })
    res.send(data[0])
  })
}

exports.update = (req, res) => {
  const sql = 'update arrangeset set ? where id = ?'
  let value = req.body
  value.reality = value.reality === false ? 0 : 1
  value.overtime = value.overtime === false ? 0 : 1
  query(sql, [value, value.id], (err, data) => {
    if (err) {
      throw err
    }
    res.send({ status: true })
  })
}
