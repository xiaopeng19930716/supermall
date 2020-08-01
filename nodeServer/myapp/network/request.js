/*
 * @Author: your name
 * @Date: 2020-08-01 08:50:46
 * @LastEditTime: 2020-08-01 08:58:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myapp\network\request.js
 */
const db = require('../dbConfig/mysqlConfig')
const poolQuery = db.poolquery
const request = (request, response, next) => {
 console.log(request);
}