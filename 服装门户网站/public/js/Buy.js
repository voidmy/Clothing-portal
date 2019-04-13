$(function () {
    var search = location.search;         //获取URL中?后的句子
    var myparval = search.split("=")[1]; //分割取出id
    $("#BuyGoods").attr('name',myparval)
    $("#BuyGoods").click(function(){//点击购买
        var src = $('#BuyGoods').attr('name')
        window.open("http://10.240.171.177:8080/public/html/payBuy.html?id=" + src + "");
    })
    //var myparval = string.replace(/public/, "..")
    $("#shwopic >img").attr('src', myparval)
    $.ajax({///得到这个商品的所有信息；
        url: '/admin/getimg',
        type: "post",
        data: { 'imgurl': search },

        success: function (result) {
            $("#goodsOne").text(result[0].GoodsDescribleOne)
            $("#goodspric").text("￥"+result[0].Price)
            var threFoure=result[0].GoodsDescribleTwo+'  '+result[0].GoodsDescribleThree
            $("#goodtwo").text(threFoure)
            $("#goods2").text(result[0].GoodsDescribleFive)//商品描叙
        },
        error: function (err) {
            console.log(err);
        }
    });
    $("#secSize").click(function () {
        if ($("#secSize").height() == 120) {
            $("#secSize").animate({'height':'60px'})
        }
        else {
            $("#secSize").animate({ 'height': '120px' })
        }
    })
    $($("td")[0]).css("opacity","1")//商品描叙 op 1
    $("td").mouseover(function(){
        $(this).addClass("addclasstd")
    })
    $("td").mouseleave(function(){
        $(this).removeClass("addclasstd")
    })
    $("td").click(function(){
       $(this).siblings().css("opacity","0.5")
       $(this).css("opacity","1")
       var Myname=$(this).attr("name")
      
       //alert(Myname)
       $('div[name='+Myname+']').show()
       $('div[name='+Myname+']').siblings().hide()
     // console.log( $('div[name='+Myname+']').siblings())
    })
})
