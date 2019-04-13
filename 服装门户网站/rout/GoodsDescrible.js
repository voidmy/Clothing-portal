var express=require('express');
var router=express.Router();
//
var MoGoods=require('../models/GoodsClass');
var responData;
router.use(function(req,res,next){
    responData={
        code:0,
        message:''
    }
    next();
});
///
router.post('/Goods/save',function(req,res,next){//Goods/Getdoods
    // console.log(req.body.name);
    var mygoods=new MoGoods({
        GoodsId:"ID2019/4/9|4",
        PicuUrl:"../picture/BrowGoods/04.jpg",
        Brand:"no",//品牌
        BoyOrGirl:"男",
        Price:"280",//价格
        GoodsDescribleOne:"上衣",//上衣 长裤 T 紧身裤
        GoodsDescribleTwo:"no",//运动
        GoodsDescribleThree:"no",//儿童
        GoodsDescribleFoue:"no"//鞋  配件 袜子
    })
    mygoods.save()
    
    responData.code=21
    responData.message="商品保存成功"
   res.json(responData);
})
///获得商品
router.post('/Goods/Getdoods',function(req,res,next){
   
    MoGoods.find({}).then(function(goodsinfro){
        //console.log(goodsinfro);
        res.json(goodsinfro);
    })
  //  console.log(Allgoods)
    responData.code=
    responData.message="商品保存成功"
   //res.json(responData);
})
module.exports=router;