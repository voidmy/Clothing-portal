var mongoose=require('mongoose');
var userSchema=require('../sch/GoodsClass');
module.exports=mongoose.model('GoodsClass',userSchema);