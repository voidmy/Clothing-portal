(function () {
    var kefukey = 0//定义点击几次客服
    var YorNload = 0;
    $("#CouSer").on('click', function () {

        if (kefukey == 0||YorNload==1) {
            chatstar()
        }
        kefukey++;
  if( YorNload==0){
        $("#chatdiv").toggle(500)
  }

    })

    ///shist+alt+f 快捷整理代码
    var loadbtn = document.getElementById('Surname')
    var Sname = document.getElementById("setname")
    var Sbtn = document.getElementById("send")
    var Scon = document.getElementById("contxt")
    var SDcon = document.getElementsByClassName("charcon")[0]
    var Sitemname = document.getElementsByClassName("charname")[0]
    var tar = '';//鼠标获取的对象
    $(".charname").delegate('div', "click", function (even) {
        var target = $(even.target)
        tar = even.target
        target.css("background", "gray");
        // console.log(even)
        // alert(target.attr('nickname'))
        // addnewUsercon(1,2)
        SwHS(target, even.target)


    })
    //切换显示隐藏
    function SwHS(target, sindex) {
        var ncon = $(".nackcon")//聊天内容
        var nnam = $(".nackname")//名字
        $.each(nnam, function (index, item) {

            if (item == sindex) {

                ncon.hide()
                $(ncon[index]).show()
            }
        })
        $(".charname>div").css("opacity", "0.5")
        target.css("opacity", "1");
    }
    ///
    // loadbtn.onclick =
    function chatstar() {
        //var myname = Sname.value
        var myname=$.cookie('name')
       var level = $.cookie('level')
        console.log(myname)
        //var myname = Sname.value///
        // $.cookie('level')

        if (level== undefined||level=='null') { YorNload = 1; alert("请登录"); return 1; }//;
        /* */
        else if (level == 2) {
            //是客服登录的时候
            myname='li'
            YorNload = 0
            var ws = new WebSocket("ws://10.240.171.177:80");
            ws.onopen = function () {
                ws.send(JSON.stringify({
                    name: myname,
                    text: "kefu",
                    mytar: "111"
                }))
                Sbtn.onclick = function () {
                    if (tar == '') {
                        alert("请选择顾客！！！")
                    }
                    else {
                        var txt = Scon.value;
                        var Allcon = $(".nackcon")
                        $.each(Allcon, function (index, item) {//找到目标内容框 添加自己的话
                            if ($(item).attr("nickname") == tar.innerHTML) {
                                addstyle(myname, txt, item, '')

                            }
                        })

                        ws.send(JSON.stringify({
                            name: myname,
                            text: txt,
                            mytar: tar.innerHTML

                        }))
                    }
                }
                ws.onmessage = function (e) {//接受信息
                    var mcon = document.createElement("p");
                    mcon.innerHTML = e.data;
                    var sename = e.data.split(":")
                    var Allcon = document.getElementsByClassName('nackcon');
                    //console.log(Allcon)
                    var key = 0//判断是否是新用户
                    $.each(Allcon, function (index, item) {
                        if ($(item).attr("nickname") == sename[0]) {
                            key = 1;
                            //添加聊天样式
                            addstyle(sename[0], sename[1], item, 'left')

                        }
                        if (tar.innerHTML == sename[0]) {

                        }
                        else if (tar != '') {
                            var Lightnackname = $(".nackname")//让收到消息的人亮
                            $.each(Lightnackname, function (index, item) {
                                if ($(item).attr("nickname") == sename[0]) {
                                    $(item).css("background", "red")
                                }
                            })
                        }
                    })
                    if (key == 0) {
                        addnewUser(sename[0], e.data)
                    }

                }
            }
        }
        else if (level != 2) {
            //顾客登录的时候
            YorNload = 0
            $(Sitemname).hide()//隐藏聊天名框
            var ws = new WebSocket("ws://10.240.171.177:80");
            ws.onopen = function () {
                Sbtn.onclick = function () {
                    var txt = Scon.value;
                    ws.send(JSON.stringify({
                        name: myname,
                        text: txt,
                        mytar: "no"
                    }))
                    addCustomer(myname, txt)
                }
                ws.onmessage = function (e) {
                    var mcon = document.createElement("p");
                    mcon.innerHTML = e.data;
                    var sename = e.data.split(":")
                    addCustomer(sename[0], sename[1])

                }
            }

        }
        //////////////
        function addCustomer(name, text) {//顾客给自己添加聊天内容
            // var SDcon = document.getElementsByClassName("charcon")[0]

            if (name == 'li') {//收到消息添加
                addstyle(name, text, SDcon, 'left')
            }
            ///自己发送添加
            else { addstyle(name, text, SDcon, '') }

            //SDcon.innerHTML+=txt
        }
        function addnewUser(name, text) {//添加聊天名框
            var newman = document.createElement("div")
            newman.innerHTML = name
            newman.setAttribute("nickname", name);
            newman.className = "nackname";
            Sitemname.appendChild(newman)
            addnewUsercon(name, text)
        }
        ////聊天样式
        function addstyle(name, txt, tar, dirc) {
            slen = function (str) {
                if (str == null) return 0;
                if (typeof str != "string") {
                    str += "";
                }
                return str.replace(/[^\x00-\xff]/g, "01").length;
            }
            var Len = slen(txt)
            var pcalss = 'Pchatstyle'
            var dclass = 'chatstyle'
            if (dirc == 'left') {//改变方向
                pcalss = 'Pchatstyle2'
                dclass = 'chatstyle2'
            }

            $(tar).append("<p class=" + pcalss + ">" + name + "</p>")
            $(tar).append("<div class=" + dclass + ">" + txt + "</div>")
            ////浮动添加换行
            for (i = 0; i < Len / 15; i++) {
                $(tar).append($('<br/>'))
            }
        }
        ///添加聊天内容框
        function addnewUsercon(name, text) {
            //SDcon
            var newcon = document.createElement("div")
            newcon.className = "nackcon"
            newcon.setAttribute("nickname", name);
            //newcon.innerHTML = text
            SDcon.appendChild(newcon)
            //第一次连入添加聊天内容
            var sename = text.split(":")
            addstyle(sename[0], sename[1], $(newcon), 'left')
        }
    }

    ///cokiet

    if ($.cookie('code') == "null" || $.cookie('code') == undefined) {//load
        // console.log($.cookie('code'))


    }
    else {
        $("#load").hide()

        $("#reload").show()
       if($.cookie('level')==3) {//shoppcar  helpinformation  shelesGoods
             $("#shoppcar").hide()
             $("#helpinformation").hide()
             $("#shelesGoods").show()
       }
        /////聊天

        //////
    }
    $("#reload").click(function () {

        $.cookie('code', "null")
        $.cookie('level',"null")
        $.cookie('name',"null")
        // alert($.cookie('code'))
        $("#reload").hide()
        $("#load").show()
        location.reload();
    })
    ///
}())



