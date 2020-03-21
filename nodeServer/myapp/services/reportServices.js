/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-18 03:55:42
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-22 06:12:28
 */
const date = require('../util/date')
const database = require('../dbConfig/mysqlConfig');

const query = database.query
const dateToString = date.dateToString
const stringToDate = date.stringToDate
const getWeekXCount = date.getWeekXCount
const getDayXCount = date.getDayXCount

exports.query = (req, res, next) => {
  const { current, pageSize, deptName, nameOrNo, startDate, endDate } = req.body
  // 计算某人应到天数
  const sql =
    "select users.userid,users.name,users.deptname,attenrank.rankstart,attenrank.rankend,attenrank.cycle,attenrank.cycleunit,attenrank.rankdays from users,attenrank where (users.rankname =attenrank.rankname) and (users.deptname=?) and (users.userid or users.name like ?) and users.atten=1 limit ?,?;"
  const value = [deptName, "%" + nameOrNo + "%", (current - 1) * pageSize, pageSize]
  query(sql, value, (err, data) => {
    if (err) {
      console.log(err);
    }
    data = setDayToCome(startDate, endDate, data)
    res.send({
      status: true,
      data: data,
      count: data.length
    })
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
  var start = stringToDate(startDate).getTime()
  var end = stringToDate(endDate).getTime()
  data.forEach(element => {
    var count = 0
    element.rankdays = element.rankdays.split("-")
    // 获得查询时间段和班次时间段的交集区间
    const startTime = element.rankstart.getTime()
    const endTime = element.rankend.getTime()
    if (end > startTime && endTime > start) {
      start = Math.max(start, startTime)
      end = Math.min(end, endTime)
      console.log(start, end);
      start = new Date(start)
      end = new Date(end)
    }
    element.rankdays.forEach(e => {
      if (element.cycleunit === 7) {
        count += getWeekXCount(start, end, Number(e))
      } else {
        count += getDayXCount(start, end, Number(e))
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