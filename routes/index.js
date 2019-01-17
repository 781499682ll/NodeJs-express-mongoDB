var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// 获取新闻的
router.get('/news', async (req, res, next) => {
  let getNews = () => {
    return new Promise((resolve, reject) => {
      request('https://m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw&as=A155CC63FD33F34&cp=5C3DB35F23540E1&min_behot_time=0&_signature=-zWAVgAApxIVc98deVez-.s1gE&i=', (err, response, body) => {
        resolve(body)
      })
    })
  }
  let data = await getNews();
  res.send({
    status: 1,
    data:JSON.parse(data).data
  });
});

module.exports = router;
