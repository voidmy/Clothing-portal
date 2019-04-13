var key = 1
var $switchPic = $("#switchpicu>img")
$switchPic.click(function () {
   var mypath = $(this).attr('src')
   testopen(mypath)
})

var mytimer
mytimer = setInterval(() => {
   // z-index: ;
   $($switchPic[key]).show()
   $($switchPic[key]).siblings().hide()//.css('z-index' ,'0')
   key++
   if (key == 3) { key = 0; }
   console.log(key)
}, 2000)
$("#switchpicu").mouseover(function () {
   clearInterval(mytimer)
}).mouseout(function () {
   mytimer = setInterval(() => {//轮播图
      // z-index: ;
      $($switchPic[key]).show()
      $($switchPic[key]).siblings().hide()//.css('z-index' ,'0')
      key++
      if (key == 3) { key = 0; }
      console.log(key)
   }, 2000)
});
  $("#sheles").click(function(){//进入管理员level=3 界面
   var myval = window.open("http://10.240.171.177:8080/public/html/administrator.html");
  })
function testopen(val) {
   var myval = window.open("http://10.240.171.177:8080/public/html/BrowseGoods.html?id=" + val + "");//?加图片路径
}
