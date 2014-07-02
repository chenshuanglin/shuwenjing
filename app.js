var fs = require('fs')
    , http = require('http')
    , express = require("express")
    , ejs = require('ejs')
    , path = require('path')
    , socketio = require('socket.io');

//创建一个静态网页服务器,用来加载网页资源 
app = express();
app.use(express.static(__dirname+'/'));


var server = http.createServer(app,function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(8080, function() {
    console.log('Listening at: http://localhost:8080');
});
 
socketio.listen(server).on('connection', function (socket) {
    socket.on('message', function (msg) {
  		//把消息广播出去
      socket.broadcast.emit('message', msg);
    });
});

