/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-18 03:55:42
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-31 17:16:46
 */
const date = require('../util/date')
const database = require('../dbConfig/mysqlConfig');

const query = database.query
const { stringToDate, getDayXCount, getWeekXCount } = date

exports.query = (req, res, next) => {
  const { current, pageSize, deptName, nameOrNo, startDate, endDate } = req.body
  const sql =
    "select users.userid,users.name,users.deptname,attenrank.* from users,attenrank where (users.rankname =attenrank.rankname) and (users.deptname=?) and (users.userid or users.name like ?) and users.atten=1 limit ?,?;"
  const value = [deptName, "%" + nameOrNo + "%", (current - 1) * pageSize, pageSize]
  query(sql, value, (err, data) => {
    if (err) {
      console.log(err);
    }
    data.forEach(element => {
      element.rankend = element.rankstart.getTime()+element.cycle*element.cycleunit*24*60*60*1000
      element.rankend = new Date(element.rankend)
      caculateQuantum(element)
      setDayToCome(startDate, endDate, element)
      setReality(startDate, endDate, element)
    });
    res.send({
      status: true,
      data: data,
      count: data.length
    })
  })
}
/**
 * @name: setDayToCome
 * @param {Date} startDate 查询的开始日期
 * @param {Date} endDate 查询的结束日期
 * @param {Object} element 每一个元素
 * @return: 添加了新属性某一项
 * @msg: 计算应到天数
 * @test: 
 */
const setDayToCome = (startDate, endDate, element) => {
  element.rankdays = element.rankdays.split("-")
  var start = stringToDate(startDate).getTime()
  var end = stringToDate(endDate).getTime()
  var count = 0
  // 获得查询时间段和班次时间段的交集区间
  const startTime = element.rankstart.getTime()
  const endTime = element.rankend.getTime()
  if (end > startTime && endTime > start) {
    start = Math.max(start, startTime)
    end = Math.min(end, endTime)
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
}

/**
 * @name: setReality
 * @test:
 * @msg:设置实到天数
 * @param {Date} startDate 查询的开始日期
 * @param {Date} endDate 查询的结束日期
 * @param {Object} element 数据库返回数组
 * @return:添加了新属性的数组
 */
const setReality = (startDate, endDate, element) => {
  const recordSQL = "select record from card_record where userid =?"
  query(recordSQL, element.userid, (err, data) => {
    if (err) {
      throw err
    }
    // console.log(data);
  })
}
/**
 * @name: caculateQuantum
 * @param {Object} element 
 * @return: 迟到 旷工 早退 的时间段
 * @msg: 计算迟到 早退 旷工 ...等时间段信息
 * @test: 
 */
const caculateQuantum = (element) => {
  var rank = element.rankquantum
  const setSQL = "select * from arrangeset"
  let rankSQL = "select * from quantum where quanid ="+rank
  // 查询时间段设置
  query(setSQL, (err, set) => {
    if (err) {
      throw err
    }
    // 查询时间段
    query(rankSQL, (err, rank) => {
      if (err) {
        console.log(err);
      }
      console.log(rank);
      console.log(set);
    })
  })
}