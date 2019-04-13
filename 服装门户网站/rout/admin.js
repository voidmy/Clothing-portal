///
var multer = require('multer');
/**
 * process.cwd()获取项目根目录地址，可以将上传的文件指定到静态文件目录下，然后再返回地址给前端页面，如：
 * var uploadPath = process.cwd()+'/public/uploads' 前端访问地址 http://localhost:3000/uploads/文件名
 **/
var uploadPath = process.cwd() + '/public/picture/BrowGoods';//直接存放在根目录下uploads
var storage = multer.diskStorage({//multer存储引擎  存储引擎自定义引用 https://github.com/expressjs/multer/blob/master/StorageEngine.md
    destination: uploadPath,//指定上传文件的路径
    filename: function (req, file, cb) { cb(null, file.fieldname + '-' + Date.now()) }
}) //命名上传文件
var multer = multer({
    storage: storage
    //limits：''//Limits of the uploaded data
}).single('files1');//single 单文件上传，files1为form表单中 接受文件的name字段名称
///
var express = require('express');

var router = express.Router();
var MoGoods = require('../models/GoodsClass');
var fs = require("fs");
var html = fs.readFileSync("administrator.html");
var responData;
router.use(function (req, res, next) {
    responData = {
        code: 0,
        message: ''
    }
    next();
});
router.get('/send', function (req, res, next) {
    // console.log(req.headers.cookie)
    var cookie = req.headers.cookie
    var mycook = cookie.toString().split(";")[1].split("=")[1]//得到登录的等级
    if (mycook == 3) {
        res.write(html);
    } else {
        res.send("非管理员禁止进入后台！")
    }

})
//保存图片
router.post('/saveimg', function (req, res, next) {

    multer(req, res, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        /**
         *      GoodsId:String,
                PicuUrl:String,
                Brand:String,//品牌
                BoyOrGirl:String,
                Price:String,//价格
                GoodsDescribleOne:String,//上衣 长裤 T 
                GoodsDescribleTwo:String,//运动
                GoodsDescribleThree:String,//儿童
                GoodsDescribleFoue:String//鞋  配件 袜子
         */
        console.log(req.body.chooseBrandSeries);
        console.log(req.body.chooseSex)//chooseSex
        console.log(req.body.Price)
        console.log(req.body.GoodsDescribleOne)
        console.log(req.body.GoodsDescribleTwo)
        console.log(req.body.GoodsDescribleThree)
        console.log(req.body.GoodsDescribleFoue)
        console.log(req.body.GoodsDescribleFive)

        //console.log(req.body.username);//获取通过formData中表单的字段 name="username"的数据
        /*req.body ajax提交的非文件数据
        //req.body.username //提交参数 username
        //req.file.fieldname 上传文件 input file  name字段名称
        //req.file.filename 上传文件 文件名
        //req.file.originalname 上传文件 文件名
        //req.file.mimetype 上传文件类型
        //req.file.size 上传文件大小
        //req.file.destination 上传文件存在的路径
        req.file.path 上传文件的 路径*/
        console.log(req.file.path);
        /**
             
            * 可以通过req.file中的参数，做一个文件上传的过滤，例如req.file.size 限制文件上传大小，req.file.mimetype 限制文件上传的类型      
            **/

        var mygoods = new MoGoods({
            GoodsId: 'ID+' + Date.now() + '',
            PicuUrl: '../picture/BrowGoods/' + req.file.filename + '',
            Brand: req.body.chooseBrandSeries,//品牌
            BoyOrGirl:req.body.chooseSex,
            Price:req.body.Price,//价格
            GoodsDescribleOne: req.body.GoodsDescribleOne,//上衣 长裤 T 紧身裤
            GoodsDescribleTwo:req.body.GoodsDescribleTwo,//运动
            GoodsDescribleThree:req.body.GoodsDescribleThree,//儿童
            GoodsDescribleFoue:req.body.GoodsDescribleFoue,//鞋  配件 袜子
            GoodsDescribleFive: req.body.GoodsDescribleFive   //上架描叙
        })
        mygoods.save()
        console.log(req.file.filename)
        //console.log(req.file.filename)
        res.send({ msg: '上传成功', img: req.file.path });//返回数据到前端页面，可以将上传的图片，在前端预览。
    })
})

router.post('/getimg', function (req, res, next) {
     var url= req.body.imgurl
     var sachurl=url.split("=")[1]
     MoGoods.find({
         PicuUrl:sachurl
     }).then(function(goodsinfo){
        res.json(goodsinfo);
        return ;
     })
            //res.send("dsad")
})
module.exports = router;