var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
userNumber = 1;
app.post('/users', function (req, res) {
  res.json({id: userNumber++});
})


module.require('./socketServerInterface.js');


