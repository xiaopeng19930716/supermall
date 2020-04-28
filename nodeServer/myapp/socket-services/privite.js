/*
 * @Descripttion:加密聊天对话
 * @version:
 * @Author: 肖鹏
 * @Date: 2020-04-24 02:21:33
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-24 02:36:23
 */
const crypto = require('crypto')
const randomPrefix = function (n) {
  var _str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  var buf = new Buffer(n);
  for (var i = 0; i < n; i++) {
    buf[i] = _str.charCodeAt(Math.floor(Math.random() * _str.length));
  }
  return buf;
};

const htonl = function (n) {
  var buf = new Buffer(4);
  buf[0] = (n & 0xFF000000) >> 24;
  buf[1] = (n & 0x00FF0000) >> 16;
  buf[2] = (n & 0x0000FF00) >> 8;
  buf[3] = (n & 0x000000FF) >> 0;
  return buf;
};
const padding = function (n) {
  var len = n % 32;
  if (len == 0) {
    len = 32;
  } else {
    len = 32 - len;
  }
  var buf = new Buffer(len);
  for (var i = 0; i < len; i++) {
    buf[i] = len;
  }
  return buf;
};
/**
 * @name: 加密对话信息
 * @param {String} msg 
 * @return: 加密的对话信息
 * @msg: 
 * @test: 
 */
exports.encrypt = function (msg) {
  let msgBuf = new Buffer(msg, "utf-8"),
    msgBufLength = msgBuf.length,
    preBuf = randomPrefix(16),
    netBuf = htonl(msgBufLength),
    corpBuf = new Buffer(corpId, "utf-8"),
    corpBufLength = corpBuf.length,
    paddingBuf = padding(20 + msgBufLength + corpBufLength);
  let cipher = crypto.createCipheriv('aes-256-cbc', encodingAESKey, encodingAESKey.slice(0, 16));
  cipher.setAutoPadding(false); // 取消自动填充
  return cipher.update(Buffer.concat([preBuf, netBuf, msgBuf, corpBuf, paddingBuf]), "binary", 'base64') + cipher.final('base64'); // 解密数据
};