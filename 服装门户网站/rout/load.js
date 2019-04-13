var express=require('express');
var router=express.Router();
//
var moUser=require('../models/user');
var responData;
router.use(function(req,res,next){
    responData={
        code:0,
        message:''
    }
    next();
});
//注册
router.post('/user/register',function(req,res,next){
       // console.log(req.body.name);
        var username=req.body.name
        var userpassword=req.body.password
     
       moUser.findOne({
        username: username
    }).then(function(userinfor){
        if(userinfor){
              
            responData.code=4;
            responData.message="用户名已经被注册了！";
            res.json(responData);
            return ;
        }else{
            var user=new moUser({
                username:username,
                password:userpassword,
                level:3
            })
            user.save() 
            responData.code=1
            responData.message="注册成功"
           res.json(responData);
           return ;
        }
    })
      
})
///登录
router.post('/user/load',function(req,res,next){
    // console.log(req.body.name);
    var username=req.body.name
    var userpassword=req.body.password
 moUser.findOne({
    username:username,
    password:userpassword
 }).then(function(userinfo){
     if(!userinfo){
         responData.code=3
         responData.message="用户名或密码错误！"
         res.json(responData);
         return;
     }else{
        responData.code=10;
        responData.message=userinfo
       // responData.isAdmin=userinfo.isAdmin;
       // console.log(userinfo.isAdmin);
        res.json(responData);
        return;
     }
 })
   
})
module.exports=router;

