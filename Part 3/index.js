import Game from './src/config/game.js';

var canvas = document.querySelector('#canvas');

const PATH_IMG = '../../public/images/';
const background = `${PATH_IMG}backgrounds/background.png`;

var game = new Game(canvas, background);
var fpsInterval, now, then, startTime, elapsed;


function run(fps){
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        game.initGame();       
    }
}

run(30);


