/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-18 03:55:42
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-21 09:45:14
 */
const date = require('../util/date')
const database = require('../dbConfig/mysqlConfig');

const query = database.query
const getWeekXCount = date.getWeekXCount
const getDayXCount = date.getDayXCount

exports.query = (req, res, next) => {
  // 计算某人应到天数
  const sql = "select users.userid,users.name,users.deptname,attenrank.rankend,attenrank.cycle,attenrank.cycleunit,attenrank.rankdays from users,attenrank where (users.rankname =attenrank.rankname) and users.atten=1;"
  query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  })
}
/**
 * @name: setDayToCome
 * @test: 
 * @msg: 设定应到天数
 * @param {Date} startDate 查询的开始日期
 * @param {Date} endDate 查询的结束日期
 * @param {Array} data 数据库返回数组
 * @return: 添加了新属性的数组
 */
const setDayToCome = (startDate, endDate, data) => {

  data.forEach(element => {
    var count = 0
    element.rankdays = element.rankdays.split("-")
    element.rankdays.forEach(e => {
      if (element.cycleunit === 7) {
        count += getWeekXCount(startDate, endDate, Number(e))
      } else {
        count += getDayXCount(startDate, endDate, Number(e))
      }
    })
    element.dayToCome = count
  });
  return data
}

/**
 * @name: setReality
 * @test:
 * @msg:设置实到天数
 * @param {Date} startDate 查询的开始日期
 * @param {Date} endDate 查询的结束日期
 * @param {Array} data 数据库返回数组
 * @return:添加了新属性的数组
 */
const setReality = (startDate, endDate, data) => {

  data.forEach(element => {
    var count = 0
    element.rankdays = element.rankdays.split("-")
    element.rankdays.forEach(e => {
      if (element.cycleunit === 7) {
        count += getWeekXCount(startDate, endDate, Number(e))
      } else {
        count += getDayXCount(startDate, endDate, Number(e))
      }
    })
    element.dayToCome = count
  });
  return data
}