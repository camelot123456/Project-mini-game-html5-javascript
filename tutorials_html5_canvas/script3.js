var canvas = document.querySelector('#myCanvas');
var c = canvas.getContext('2d');
canvas.height = window.innerHeight - 100;
canvas.width = window.innerWidth - 100;

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}

document.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function Ball(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5
    }
    this.radius = radius;
    this.color = color;
    this.mass = 267;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }

    this.update = function (balls) {
        this.draw();

        for (let i = 0; i < balls.length; i++) {
            if (this === balls[i]) {
                continue;
            }
            if (getDistance(this.x, this.y, balls[i].x, balls[i].y) - this.radius * 2 < 0) {
                resolveCollision(this, balls[i]);
            }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocity.y = -this.velocity.y;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

var ball;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomFlt(min, max) {
    return Math.random() * (max - min) + min;
}

function init() {
    ball = new Ball(
        undefined, undefined,
        30, 'red');
    ball.update();
}

function getDistance(x1, y1, x2, y2) {
    return Math.hypot((x2 - x1), (y2 - y1));
}

var balls = [];

function init(n) {
    balls = [];

    for (let i = 0; i < n; i++) {
        var radius = 100
        var x = randomInt(radius, canvas.width - radius);
        var y = randomInt(radius, canvas.height - radius);
        
        if (i !== 0) {
            for (let index = 0; index < balls.length; index++) {
                if (getDistance(x, y, balls[index].x, balls[index].y) - radius * 2 < 0) {
                    x = randomInt(radius, canvas.width - radius);
                    y = randomInt(radius, canvas.height - radius);

                    index = -1;
                }
            }
        }
        balls.push(new Ball(x, y, radius, 'black'));
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    balls.forEach((ball)=>{
        ball.update(balls);
    })

}

init(4);
animate();

// var totalR = ball.radius + ballCenter.radius;
// if (getDistance(ball.x, ball.y, ballCenter.x, ballCenter.y) <= totalR) {
//     ballCenter.color = 'red'
// } else {
//     ballCenter.color = 'black'
// }