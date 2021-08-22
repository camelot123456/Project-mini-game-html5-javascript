var canvas = document.querySelector('#myCanvas');
var c = canvas.getContext('2d');

const width = window.innerWidth - 100;
const height = window.innerHeight - 100;

canvas.width = width;
canvas.height = height;

var colors = ['#4FD1A8', '#A8E8B8', '#F2421B', '#FF6201', '#FEC900']

var mouse = {
    x: Infinity,
    y: Infinity
}

addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

addEventListener('resize', (e) => {
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;
    init();
})

var maxRadius = 60;
var minRadius = 5;

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
        if (this.x - this.radius < 0 || this.x + this.radius > window.innerWidth - 100) {
            this.dx = -this.dx;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > window.innerHeight - 100) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50
            && this.radius < maxRadius) {
            this.radius += 3;
        } else if (this.radius > minRadius) {
            this.radius -= 3;
        }

        this.draw();
    }

}

function random(min, max) {
    return (Math.random() * (max - min) + min);
}

var circles = [];

function init() {
    circles = [];
    for (let i = 0; i < 100; i++) {
        var radius = random(5, 30);
        var x = random(radius, (window.innerWidth - 100) - radius);
        var y = random(radius, (window.innerHeight - 100) - radius);
        var dx = random(-1.5, 1.5);
        var dy = random(-1.5, 1.5);
        var color = colors[Math.floor(random(0, colors.length))];
        //`rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)} ,${random(0.1, 1)})`
        //`hsl(${random(10, 350)}, 50%, 50%)`
        circles.push(new Circle(x, y, radius, color, dx, dy));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth - 100, window.innerHeight - 100);
    circles.forEach((circle1) => {
        circle1.update();
    })
}


animate();
init();