/*
 * @Descripttion:
 * @version:
 * @Author: 肖鹏
 * @Date: 2020-04-22 22:25:38
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-24 07:31:57
 */
const poolquery = require('../dbConfig/mysqlConfig').poolquery
exports.chat = (socket) => {
  socket.on("user connect", function (username) {
    if (!username == "") {
      socket.broadcast.emit('user connect', username)
    }
  })
  socket.on("message", async (user, msg) => {
    const sql = "insert into sys_user_msg set ?;select icon_url from sys_user where username=?;"
    const value = [{ username: user, message: msg }, user]
    const data = await poolquery(sql, value)
    socket.broadcast.emit("message", data[1][0].icon_url, msg)
  })
}