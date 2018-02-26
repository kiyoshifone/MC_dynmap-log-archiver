function msggetter() {
  return new Promise( function( resolve ){
    let http = require('http');
    const URL = 'http://xxxxxxxx.xxx:xxxx/up/world/xxxxx/';
    http.get(URL, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
          body += chunk;
      });
      res.on('end', (res) => {
        res = JSON.parse(body);
        var updates = res["updates"];
        var njl = updates.filter(function(item, index){
          if ((item.type=="chat")||(item.type=="playerjoin")||(item.type=="playerquit")) return true;
        });
        var tmpA = new Array();
        for (var i=0; i<njl.length; i++) {
          var D = new Date(njl[i].timestamp);
          var y = D.getFullYear();
          var n = ( '0'+(D.getMonth()+1) ).slice(-2);
          var d = ( '0'+D.getDate() ).slice(-2);
          var h = ( '0'+D.getHours() ).slice(-2);
          var m = ( '0'+D.getMinutes() ).slice(-2);
          var s = ( '0'+D.getSeconds() ).slice(-2);
          var tstmp = y+"/"+n+"/"+d+"-"+h+":"+m+":"+s;
          var pname = njl[i].playerName;
          if (njl[i].type == "chat") {
            var messg = njl[i].message;
            tmpA.push(tstmp+" <"+pname+"> "+messg);
          } else if ((njl[i].type=="playerjoin")||(njl[i].type=="playerquit")) {
            var linfo = njl[i].type;
            tmpA.push(tstmp+" "+pname+" "+linfo.slice(6)+"ed the game");
          }
        }
        console.log(njl);
        resolve( tmpA );
      });
    }).on('error', (e) => { });
  });
}

var n = null;
setInterval(function() {
  msggetter().then( function(A){
    var k = 0;
    k = A.lastIndexOf(n);   // 前回の最終行nは今配列Aのどの位置にあるか
//     console.log("k " + k);
//     console.log("n " + n);  // n
//     console.log("");
//     console.log(A);
    if (k !== -1) {              // 前回の最終行が配列にあれば
      A = A.slice(k+1,A.length);  // 配列を加工
    }
//     console.log(A);
    
    if (A.length > 0) {
      for (var i=0; i<A.length; i++) {
        console.log(i + " " + A[i]);
//         console.log(A);
      }
      n = A.slice(A.length-1,A.length).toString();  // 今回の最終行
    } else {
//       console.log("no new");
    }
//     console.log("");
//     console.log("l " + n);
//     console.log("********");
  });
}, 10000);
