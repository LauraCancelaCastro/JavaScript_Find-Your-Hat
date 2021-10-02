const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(map) {
    this.map = map;
  }
  print(){
    for(let i=0; i<this.map.length; i++){
      console.log(this.map[i].join(""));
    }
  }
  generateField(height, width){
    this.map=[];
    var nHoles = height*width*30/100;
    var nHat = 1;
    var ran = 0;
    for (let i=0 ; i<height ; i++){
      this.map[i]=[];
      for (let j=0 ; j<width ; j++){
        ran = Math.random();
        if(i==0 && j==0) this.map[0].push(pathCharacter);
        else if(nHoles && ran > 0.8 && ran < 0.9){
          this.map[i].push(hole);
          nHoles--;
        }
        else if(nHat && ran >= 0.98){
          this.map[i].push(hat);
          nHat=0;
        }else{
          if(i==height-1 && j==width-1 && nHat)
            this.map[i].push(hat);
          else this.map[i].push(fieldCharacter);
        }
      }
    }
  }
}

// Start map
/*const myMap = new Field([
  ['*', '░', '░', 'O', '░', '░', 'O', '░'],
  ['░', 'O', '░', '░', '░', '░', '░', '░'],
  ['░', '░', '░', 'O', '░', '░', 'O', '░'],
  ['░', '░', 'O', '░', 'O', '░', '░', '░'],
  ['░', '░', '░', 'O', '░', '░', 'O', '░'],
  ['░', '░', '░', 'O', '░', '░', 'O', '░'],
  ['░', 'O', '░', '░', '░', '░', '░', '░'],
  ['░', '░', '░', 'O', '░', '░', 'O', '░'],
  ['░', '░', 'O', '░', 'O', '░', '░', '░'],
  ['░', '░', '░', 'O', '░', '░', 'O', '░'],
  ['░', '^', '░', '░', '░', '░', '░', '░']
]);*/
const myMap = new Field([]);
myMap.generateField(10, 20);
console.log("The path you take is indicated by *, O are holes and your hat is ^.");
console.log("Try to recover your hat without falling in any holes or stepping on your own path.");
console.log("Use u (up), d (down), l (left), r (right), e(exit).");


var gameState = '';
var x = 0, y=0;
while(gameState != 'loss' && gameState != 'win'){
  let currentPosition = myMap.map[x][y];
  myMap.print();
  var direction = prompt('Where do you want to move?: ');
  switch(direction){
    case 'u':
      if(x <= 0){ gameOver(); }
      else{checkPosition(x-1, y);}
      break;
    case 'r':
      if(y >= myMap.map[0].length-1){ gameOver(); }
      else{checkPosition(x, y+1);}
      break;
    case 'd':
      if(x >= myMap.map.length-1){ gameOver(); }
      else{checkPosition(x+1, y);}
      break;
    case 'l':
      if(y <= 0){ gameOver(); }
      else{checkPosition(x, y-1);}
      break;
    case 'e':
      gameState = 'loss';
      break;
    default:
      console.log("Use u (up), d (down), l (left), r (right), e(exit).");
  }
}

function checkPosition(x1, y1){
  if(myMap.map[x1][y1] == hole || myMap.map[x1][y1] == pathCharacter){
    gameOver();
  } else if(myMap.map[x1][y1] == hat){
    gameState = 'win';
    console.log("WINNER!!");
    console.log("You found your hat.");
  }
  else{
    x=x1;
    y=y1;
    myMap.map[x1][y1]='*';
  }
}

function gameOver(){
  gameState = 'loss';
  console.log("GAME OVER");
  console.log("You fell out of the map.");
}
