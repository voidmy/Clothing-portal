///好像
$("#surechoose").click(function () {
     var $secImgSize= $("#chooseImgSize").val()
    if($secImgSize==null){
        // alert("请选择图片大小")
        return ;
    }
   // $(".files1")[0]
   
   var myobj=$("#showimg")
   console.log($secImgSize)
   console.log(myobj.prop('width'))

})
//检查样式
function checkstyle(imgObg,sizeObj){
     //imgObg= $("#showimg")
    // sizeObj= $("#chooseImgSize").val()
    var mysizeHeight=imgObg.prop('height')
    var mysizeWidth=imgObg.prop('width')
    var cheheight=sizeObj.split('|')[1]//选择的高
    var chewidth=sizeObj.split('|')[0]
   // console.log(mysizeHeight)
    //console.log(mysizeWidth)
   // console.log(cheheight)
//console.log(chewidth)
   if(mysizeHeight==cheheight&&mysizeWidth==chewidth)
   {
        return 1;
   }
   else{
        return 2

   }
}
////
var _URL = window.URL || window.webkitURL;
$(".files1").on("change",function(e){
   
   // alert("开始")
    var e = e || window.event;
    var files = e.target.files;
    var file = files[0];
    //////显示图片
    var myurl=URL.createObjectURL(file)
   $("#showimg").attr('src',myurl)
   
   ///调用检查样式函数 显示图片   选择的大小
   //checkstyle($("#showimg").attr('src',myurl), $("#chooseImgSize").val())
 

   // console.log($(file).attr('height'))
   //文件上传
   $(".uploadBtn").off("click").on("click",function(){
// 
   var IMgSIezkey=checkstyle($("#showimg"), $("#chooseImgSize").val())//判断大小函数
   if(IMgSIezkey==1){
        if($("#showimg").prop('width')==230){
           //$("#imgshowDiv").css('margin-left','20%') style="margin-left:20%;"
           $("#imgshowDiv").attr('margin-left','20%')
        }
       // console.log("yes")
   }
   else{
      alert("选择图片大小错误 请重新选择")
      return ;
   }

 //  判断各个选择是否错误

 ///
       var username = $('.username').val();
        var chooseBrandSeries=$("#chooseBrandSeries").val()
        var chooseSex=$("#chooseSex").val()
        var Price=$("#Price").val()
        var GoodsDescribleOne=$("#GoodsDescribleOne").val()
        var GoodsDescribleTwo=$("#GoodsDescribleTwo").val()
        var GoodsDescribleThree=$("#GoodsDescribleThree").val()
        var GoodsDescribleFoue=$("#GoodsDescribleFoue").val()
        var GoodsDescribleFive=$("#GoodsDescribleFive").val()
        var formData = new FormData();
        
        formData.append('files1',file);
        //formData.append('username',username);//sec
        formData.append('chooseBrandSeries',chooseBrandSeries)//品牌系列
        formData.append('chooseSex',chooseSex)//性别
        formData.append('Price',Price)//价格
        formData.append('GoodsDescribleOne',GoodsDescribleOne)//GoodsDescribleOne
        formData.append('GoodsDescribleTwo',GoodsDescribleTwo)//GoodsDescribleTwo
        formData.append('GoodsDescribleThree',GoodsDescribleThree)//GoodsDescribleThree
        formData.append('GoodsDescribleFoue',GoodsDescribleFoue)//GoodsDescribleFoue
        formData.append('GoodsDescribleFive',GoodsDescribleFive)//GoodsDescribleFive
        console.log(file);
        $.ajax({
            url: '/admin/saveimg',
             type: "post",
             data:formData,
             contentType: false,//使用multer配合ajax时无需配置multipart/form-data，multer将自动配置，手动配置将报错，boundary not found
             processData: false,
             success: function(res){
                 var str=res.img
                 var pathaArr=str.split('\\')
                 console.log(pathaArr[1])
                $("#showimg").attr('src','../public/picture/BrowGoods/'+pathaArr[6]+'')
                  console.log(res.img);
             },
             error:function(err){
                  console.log(err);
             }
      });
  })
})






