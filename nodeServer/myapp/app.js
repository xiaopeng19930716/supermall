/*
 * @Descripttion: 
 * @version: 
 * @Author: XiaoPeng
 * @Date: 2020-02-02 07:38:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-01 09:14:55
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const checkToken = require('./util/checkToken').checkToken
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const deptRouter = require('./routes/dept')
const quanRouter = require('./routes/quan')
const attenRouter = require('./routes/atten')
const fileRouter = require('./routes/file')
const recordRouter = require('./routes/record')
const reportRouter = require('./routes/report')
const arrangesetRouter = require('./routes/arrangeset')
const mobileRouter = require('./routes/mobile')


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// 添加跨域组件
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 验证token
app.use(checkToken)
// 电脑端
app.use('/', indexRouter);
// 用户路由
app.use('/users', usersRouter);
// 部门路由
app.use('/dept', deptRouter)
// 时间段
app.use('/quan', quanRouter)
// 排班
app.use('/atten', attenRouter)
// 文件服务
app.use('/file', fileRouter)
// 考勤记录
app.use('/record', recordRouter)
// 考勤设置
app.use('/set', arrangesetRouter)
// 考勤报表
app.use('/report', reportRouter)

// 手机端
app.use('/mobile', mobileRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
