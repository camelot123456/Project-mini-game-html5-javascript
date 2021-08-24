var canvas = document.querySelector('#myCanvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

class AABB {
    constructor(center, halfSize, color) {
        this.center = center;
        this.halfSize = halfSize;
        this.color = color;
        this.alpha = 1;
    }

    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.lineWidth = '2';
        c.strokeStyle = this.color;
        c.rect(this.center.x, this.center.y, this.halfSize.x * 2, this.halfSize.y * 2);
        c.stroke();
        c.restore();
    }

    update() {
        this.draw();
    }

    isOverLaps(other) {
        if (Math.sqrt(this.center.x - other.center.x) > this.halfSize.x + other.halfSize.x) {
            return false;
        }
        if (Math.sqrt(this.center.y - other.center.y) > this.halfSize.y + other.halfSize.y) {
            return false;
        }
        return true;
    }
}

class MovingObject {
    constructor(aabb, ofset) {
        this.aabb = aabb;
        this.ofset = ofset;
    }
}





var center = {
    x: 300,
    y: canvas.height - 130
}

var halfSize = {
    x: 50,
    y: 65
}
var aabb = new AABB(center, halfSize, 'red');
var offset = 5

addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37://left 
            console.log('left');
            center.x -= offset;
            break;
        case 38://up 
            console.log('up');
            if (center.y >= canvas.height / 2) {
                for (let i = 0; i < canvas.height / 2; i++) {
                    center.y -= offset ;
                    if (center.y <= canvas.height / 2) {
                        break;
                        for (let i = 0; i < canvas.height / 2; i++) {
                            center.y += offset ;
                            if (center.y >= canvas.height / 2) {
                                break;
                            }
                        }
                    }
                }
            }
            break;
        case 39://right 
            console.log('right');
            center.x += offset;
            break;
        case 40://down 
            console.log('down');
            center.y += offset;
            break;
        default:
            console.log('stop');
            break;
    }
})

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.clearRect(0, 0, canvas.width, canvas.height);
    aabb.update();
}


animate();
