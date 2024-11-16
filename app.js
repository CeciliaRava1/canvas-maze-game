const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let message = document.getElementById('message');
let gameOver = false;

let player = {
    
    positionX: 20,
    positionY: 20,
    size: 15,
    color: 'yellow',
    speed: 2,
    distanceX: 0,
    distanceY: 0,
};

const wall = [

    // External walls
    {positionX: 0, positionY: 0,  width: 600, height: 10}, // Top wall
    {positionX: 0, positionY: 590,  width: 600, height: 10}, // Bottom wall
    {positionX: 590, positionY: 0,  width: 10, height: 600}, // Right wall
    {positionX: 0, positionY: 0,  width: 10, height: 600}, // Left wall

    // Internal walls
    {positionX: 100, positionY: 50,  width: 200, height: 10}, // Top wall
    {positionX: 300, positionY: 200,  width: 150, height: 10}, // Bottom wall
    {positionX: 590, positionY: 0,  width: 10, height: 600}, // Right wall
    {positionX: 0, positionY: 0,  width: 10, height: 600}, // Left wall
];

const exit = {

    positionX: 570,
    positionY: 570,
    size: 30,
    color: 'green',
};

function draw(){

    //Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.positionX, player.positionY, player.size, player.size); // Draw width and height
    
    // Draw walls
    ctx.fillStyle = 'blue';

    wall.forEach( wall => {

        ctx.fillRect(wall.positionX, wall.positionY, wall.width, wall.height);
    });

    // Draw exit
    ctx.fillStyle = exit.color;
    ctx.fillRect(exit.positionX, exit.positionY, exit.size, exit.size);

};

function movePlayer(){

    player.positionX += player.distanceX;
    player.positionY += player.distanceY;

    if(player.positionX < 0) player.positionX = 0;
    if(player.positionX + player.size > canvas.width) player.positionX = canvas.width - player.size;

    if(player.positionY < 0) player.positionY = 0;
    if(player.positionY + player.size > canvas.width) player.positionY = canvas.height - player.size;
};

function checkCollision(){

    wall.forEach(wall => {

        if(player.positionX < wall.positionX + wall.size && 
           player.positionX + player.size > wall.positionX &&
           player.positionY < wall.positionY + wall.height &&
           player.positionY + player.size > wall.positionY
        ){

            player.positionX = 20;
            player.positionY = 20;
        };
    });
};

function checkWin(){

    if(player.positionX < exit.positionX + exit.size &&
       player.positionX + player.size > exit.positionX &&
       player.positionY < exit.positionY + exit.size &&
       player.positionY + player.size > exit.positionY
    ){

        message.textContent = 'You won!';
        gameOver = true;
    };
};

function keyDown(e){
 
    if(e.key === 'ArrowRight' || e.key === 'd') player.distanceX += player.speed;
    if(e.key === 'ArrowLeft' || e.key === 'a') player.distanceX -= player.speed;
    if(e.key === 'ArrowUp' || e.key === 'w') player.distanceY -= player.speed;
    if(e.key === 'ArrowDown' || e.key === 's') player.distanceY += player.speed;

};

function keyUp(e){

    if(['ArrowRight', 'ArrowLeft', 'd', 'a'].includes(e.key)) player.distanceX = 0;
    if(['ArrowUp', 'ArrowDown', 'w', 's'].includes(e.key)) player.distanceY = 0;

};

function update(){

    if(!gameOver) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        movePlayer();
        checkCollision();
        checkWin();
        requestAnimationFrame(update);
    };
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
update();



