var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function () {
        c.beginPath();
        c.rect(this.x, this.y, this.width, this.height);
        c.strokeStyle = 'red';
        c.stroke();
        c.closePath();
    }

    this.collision_rect = function (rect) {
        return (this.x + this.width > rect.x &&
            this.x < rect.width + rect.x &&
            this.y + this.height > rect.y &&
            this.y < rect.height + rect.y);
    }

    this.collision_ball = function (ball) {
        var dx = ball.x;
        var dy = ball.y;
        if (dx < this.x) dx = this.x;
        else if (dx > this.x + this.width) dx = this.x + this.width;
        if (dy < this.y) dy = this.y;
        else if (dy > this.y + this.height) dy = this.y + this.height;
        return Math.hypot(dx - ball.x, dy - ball.y) <= ball.radius
    }
}

function Ball(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.strokeStyle = 'red';
        c.stroke();
        c.closePath();
    }

    this.collision_ball = function (ball) {
        return (Math.hypot(this.x - ball.x, this.y - ball.y) < this.radius + ball.radius);
    }

    this.collision_rect = function (rect){
        var px = this.x;
        var py = this.y;
        if(px < rect.x) px = rect.x;
        else if(px > rect.x + rect.width) px = rect.x + rect.width;
        if(py < rect.y) py = rect.y;
        else if(py > rect.y + rect.height) py = rect.y + rect.height;
        var dx = this.x - px
        var dy = this.y - py
        return (dx*dx + dy*dy) <= this.radius*this.radius;
    }
}    

function Line(sx, sy, ex, ey){
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;

    this.draw = function () {
        c.beginPath();
        c.moveTo(this.sx, this.sy);
        c.lineTo(this.ex, this.ey);
        c.stroke();
    }

    this.collistion = function (x, y) {
        var dx = Math.hypot(x - this.sx, y - this.sy);
        var dy = Math.hypot(x - this.ex, y - this.ey);
        var _line = Math.hypot(this.sx - this.ex, this.sy - this.ey);
        return _line == dx + dy;
    }
}

var mouse = { x: 0, y: 0 }

addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

var rect1 = new Rect(200, 200, 100, 100)
var rect2 = new Rect(canvas.width / 2, canvas.height / 2, 100, 100)

var ball1 = new Ball(200, 70, 70);
var ball2 = new Ball(canvas.width / 2, canvas.height / 2, 100)

var line1 = new Line(100, 100, 500, 500);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    // rect1.x = mouse.x
    // rect1.y = mouse.y
    // rect1.draw();
    // rect2.draw();
    ball1.x = mouse.x
    ball1.y = mouse.y
    ball1.draw();
    // ball2.draw();
    line1.draw();
    console.log(line1.collistion(ball1.x, ball1.y));
}

animate();