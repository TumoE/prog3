class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        //console.log(newCell, this.multiply);
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}


class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 3;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    eat() {

        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;

        }else {
            if(this.energy >= 0){
            this.move();
            }else{
            this.die();
            }
        }
    }
      mul() {
        
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 8 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 3;
        }
    }

      die() 
      {
            matrix[this.y][this.x] = 0;

            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
                
    }
}


class Predator{
    constructor(x,y,index){
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
     move() {
        var z = Math.round(Math.random()) ;
        var newCell = random(this.chooseCell(z));


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            if(z==1) { matrix[this.y][this.x] = 1;}
            else if(z==0) { matrix[this.y][this.x] = 0;}

            matrix[newY][newX] = this.index;
            
            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
        eat() {
            var newCell = random(this.chooseCell(2));

            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
    
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;
    
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy += 2;
    
            }else{
                if(this.energy >= 0){
                this.move();
                }else{
                    this.die();
                }
            }
        }
    mul() {
        
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 24 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 8;
        }
    }
   die() 
      {
            matrix[this.y][this.x] = 0;
              for (var i in grassEaterArr) {
                  if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                      grassEaterArr.splice(i, 1);
                      break;
                  }
              }
            
                
    }
}

class Bomb{
    constructor(x,y,index){
        this.x = x;
        this.y =y;
        this.index = index;
        this.time = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x -1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y-1],
            [this.x + 2, this.y+1],
            [this.x - 2, this.y + 2],
            [this.x+1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    Explosion() {    
    
    var newCell =  random(this.chooseCell(1));
    if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 3;
            var pr = new Predator(this.x,this.y,3);
            predatorArr.push(pr);

            matrix[newY][newX] = 0;

            for(var i in bombArr){
                bombArr.splice(i,1);           
                break;
            }
    }
}


    Timer(){
        this.time--;
        if (this.time <= 0) {
            this.Explosion();
        }
    }


}


class Allen{
    constructor(x,y,index){
        this.x = x;
        this.y =y;
        this.index = index;
        this.time = 20;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x -1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y-1],
            [this.x + 2, this.y+1],
            [this.x - 2, this.y + 2],
            [this.x+1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat() {
        var z = Math.floor(Math.random() * 2) + 1;
        var newCell = random(this.chooseCell(z));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

        if (newX == this.x && newY == this.y) {
            if(z == 1){
                for(var i in grassArr)
                {
                grassArr.splice(i, 1);
                }
            }
            else if(z == 2){
            for(var i in grassEaterArr)
            {
                grassEaterArr.splice(i, 1);
            }
            }
            else if(z == 3){
                for(var i in predatorArr)
                {
                predatorArr.splice(i, 1);
                }
             }
            }
            this.y = newY;
            this.x = newX;
        }
        else {  
            this.move();
        }
        
    }


    die(){
        matrix[this.y][this.x] = 0;
            for(var i in allenArr){
                allenArr.splice(i,1);           
                break;
            }
        
    }

    move() {
      
        var newCell = random(this.chooseCell(0));
        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            this.y = newY;
            this.x = newX;

        }

    }
    CountDown(){
        this.time--;
        if (this.time <= 0) {
            this.die();
        }
  
    }
}