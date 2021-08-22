var canvas = document.querySelector('#myCanvas');
var c = canvas.getContext('2d');

const width = window.innerWidth - 100;
const height = window.innerHeight - 100;

canvas.width = width;
canvas.height = height;

function Circle(x, y, radius, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill();
        c.strokeStyle = this.color;
        c.stroke();
    }

    this.update = function () {
        if (this.x - this.radius < 0 || this.x + this.radius > width) {
            this.dx = -this.dx;
        }
        if (this.y -this.radius < 0 || this.y + this.radius > height) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

}

function random(min, max){
    return (Math.random() * (max - min) + min);
}

addEventListener('mousemove', (e)=>{
    console.log(e.clientX, e.clientY);
})

var circles = [];

for (let i = 0; i < 100; i++) {
    var radius = random(15, 30);
    var x = random(radius, width - radius);
    var y = random(radius, height - radius);
    var dx = random(-1.5, 1.5);
    var dy = random(-1.5, 1.5);
    var color = `hsl(${random(10, 350)}, 50%, 50%)`
    circles.push(new Circle(x, y, radius, color, dx, dy));

}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, width, height);
    circles.forEach((circle1) => {
        circle1.update();
    })
}


animate();