class Predator extends LivingCreature{

    constructor(x,y,index){
        super(x,y,index);
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
        return super.chooseCell(character);
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