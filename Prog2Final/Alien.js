module.exports = class Allen extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index);
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
        return super.chooseCell(character);
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