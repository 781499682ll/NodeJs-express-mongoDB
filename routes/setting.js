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
var multer = require("multer");
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        console.log(1)
        cb(null, './uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        //给图片加上时间戳格式防止重名名
        //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({
    storage: storage
});
//引入token
var token = require("../libs/token.js");




/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//从请求体中获取姓名，并调用封装好的查询函数
router.post('/findUser', async (req, res, next) => {
    let {
        stu_id,
        stu_name,
        stu_gender,
        stu_skill,
        stu_hobby
    } = req.body
    let data = await find(`students`, stu_id ? {
        stu_id
    } : {})
    res.send(data);
});

//从请求体中获取数据，并调用封装好的插入函数
router.post('/insertUser', async (req, res, next) => {
    // console.log(req.body);

    let {
        stu_id,
        stu_name,
        stu_gender,
        stu_skill,
        stu_hobby,
        stu_profile_photo
    } = req.body;

    let stu_id_c = await find(`students`, {
        stu_id
    })
    console.log(stu_id_c);

    if (stu_id_c.length > 0) {
        res.send(`学生id${stu_id}已被注册`);
    } else {
        let data = await insert(`students`, [{
            stu_id,
            stu_name,
            stu_gender,
            stu_skill,
            stu_hobby,
            stu_profile_photo
        }])
        res.send('success');
    }

});

//从请求体中获取stu_id，并调用封装好的删除函数
router.post('/removeUser', async (req, res, next) => {
    // console.log(req.body);

    let {
        stu_id,
    } = req.body;


    let data = await remove(`students`, {
        stu_id: stu_id
    })
    res.send('success');
});

//从请求体中获取数据，并调用封装好的编辑函数
router.post('/editUser', async (req, res, next) => {
    // console.log(req.body);

    let {
        stu_id,
        stu_name,
        stu_gender,
        stu_skill,
        stu_hobby,
        stu_profile_photo
    } = req.body;


    let data = await edit(`students`, {
        stu_id: stu_id
    }, {
        stu_id: stu_id,
        stu_name: stu_name,
        stu_gender: stu_gender,
        stu_skill: stu_skill,
        stu_hobby: stu_hobby,
        stu_profile_photo: stu_profile_photo
    });
    res.send('success');
    console.log('success');

});

//上传图片
router.post('/uploadImg', upload.single('profile_photo'), function (req, res, next) {
    // console.log(req)
    res.json({
      status: "success",
      file: req.file
    });
});

//验证token判断登录状态
router.post('/autologin', async (req, res, next) => {
    console.log(req.headers); 
    var result = token.checkToken(req.headers.token)
    console.log(token.decodeToken(req.headers.token));
    res.send(result);
});

module.exports = router;