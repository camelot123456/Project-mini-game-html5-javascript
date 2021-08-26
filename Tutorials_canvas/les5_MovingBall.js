var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');
var _alpha = 0.1;
var count = 0;
var ball;
var _balls = [];

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function Ball(dx, dy, radius) {
    this.radius = radius;
    this.x = randomInt(this.radius, canvas.width - this.radius);
    this.y = randomInt(this.radius, canvas.height - this.radius);
    this.dx = dx;
    this.dy = dy;

    this.draw = function (alpha) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = 'rgba(255, 100, 100, ' + alpha + ')';
        c.closePath();
        c.fill();
    }

    this.checkCollistion = function () {
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.dx = -this.dx;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.dy = -this.dy;
        }
    }

    this.move = function () {
        this.x += this.dx;
        this.y += this.dy;
    }
}

function traceBall(_ball) {
    var b = new Ball;
    b.x = _ball.x;
    b.y = _ball.y;
    b.radius = _ball.radius;
    _balls.push(b);
    if (_balls.length > 10) {
        _balls.splice(0, 1);
    }
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    traceBall(ball)
    if (_alpha >= 0.1) _alpha = 0.1
    _balls.forEach(_ball => {
        _alpha += 0.1
        _ball.draw(_alpha);
    })
}

function update() {
    ball.move();
    ball.checkCollistion();
    count++;
    if (count == 5) {
        draw();
        count = 0;
    }
}

ball = new Ball(2, 2, 15);
setInterval('update()', 5)