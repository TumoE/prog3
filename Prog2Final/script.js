
var matrix = [];

var Allen = require("./Alien");
var Grass = require("./Grass");
var GrassEater = require("./GrassEater");
var Predator = require("./Predator");
var Bomb = require("./Bomb");

function RandomMatrix() {
    
    for (let y = 0; y < 20; y++) {
        matrix[y] = [];
        for (let x = 0; x < 20; x++) {
            let a = Math.floor(Math.random() * 100);
                if (a >= 0 && a < 25) {
                matrix[y][x] = 0;
                }
                else if (a >= 25 && a < 92) {
                matrix[y][x] = 1;
                }
                else if (a >= 90 && a < 95) {
                matrix[y][x] = 2; 
                }
                else if (a >= 95 && a < 100) {
                matrix[y][x] = 3; 
                }
        }
    }
}

function RandomBombMatrix() {
    var x = Math.floor(Math.random() * 20);
    var y = Math.floor(Math.random() * 20);

    matrix[y][x] = 4;
    var bo = new Bomb(x, y, 4);
    bombArr.push(bo);
    setTimeout(RandomBombMatrix, 5000);
}

function RandomAllenMatrix() {
    var x = Math.floor(Math.random() * 20);
    var y = Math.floor(Math.random() * 20);

    matrix[y][x] = 5;
    var al = new Allen(x, y, 5);
    allenArr.push(al);
    setTimeout(RandomAllenMatrix, 8000);
}

function reverseFunc(){
    var x;

    x = grassEaterArr;
    grassEaterArr = predatorArr;
    predatorArr = x;

    for (var i in grassEaterArr) {
       grassEaterArr[i].index = 3;
   // console.log("GR " + grassEaterArr[i].index);

    }
    for (var i in predatorArr) {
        predatorArr[i].index = 2;
       // console.log("PR " + predatorArr[i].index);
    }

    for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
            if(matrix[y][x] == 2)
                    {
                     matrix[y][x] = 3;
                    }
            else if (matrix[y][x] == 3)
                    {
                    matrix[y][x] = 2;
                    }      
        }
    }

}

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var bombArr = [];
var allenArr = [];

var side = 40;
var bomb;
var grass;
var cow;
var wolf;
var ground; 
var alien;
function setup() {
    ground = loadImage('img/Ground.png');
    bomb = loadImage('img/bomb.png');
    grass = loadImage('img/Grass.png');
    cow = loadImage('img/Cow.png');
    wolf = loadImage('img/Wolf.png');
    alien = loadImage('img/alien.png');

    RandomMatrix();
  // RandomGrassEaterMatrix();
  // RandomPredatorMatrix();
    RandomBombMatrix();
   RandomAllenMatrix();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');



    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x, y, 2);
                grassEaterArr.push(et);

            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                predatorArr.push(pr);

            }
            else if (matrix[y][x] == 4) {
                var bo = new Bomb(x, y, 4);
                bombArr.push(bo);
            }
            else if (matrix[y][x] == 5) {
                var al = new Allen(x, y, 5);
                allenArr.push(al);

            }
        }
    }


}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                image(grass,x * side, y * side, side, side)
                //fill("green");
               // grass = loadImage('img/Grass.png');
                 //rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                image(cow,x * side, y * side, side, side)
                /*fill("yellow");
                rect(x * side, y * side, side, side);*/
            }
            else if (matrix[y][x] == 0) {
                /*fill("brown");
                rect(x * side, y * side, side, side);*/
                image(ground,x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 3) {
                image(wolf,x * side, y * side, side, side)
               /* fill("red");
                rect(x * side, y * side, side, side);*/
            }
            else if (matrix[y][x] == 4) {
              //  fill("black");
             //  rect(x * side, y * side, side, side);
                image(bomb,x * side, y * side, side, side)

            }
            else if (matrix[y][x] == 5) {
                image(alien,x * side, y * side, side, side)

                /*fill("#9ef442");
                rect(x * side, y * side, side, side);*/
            }
        
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
       // grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
       //xx grassEaterArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
        predatorArr[i].mul();
    }

    for (var i in bombArr) 
    {
        bombArr[i].Timer();
    }
    
    for (var i in allenArr) {
        allenArr[i].eat();
        allenArr[i].CountDown();
    }

}



