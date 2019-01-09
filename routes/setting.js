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
        stu_hobby
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
            stu_hobby
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
        stu_hobby
    } = req.body;


    let data = await edit(`students`, {
        stu_id: stu_id
    }, {
        stu_id: stu_id,
        stu_name: stu_name,
        stu_gender: stu_gender,
        stu_skill: stu_skill,
        stu_hobby: stu_hobby
    });
    res.send('success');
    console.log('success');

});


//从请求体中获取姓名，并调用封装好的搜索函数
router.post('/findUser', async (req, res, next) => {
    let {
        stu_id,
        stu_name,
        stu_gender,
        stu_skill,
        stu_hobby
    } = req.body
    let data = await find(`students`, stu_id ? {
        stu_id,
        stu_name,
        stu_gender,
        stu_skill,
        stu_hobby
    } : {})
    res.send(data);
});

module.exports = router;