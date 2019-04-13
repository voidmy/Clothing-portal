var express=require('_express@4.16.4@express');

var app=express();
var  fs=require("fs");
var html=fs.readFileSync("index.html");
///////
// var mongoose= require('mongoose');
// var url = "mongodb://localhost:27017/runob";
///body-parser处理post提交的数据
var  bodyParser=require('body-parser');
app.use('/public',express.static(__dirname+'/public'));
//app.use(express.static('public'));
 
app.get('/', function (req, res) {
   res.send(html);
})
///bodyparser 设置//处理请求
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));;
 app.use('/api',require('./rout/api'));//分模块开发
 app.use('/bodapi',require('./rout/bodapi'));*/

 

var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
require('./public/chat.js')
// mongoose.connect(url,function(err){
//   if(err){
//     console.log("数据库链接失败！！！")
//   }
//   else{
//     console.log("数据库链接成功！")
//     ///这里监听端口好点
//   }
// });