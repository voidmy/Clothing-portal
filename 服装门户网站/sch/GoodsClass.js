var mongoose=require('mongoose');
 module.exports=new mongoose.Schema({
    ///
   GoodsId:String,
   PicuUrl:String,
   Brand:String,//品牌
   BoyOrGirl:String,
   Price:String,//价格
   GoodsDescribleOne:String,//上衣 长裤 T 
   GoodsDescribleTwo:String,//运动
   GoodsDescribleThree:String,//儿童
   GoodsDescribleFoue:String,//鞋  配件 袜子
   GoodsDescribleFive:String//上架描叙
  // level:Number
});