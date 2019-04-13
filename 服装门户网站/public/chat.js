
var ws = require('nodejs-websocket')
var server = ws.createServer(function (conn) {

    console.log("new connection")
    conn.on('text', function (str) {
        var data = JSON.parse(str)
        if (data.name == 'li') {
            conn.name = 'li';
            conn.mytar = data.mytar;
        }
        else{
            conn.name = data.name;
            conn.mytar = data.mytar;
        }
        console.log(data)
        broadcast(data, conn)
    })
    conn.on('error', function (err) {
        console.log(err)

    })
}).listen(80)
function broadcast(str, myse) {
   
    if (myse.mytar == '111') { console.log("客服已登录"); }
    else if(myse.mytar=='no'){
        server.connections.forEach(function (conn) {
            //  console.log(conn)
            if (conn.name == 'li')//||myse.name=='li'
            {
                var tex = str.name + ':' + str.text;
                conn.sendText(tex)
            }

        })     
    }
    else {
       
        server.connections.forEach(function (conn) {
            //  console.log(conn)
            if (conn.name == myse.mytar)//||myse.name=='li'
            {
                var tex = str.name + ':' + str.text;
                conn.sendText(tex)
            }

        })     
    }
}

//     var btn=document.getElementById("one")
//      btn.onclick=function(){
//      alert(222)
//    }
