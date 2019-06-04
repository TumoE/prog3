//console.log("Eduard Sukhudyan");  

// var os = require("os");
// var message = "the Platform is ";

// function main(){
//     console.log(message + os.platform());
// }
// main();

var express = require("express");
var app = express();

app.get("/",function(req, res){
    res.send("First Page");
});

/*app.get("/:name", function(req,res){
    var name = req.params.name;
    res.send("<h1>"+ name +"</h1>");
    console.log(req.params);
});*/

app.use(express.static("http://google.com/"));

app.get("/:name", function(req,res){
    var name = req.params.name;
    res.redirect('http://google.com/search?q='+name);
});

app.get("/*", function(req,res){
    res.send('<h1> 404 Error </h1>');
});

app.listen(3000,function(){
    console.log("Port 3000");
});