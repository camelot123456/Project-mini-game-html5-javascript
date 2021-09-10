var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 500;

let fps, fpsInterval, startTime, now, then, elapsed;

const keys = [];

const player = {
    x: 200,
    y: 300,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
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

window.addEventListener('keydown', (e) => {
    keys[e.keyCode] = true;
    player.moving = true;
});

window.addEventListener('keyup', (e) => {
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer() {
    if (keys[38] && player.y > 70) {
        player.y -= player.speed;
        player.frameY = 3;
    }
    if (keys[40] && player.y + player.height + 70 < canvas.height) {
        player.y += player.speed;
        player.frameY = 0;
    }
    if (keys[37] && player.x > 70) {
        player.x -= player.speed;
        player.frameY = 1;
    }
    if (keys[39] && player.x + player.width + 70 < canvas.width) {
        player.x += player.speed;
        player.frameY = 2;
    }
}

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