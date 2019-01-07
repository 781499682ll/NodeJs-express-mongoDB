var express = require('express');
var router = express.Router();
//TODO:登录

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', async (req, res, next) => {
  console.log(req.body);
  let {
    inputEmail,
    inputPassword
  } = req.body
  let data = await find(`students`, {
    name: inputEmail
  })
  console.log(data)
  if (data[0].password === inputPassword) {
    res.send("success");
  } else {
    res.send("fail");
  }
});

module.exports = router;