/*
 * @Descripttion:"设置自动启动" 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-13 10:05:48
 * @LastEditors: XiaoPeng
 * @LastEditTime: 2020-02-15 05:13:55
 */

let Service = require('node-windows').Service;

let svc = new Service({
  name: 'node_test',    //服务名称
  description: '测试项目服务器', //描述
  script: './app.js' //nodejs项目要启动的文件路径
});

svc.on('install', () => {
  svc.start();
});

svc.install();