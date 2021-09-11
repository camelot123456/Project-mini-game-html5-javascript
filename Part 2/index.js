var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 500;

let fps, fpsInterval, startTime, now, then, elapsed;
var move = {x: 0, y: 0}
var t = false;
var posMouse = 0;

const keys = [];

const player = {
    x: 200,
    y: 300,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    hightJump: 10,
    speed: 3,
    moving: false
};

const playerSprite = new Image();
playerSprite.src = './images/snowwhite.png';
const background = new Image();
background.src = './images/cafe.png';

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    c.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}
//------------------------------------------------------------------------------
window.addEventListener('keydown', (e) => {
    keys[e.keyCode] = true;
    player.moving = true;
    console.log(keys)
});

window.addEventListener('keyup', (e) => {
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer() {
    var tMoving = 2;
    if (keys[38] && player.y > 70) { // up
        player.y -= player.speed;
        player.frameY = tMoving = 3;
    }
    if (keys[40] && player.y + player.height + 70 < canvas.height) {// down
        player.y += player.speed;
        player.frameY = tMoving = 0;
    }
    if (keys[37] && player.x > 70) { // left
        player.x -= player.speed;
        player.frameY = tMoving = 1;
    }
    if (keys[39] && player.x + player.width + 70 < canvas.width) { // right
        player.x += player.speed;
        player.frameY = tMoving = 2;
    }
    if (keys[32]) { // right
        for (let i = 0; i < player.hightJump; i++) {
            if (player.y + 5 < player.hightJump && player.y - 5 > player.hightJump) {
                player.hightJump -= player.hightJump;    
            }
            player.y -= i;
        }
        player.frameY = tMoving;
    }
}
//------------------------------------------------------------------------------

window.addEventListener('mousedown', (e)=>{
    t = true;
    move.x = e.x;
    move.y = e.y;
    player.moving = true;
})

window.addEventListener('mouseup',(e)=>{
    t = false;
    player.moving = false;
})

function moveMouse(){
    //console.log(player.x, player.y, move)
    if (t == true) {
        if(player.x + player.width / 2 < move.x){ // right
            player.x += player.speed;
            player.frameY = 2;
        }
        if(player.x + player.width / 2 > move.x){ // left
            player.x -= player.speed;
            player.frameY = 1;
        }
        if(player.y + player.height / 2 < move.y){ //}){ // up
            player.y += player.speed;
            player.frameY = 0;
        }
        if(player.y + player.height / 2 > move.y){ // down 
            player.y -= player.speed;
            player.frameY = 3;
        }
        
    }
}

//------------------------------------------------------------------------------

function handlerPlayerFrame() {
    if (player.frameX < 3 && player.moving) {
        player.frameX++;
    } else player.frameX = 0;
}

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(playerSprite,
            player.width * player.frameX, player.height * player.frameY,
            player.width, player.height,
            player.x, player.y,
            player.width, player.height);
        movePlayer();
        moveMouse();
        handlerPlayerFrame();
    }
}

startAnimating(10);

/*
setInterval(function () {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(playerSprite,
        player.width * player.frameX, player.height * player.frameY,
        player.width, player.height,
        player.x, player.y,
        player.width, player.height);
    movePlayer();
    handlerPlayerFrame();
    requestAnimationFrame(animate);
}, 50)
*/