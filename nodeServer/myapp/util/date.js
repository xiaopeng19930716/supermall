/*
 * @Descripttion:
 * @version:
 * @Author: XiaoPeng
 * @Date: 2020-03-21 06:16:16
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-03-21 07:43:44
 */
/**
 * @name: dateFormat
 * @test: 
 * @msg: 
 * @param {Date} date 日期
 * @return: 日期字符串yyyy-MM-dd HH:mm:ss
 */
exports.dateFormat = (date) => {
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