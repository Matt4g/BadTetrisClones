const canvas2 = document.getElementById('Next');
const context2 = canvas2.getContext('2d');

context2.scale(20, 20);


function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix
}


function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
     return[
         [2, 2],
         [2, 2],
     ];
    } else if (type === 'L') {
         return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
         ];
     } else if (type === 'J') {
        return [
           [0, 4, 0],
           [0, 4, 0],
           [4, 4, 0],
        ];
     }
     else if (type === 'I') {
        return [
           [0, 5, 0, 0],
           [0, 5, 0, 0],
           [0, 5, 0, 0],
           [0, 5, 0, 0],
        ];
     }
     else if (type === 'S') {
        return [
           [0, 6, 6],
           [6, 6, 0],
           [0, 0, 0],
        ];
     }
     else if (type === 'Z') {
        return [
           [7, 7, 0],
           [0, 7, 7],
           [0, 0, 0],
        ];
     }
    
}

  
   
function draw() {
    context2.fillStyle = colors2[1];
    context2.fillRect(0, 0, canvas2.width, canvas2.height);

    drawMatrix(arena2, {x: 0, y: 0});
    drawMatrix(player2.matrix, player2.pos);
   
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context2.fillStyle = colors2[value];
                context2.fillRect(x + offset.x,
                                y + offset.y, 
                                1, 1);
            }
        });
    });
}

let pieces = ['T','O','L','J','I','S', 'Z'].sort( () => .5 - Math.random() );

function playerReset() {

    player2.matrix = createPiece(pieces[1]);
    
    if(pieces.length == 2){
        
        nextPieces = (['T','O','L','J','I','S', 'Z'].sort(() => .5 - Math.random()));
        pieces2 = pieces.concat(nextPieces);
        pieces = pieces2;
          player2.matrix = createPiece(pieces[0]);
          
          
    }

    next();
    setTimeout(() => {pieces.shift();console.log("shift");}, 10);
    
    player2.pos.y = -1;
    player2.pos.x = (arena2[0].length / 2 | 0) -
                    (player2.matrix[0].length / 2 | 0);    
}
//function ghostPiece(){
  //  let pieces = ['T','O','L','J','I','S', 'Z'].sort( () => .5 - Math.random() );
//}  


function next(){
    document.getElementById('piece').innerText = pieces;
}

let shiftThing = document.getElementById('shift').innerText
let num = 0;
let nextPieces;
let pieces2;

function shiftPiece(){    
    //removes pieces 
    if(shiftThing == "true"){   
        pieces.shift();
        console.log("shift")
        num = 1;
        player2.matrix = createPiece(pieces[0]);
    }
    else if(shiftThing == "true" && num !=0){
        num = 0;
    }   
    //creates new pieces and adds them to the original array
    if(pieces.length == 2){
      nextPieces = (['T','O','L','J','I','S', 'Z'].sort(() => .5 - Math.random()));
      pieces2 = pieces.concat(nextPieces);
       pieces = pieces2;
       player2.matrix = createPiece(pieces[0]);
        
        
    }
}

let lastTime2 = 0;

function update(time = 0) {
    const deltaTime = time - lastTime2;
    lastTime2 = time;
    draw();
    requestAnimationFrame(update);
    shiftPiece();
    shiftThing = document.getElementById('shift').innerText
    next();
    
    

    
}

const colors2 = [
    null, 
    'purple',
    'yellow', 
    'orange', 
    'blue', 
    'cyan', 
    'green', 
    'red',
];

const arena2 = createMatrix(4, 4);

const player2 = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
}
playerReset();
update();