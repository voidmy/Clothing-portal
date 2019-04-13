$(function () {
    var $btn = $("#LoadAndRegis >li")
    var $btn2 = $("#LoadAndRegis2 >li")
    var $input = $("[name='RegisIpu']")//注册的input loadIpu
    var $loadinput = $("[name='loadIpu']")//登录的input
    $($btn2[0]).hide()//有bug 不隐藏会触发事件
    $($btn2[1]).hide()
    ///去注册界面
    $($btn[1]).click(function () {
        $($btn2[1]).addClass("active")
        $($btn2[0]).removeClass("active")
        $($btn[0]).removeClass("active")
        $($btn2[0]).show()
        $($btn2[1]).show()
        // $($btn[1]).removeClass("active").hide()
        //$($btn2[0])
        $("#loadview").animate({ width: '0px', opacity: 0 }, "slow")
        $("#bgopacity").animate({ width: '0px', opacity: 0 }, "slow", function () {
            console.log(1)
            $("#bgopacity").animate({ width: '30%', opacity: 0.8 }, "slow")
            // $("#loadview2").show()
            $("#loadview2").animate({ width: '30%', opacity: 1 }, "slow")
            $($btn[0]).hide()
            $($btn[1]).hide()
            // $("#loadview2").animate({width:'30%',  display:'block' },"slow")
        })
        return false;
    })
    //返回登录界面
    $($btn2[0]).click(function () {
        $('#warningLight').animate({ opacity: 0 })
        $($btn[0]).show()
        $($btn[1]).show()
        $($btn[1]).removeClass("active")
        $($btn[0]).addClass("active")
        $($btn2[1]).removeClass("active")
        $("#loadview2").animate({ width: '0%', opacity: 0 }, "slow")
        $("#bgopacity").animate({ width: '0%', opacity: 0 }, "slow", function () {

            $("#bgopacity").animate({ width: '30%', opacity: 0.8 }, "slow")
            $("#loadview").animate({ width: '30%', opacity: 1 }, "slow")
            $($btn2[0]).hide()
            $($btn2[1]).hide()
        })

        return false;
    })


    //0

    $($input[0]).keydown(function (event) {


        if ($($input[0]).val().length < 3 || $($input[0]).val().length > 10) {
            $($input[0]).css("border-color", "#ff0000");
        }
        else {
            $($input[0]).css("border-color", "");
        }
    })
    //1
    $($input[1]).keydown(function (event) {

        if ($($input[1]).val().length < 6 || $($input[1]).val().length > 12) {
            $($input[1]).css("border-color", "#ff0000");
        }
        else {
            $($input[1]).css("border-color", "");
        }
    });



    function index() {
        $('#warningLight').css('color', 'red');  //默认值
        setTimeout("$('#warningLight').animate({ opacity: 0 })", 50);//第一次闪烁

        setTimeout("$('#warningLight').animate({ opacity: 1 })", 100);  //第二次闪烁

    };


    //点击注册
    $($btn2[1]).click(function () {
        var liintre = window.setInterval(index, 300)
        if ($($input[0]).val().length < 3 || $($input[0]).val().length >15) {
            $('#warningLight').text("昵称应在4-15长度内！")
            // setTimeout(clearInterval(liintre), 4000); 
        }
        else if ($($input[1]).val().length < 6 || $($input[1]).val().length > 12) {
            $('#warningLight').text("密码长度应在7-12字符内！")
            /*var myReg = /^[\u4e00-\u9fa5]+$/
            if (myReg.test($($input[1]).val())) {
                $('#warningLight').text("密码不能为！")
                } else {
               
                }*/
        }
        else if ($($input[1]).val() != $($input[2]).val()) {
            $('#warningLight').text("两次密码不一致 请重新输入！")
            $($input[1]).val("")
            $($input[2]).val("")
        }
        else {
            $('#warningLight').animate({ opacity: 0 })
            clearInterval(liintre)
            ///
            $.ajax({
                type: 'post',
                url: '/load/user/register',
                data: { 'name': $($input[0]).val(), 'password': $($input[1]).val() },
                dataType: 'json',
                success: function (result) {
                    if (result.code == 4) {
                        alert(result.message)
                    }
                    if (result.code == 1) {
                        alert("注册成功 请返回登录")
                    }
                }

            })
        }
        setTimeout(function () { clearInterval(liintre) }, 3000);
        /**/
    })
    //点击登录
    $($btn[0]).click(function () {
        $.ajax({
            type: 'post',
            url: '/load/user/load',
            data: { 'name': $($loadinput[0]).val(), 'password': $($loadinput[1]).val() },
            dataType: 'json',
            success: function (result) {
                if (result.code == 3) {//登录失败
                    alert(result.message)
                    $($loadinput[1]).val("")

                }
                else if (result.code == 10) {
                    alert("登录成功")
                    //alert(result.message.level)
                    $.cookie('code', "li", { path: '/' }); 
                    $.cookie('level',result.message.level , { path: '/' });
                    $.cookie('name',result.message.username , { path: '/' });
                  //alert($.cookie('code')) 
                  
                    window.parent.opener.location.reload();
                    window.close();
                }

            }

        })

    })
})
