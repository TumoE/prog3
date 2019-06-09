// var obj = {
// 	"FirstName": "Vardan",
// 	"LastName": "Manucharyan",
// 	"Age": 22,
// 	"TumoStudent": false
// }

// var fs = require('fs');
// var ObjJSON = JSON.stringify(obj);

// function main(){
// 	fs.writeFileSync("obj.JSON", ObjJSON);
// }

// main();

var Square = require("./module");
var mySquareObject = new Square(5);

function main() {
   console.log(mySquareObject.getArea());
}
main();
