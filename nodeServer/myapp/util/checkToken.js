/*
 * @Author: your name
 * @Date: 2020-06-26 12:29:44
 * @LastEditTime: 2020-06-26 12:36:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myapp\util\checkToken.js
 */
module.exports = ((req, res, next) => {
    console.log(req.headers.authorization, req.body);
    const route = req.url
    const token = req.headers.authorization || req.body.token
    const notNeed = ['/users/login', '/users/addsys']
    // 除登录和注册页外需要验证
    if (route === "/users/login" || route === "/users/addsys") {
        next()
    } else if (token) {
        query("select * from sys_user where token=?", token, (err, data) => {
            if (err) {
                res.send({
                    status: false,
                    msg: "服务器错误" + err
                })
            } else if (data.length) {
                const { userno } = data[0]
                req.userno = userno
                next()
            } else {
                res.send({
                    status: false,
                    msg: "无接口权限"
                })
            }
        })
    } else {
        res.send({
            status: false,
            data: null,
            msg: "请先登录系统"
        })
    }
})