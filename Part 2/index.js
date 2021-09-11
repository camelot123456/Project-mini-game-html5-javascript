var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 500;

var typeControl = false;

let fps, fpsInterval, startTime, now, then, elapsed;

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
    moving: false,
    angle: null
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
    typeControl = true;
});

window.addEventListener('keyup', (e) => {
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer() {
    var tMoving = 2;
    if (keys[38] && player.y > 70 || keys[87] && player.y > 70) { // up
        player.y -= player.speed;
        player.frameY = tMoving = 3;
    }
    if (keys[40] && player.y + player.height + 70 < canvas.height
        || keys[83] && player.y + player.height + 70 < canvas.height) {// down
        player.y += player.speed;
        player.frameY = tMoving = 0;
    }
    if (keys[37] && player.x > 70 || keys[65] && player.x > 70) { // left
        player.x -= player.speed;
        player.frameY = tMoving = 1;
    }
    if (keys[39] && player.x + player.width + 70 < canvas.width
        || keys[68] && player.x + player.width + 70 < canvas.width) { // right
        player.x += player.speed;
        player.frameY = tMoving = 2;
    }
}
//------------------------------------------------------------------------------
var move = { 
    x: player.x + player.width / 2, 
    y: player.y + player.height 
}

canvas.addEventListener('mousedown', (e) => {
    move.x = e.x - canvas.offsetLeft;
    move.y = e.y - canvas.offsetTop;
    player.moving = true;
    typeControl = false
})

var _move = {
    x: 0,
    y: 0
};

canvas.addEventListener('mousemove', (e) => {
    _move.x = e.x - canvas.offsetLeft;
    _move.y = e.y - canvas.offsetTop;
})

function getDistance(obj, pos) {
    return Math.floor(Math.hypot((obj.x + obj.width / 2) - pos.x, (obj.height + obj.y) - pos.y));
}

function getAngle(obj, mouse) {
    return Math.atan2((obj.height + obj.y) - mouse.y, (obj.x + obj.width / 2) - mouse.x) * 180 / Math.PI;
}

function rotate(){
    if (getAngle(player, _move) >= 65 && getAngle(player, _move) <= 115) {
        player.frameY = 3;
    }
    if (getAngle(player, _move) >= -115 && getAngle(player, _move) <= -65) {
        player.frameY = 0;
    }
    if ((getAngle(player, _move) >= 0 && getAngle(player, _move) <= 65)
    || (getAngle(player, _move) >= -65 && getAngle(player, _move) <= -0.5)) {
        player.frameY = 1;
    }
    if ((getAngle(player, _move) >= 115 && getAngle(player, _move) <= 180)
    || (getAngle(player, _move) >= -179.5 && getAngle(player, _move) <= -115)) {
        player.frameY = 2;
    }
}

function moveMouse() {

    if (player.x + player.width / 2 < move.x) { // right
        player.x += player.speed;
        player.frameY = 2;
    }
    if (player.x + player.width / 2 > move.x) { // left
        player.x -= player.speed;
        player.frameY = 1;
    }
    if (player.y + player.height < move.y) { // up
        player.y += player.speed;
        player.frameY = 0;
    }
    if (player.y + player.height > move.y) { // down 
        player.y -= player.speed;
        player.frameY = 3;
    }
    
    if (player.x + player.width / 2 < move.x && player.y + player.height < move.y
        || player.x + player.width / 2 < move.x && player.y + player.height > move.y) {
        player.frameY = 2;
    }

    if (player.x + player.width / 2 > move.x && player.y + player.height < move.y
        || player.x + player.width / 2 > move.x && player.y + player.height > move.y) {
        player.frameY = 1;
    }
    if (getDistance(player, move) <= 2.9) {
        player.moving = false
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
        if (typeControl) {
            movePlayer();
        } else {
            moveMouse();
        }
        rotate();
        handlerPlayerFrame();
        getDistance(player, move)
        
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