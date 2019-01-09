var express = require('express');
var router = express.Router();
var {
  connect,
  insert,
  find,
  ObjectId,
  remove,
  edit
} = require("../libs/mongo.js");
//TODO:登录

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', async (req, res, next) => {
        // cookie-parser可以设置和获取cookie

        // 1.安装   cnpm instlal cookie-parser --save

        // 2.引入var cookieParser = require('cookie-parser');

        // 3.设置中间件

        // app.use(cookieParser());

        // 4.设置cookie

        // res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true});

        // //HttpOnly 默认false不允许 客户端脚本访问

        // 5.获取cookie

        // req.cookies.name







  let {
    inputEmail,
    inputPassword
  } = req.body
  let data = await find(`user`, {
    name: inputEmail
  })
  console.log(data)
  if (data[0].password === inputPassword) {
    // router.use(session({
    //   secret: inputEmail,
    //   cokkie: { maxAge: 60 * 1000 * 300 } //过期时间 ms
    // }))
    res.send("success");
  } else {
    res.send("fail");
  }
});

module.exports = router;