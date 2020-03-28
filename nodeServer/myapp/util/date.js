/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-21 06:16:16
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-26 05:21:10
 */
/**
 * @name: dateToString
 * @test: 
 * @msg: 
 * @param {Date} date 日期
 * @return: 日期字符串yyyy-MM-dd HH:mm:ss
 */
exports.dateToString = (date) => {
  const dateString = date.toLocaleString();
  return dateString
}
/**
 * @name: stringToDate
 * @test: 
 * @msg: 
 * @param {String} dateString 日期字符串yyyy-MM-dd HH:mm:ss
 * @return: 日期
 */
exports.stringToDate = (dateString) => {
  const date = new Date(dateString.replace("-", "/"))
  return date
}
/**
 * @name:getWeekXCount 
 * @test: 
 * @msg:计算某个时间段星期x的天数 
 * @param {Date} start 起始日期
 * @param {Date} end 结束日期
 * @param {Number} weekx 星期X
 * @return: 星期X的天数
 */
exports.getWeekXCount = (start, end, weekx) => {
  var count = 0;
  const day = 24 * 60 * 60 * 1000
  const startTime = start.getTime()
  const endTime = end.getTime()
  for (let index = startTime; index <= endTime; index += day) {
    if (new Date(index).getDay() == weekx) {
      count++
    }
  }
  return count
}
/**
 * @name: getDayXCount
 * @test: 
 * @msg: 计算某个时间段初x的天数
 * @param {Date} start 开始日期
 * @param {Date} end 结束日期
 * @param {Number} dayx 初x
 * @return: 初x的天数
 */
exports.getDayXCount = (start, end, dayx) => {
  var count = 0;
  const day = 24 * 60 * 60 * 1000
  const startTime = start.getTime()
  const endTime = end.getTime()
  for (let index = startTime; index <= endTime; index += day) {
    if (new Date(index).getDate() == dayx) {
      count++
    }
  }
  return count
}