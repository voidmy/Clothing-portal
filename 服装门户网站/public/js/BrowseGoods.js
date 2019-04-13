$(function () {
    var NewDiv = $("<div class='DYBrows'><img></div>")
    var $seloption = $("#optionsort")
    $("#GoodsShow").delegate("img", "click", function () {
        var src = $(this).attr('src')
        window.open("http://10.240.171.177:8080/public/html/BuyInterface.html?id=" + src + "");
        //alert(src)
    });
   
    /*for (var i = 0; i < 12; i++) {
        $("#GoodsShow").append("<div class='DYBrows'><img style='width:100%;'></div>")
        addDescribleGoods( $($(".DYBrows >img")[i]),"￥192","女子|绑腿裤","../picture/BrowGoods/01.jpg")
    }*/
    // ajax
    /*$.ajax({
      type: 'post',
      url: '/GoodsDescrible/Goods/save',
      data: { 'name':"12"  },
      dataType: 'json',
      success: function (result) {
          console.log("商品保存成功")
      }
    })*/
    ///
    var search = location.search;         //获取URL中?后的句子
    var string = search.split("=")[1]; //分割取出id
    var myparval = string.replace(/public/, "..")



    $("#headstyle >img").attr('src', myparval)//

    var $sexbox = $("[name=checkbox1]")

    $($sexbox[0]).prop('checked', false)
    $sexbox.click(function () {
        if ($(this).prop('checked')) {
            // console.log($(this).val())
            $(this).siblings().prop('checked', false)
        }
        else {
            console.log("取消" + $(this).val())
        }

    })
    //$($sexbox[0]).removeAttr("checked");


    Getgoods()//得到所有商品


});//

var GoodsAll = 'null'//存得到的数据库数据
var GoodsTWOAll = 'null'
var sortArray = new Array()//排序的数组
var setitem = new Array(4)
for (var i = 0; i < setitem.length; i++) {
    setitem[i] = 'null'
}
$("#reseclectBtn").click(function(){//重置筛选条件
     $(' [type="checkbox"]').prop('checked', false)
     sortArray.splice(0, sortArray.length)//清空数组
     RemoveChildDom($("#GoodsShow"))//移除原有dom
     test(GoodsAll)//重新添加
})
$('[name="checkbox1"]').click(function () {//判断男女

    //alert(this.checked?"勾上了":"取消了勾选")
    if (this.checked) {
        setitem[0] = $(this).val()
        // console.log(setitem)
        // RemoveChildDom($("#GoodsShow"))//移除原有dom
        var k = 0;//插入图片是第几个
        // alert($(this).val())
        var sextab = $(this).val()
        var len = GoodsAll.length
        /*for (i = 0; i < len; i++) {
            if (GoodsAll[i].BoyOrGirl == sextab) {
                // console.log(GoodsAll[i])

               // addonetest(GoodsAll[i], k)//添加一个
                k++;
            }
        }*/
    }
    else {
        // delArray(setitem,$(this).val())
        setitem[0] = 'null'
        console.log(setitem)
    }

})
//删除数组函数
function delArray(obj, key) {
    var index = $.inArray(key, obj);

    //删除

    obj.splice(index, 1);
    console.log(setitem)
}
///
$('[name="checkbox2"]').click(function () {
    if (this.checked) {
        //setitem.push($(this).val())
        setitem[1] = $(this).val()
        $(this).siblings().prop('checked', false)
        //console.log(setitem)
    }
    else {
        // delArray(setitem, $(this).val())
        setitem[1] = 'null'
        console.log(setitem)
    }
})
$('[name="checkbox3"]').click(function () {
    if (this.checked) {
        setitem[2] = ($(this).val())
        console.log(setitem)
        $(this).siblings().prop('checked', false)
    }
    else {
        setitem[2] = 'null'
        console.log(setitem)
    }
})
$('[name="checkbox4"]').click(function () {
    if (this.checked) {
        setitem[3] = ($(this).val())
        //  console.log(setitem)
        // alert($(this).val())
        $(this).siblings().prop('checked', false)
    }
    else {
        setitem[3] = 'null'
        console.log(setitem)
    }
})
////

$(' [type="checkbox"]').click(function () {//得到点击然后重新计算
    sortArray.splice(0, sortArray.length)//清空数组
    RemoveChildDom($("#GoodsShow"))
    var k = 0;
    var Seclen = setitem.length;//选择的条件
    var Allgoodsleng = GoodsTWOAll.length;//所有商品的个数
    var key = 0;
    for (var SI = 0; SI < Allgoodsleng; SI++) {

        if (setitem[0] != 'null') {
            if (GoodsTWOAll[SI].BoyOrGirl == setitem[0]) {

            } else {
                continue;
            }
        }
        if (setitem[1] != 'null') {
            if (GoodsTWOAll[SI].GoodsDescribleFoue == setitem[1]) {

            } else {
                continue;
            }
        }
        if (setitem[2] != 'null') {
            if (GoodsTWOAll[SI].GoodsDescribleOne == setitem[2]) {

            } else {
                continue;
            }
        }
        if (setitem[3] != 'null') {
            if (GoodsTWOAll[SI].Brand == setitem[3]) {

            } else {
                continue;
            }
        }
        // console.log(GoodsTWOAll[SI])
        addonetest(GoodsTWOAll[SI], k)
        sortArray.push(GoodsTWOAll[SI])
        k++;
    }
})
//排序方式
$("#optionsort").on("change", function () {
    var Sortstyle = $("#optionsort").val()
    //alert(Sortstyle)
    //console.log(GoodsAll)
    if (Sortstyle == 'priceHL') {//价格从高到低

        if (sortArray.length == 0) {

            arr = GoodsAll.sort(compareLH("Price"));//排序  降
            RemoveChildDom($("#GoodsShow"))//移除原有dom
            test(arr)//重新添加
        } else {
            arr = sortArray.sort(compareLH("Price"));//排序  降
            RemoveChildDom($("#GoodsShow"))//移除原有dom
            test(arr)//重新添加
        }
    }
    else if (Sortstyle == 'priceLH') {
        if (sortArray.length == 0) {
            arr = GoodsAll.sort(compareHL("Price"));//排序  升
            RemoveChildDom($("#GoodsShow"))//移除原有dom
            test(arr)//重新添加
        } else {
            arr = sortArray.sort(compareHL("Price"));//排序  升
            RemoveChildDom($("#GoodsShow"))//移除原有dom
            test(arr)//重新添加
        }

    }



    /////////////////

})
///排序hans
//对数组进行排序/降序
function compareLH(property) {
    return (firstobj, secondobj) => {
        const firstValue = firstobj[property];
        const secondValue = secondobj[property];
        return secondValue - firstValue; //降序
    };
}
//  升序
function compareHL(property) {
    return (firstobj, secondobj) => {
        const firstValue = firstobj[property];
        const secondValue = secondobj[property];
        return firstValue - secondValue; //升序
    };
}
//清除所有 show中dom
function RemoveChildDom(obj) {
    obj.children().remove()
}
//得到所有商品
function Getgoods() {
    $.ajax({
        type: 'post',
        url: '/GoodsDescrible/Goods/Getdoods',
        data: { 'name': "12" },
        dataType: 'json',
        success: function (result) {
            //  console.log("查找成功")
            //  console.log(result)
            GoodsAll = result
            GoodsTWOAll = result
            test(result)
        }
    })
}
///添加信息
function addDescribleGoods(obj, pirice, desc, src) {
    obj.attr("src", src)
    obj.after('<p">*****</p>');
    obj.after('<p style=" margin-bottom: 1%;">' + desc + '</p>');
    obj.after('<p>￥' + pirice + '</p>');
}

//添加图片
function test(GoodsArr) {
    //var rest=GoodsArr[i].GoodsId//商品id

    var len = GoodsArr.length

    for (var i = 0; i < len; i++) {
        var src = GoodsArr[i].PicuUrl
        var Price = GoodsArr[i].Price
        var sex = GoodsArr[i].BoyOrGirl
        var descr = GoodsArr[i].GoodsDescribleOne
        var alldesc = sex + '子' + '|' + descr
        $("#GoodsShow").append("<div class='DYBrows'><img style='width:100%;'></div>")
        addDescribleGoods($($(".DYBrows >img")[i]), Price, alldesc, src)//添加信息
    }
}
function addonetest(GoodsArr, i) {//添加一个的时候
    var src = GoodsArr.PicuUrl
    var Price = GoodsArr.Price
    var sex = GoodsArr.BoyOrGirl
    var descr = GoodsArr.GoodsDescribleOne
    var alldesc = sex + '子' + '|' + descr
    $("#GoodsShow").append("<div class='DYBrows'><img style='width:100%;'></div>")
    addDescribleGoods($($(".DYBrows >img")[i]), Price, alldesc, src)//添加信息
}