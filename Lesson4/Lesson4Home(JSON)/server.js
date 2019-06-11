var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [];

var fs = require('fs');

function WriteInJSON(data,name){
     var MyMSG = {name: name, MSG: data};
     var myJSON = JSON.stringify(MyMSG);
     fs.appendFileSync("Data.json", myJSON + '\n');
}



//var textFromFile = fs.readFileSync("Data.txt").toString();

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(3000);

io.on('connection', function (socket) {
    for(var i in messages) {
      io.sockets.emit("display message", messages[i]);
    }

    socket.on("send message", function (data,name) {
        messages.push(data);
        WriteInJSON(data,name);
        io.sockets.emit("display message", data);
    });
 });

 