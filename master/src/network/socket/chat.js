/*
 * @Descripttion:
 * @version:
 * @Author: 肖鹏
 * @Date: 2020-04-22 21:22:07
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-24 07:04:27
 */
import io from 'socket.io-client'
var socket = io.connect('http://127.0.0.1:3000/chat', { 'force new connection': false })
const Chat = {
  init (username) {
    //连接websocket后端服务器
    socket.emit("user connect", username)
    socket.on('user connect', function (user) {
      console.log(user + "登录");
    })
  },
  send (username, message) {
    socket.emit('message', username, message)
  },
  recive (callback) {
    socket.on("message", function (iconUrl, message) {
      callback(iconUrl, message)
    })
  }
}
export default Chat