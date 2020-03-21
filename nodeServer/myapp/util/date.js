/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-21 06:16:16
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-22 06:08:50
 */
/**
 * @name: dateToString
 * @test: 
 * @msg: 
 * @param {Date} date 日期
 * @return: 日期字符串yyyy-MM-dd HH:mm:ss
 */
exports.dateToString = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  const dateString = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
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
  const year = Number(dateString.slice(0, 4))
  const month = Number(dateString.slice(5, 7)) - 1
  const day = Number(dateString.slice(8, 10))
  const hour = Number(dateString.slice(11, 13))
  const minute = Number(dateString.slice(14, 16))
  const second = Number(dateString.slice(17, 19))
  const date = new Date(year, month, day, hour, minute, second)
  return date
}
/**
 * @name:getWeekXCount 
 * @test: 
 * @msg: 
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
 * @msg: 
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
  console.log(count);
  return count
}