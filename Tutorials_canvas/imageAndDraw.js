var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');
var mouse = { x: 0, y: 0 }

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

function Mario(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    var image = new Image();
    
    this.draw = function () {
        c.beginPath();
        c.drawImage(image, x, y, width, height);
        image.src = this.img;
        x = this.x;
        y = this.y;
        c.stroke();
    }
    
    this.update = function () {
        image.onload = this.draw();
        this.draw();
    }
}

document.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

var mario = new Mario(
    './m.png',
    canvas.width / 2,
    canvas.height / 2,
    30,
    40
);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    mario.x = mouse.x;
    mario.y = mouse.y;
    mario.update();
}

animate();
