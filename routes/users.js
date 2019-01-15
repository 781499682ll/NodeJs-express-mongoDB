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

//引入token
var token = require("../libs/token.js");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', async (req, res, next) => {

  let {
    inputEmail,
    inputPassword
  } = req.body
  let data = await find(`user`, {
    name: inputEmail
  })
  console.log(data)
  if(data.length<=0){
    res.send('fail');
  }
  else if (data[0].password === inputPassword) {
    res.send({
      status:'success',
	    token:token.createToken({inputEmail},30)
    
    });
  } else {
    res.send({
      status:'fail'
    });
  }
});

module.exports = router;