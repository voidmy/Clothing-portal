var mongoose=require('mongoose');
var userSchema=require('../sch/user');
module.exports=mongoose.model('User',userSchema);