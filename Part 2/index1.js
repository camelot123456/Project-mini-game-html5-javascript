var canvas = document.querySelector('#canvas')
var c = canvas.getContext('2d');

let cannonSfx = new Audio('https://ia601404.us.archive.org/24/items/metal-block/Anti%20Aircraft%20Cannon-18363-Free-Loops.com.mp3');

let cannonTop = new Image();
cannonTop.src = 'https://ia801504.us.archive.org/32/items/cannon_202104/cannon.png';
cannonTop.onload = renderImages;

let mousePos = null;
let angle = null;
let canShoot = true;

let imgCount = 1;
//hàm xử lý cho chương trình load trước hình ảnh để ảnh không bị ghi đè lên
//Bắt đầu ứng dụng ngay bây giờ vì hình ảnh đã được tải
function renderImages() {
    if (--imgCount > 0) {
        return
    }
    //Gọi animate () khi tất cả hình ảnh đã tải xong
    animate();
}

//Chức năng toàn cầu
function drawBorder() {
    c.fillStyle = '#666666'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.clearRect(20, 20, 560, 560)
}

/*
Ban đầu đạn bắn ra không xuất phát từ miệng súng pháo (do tỉ lệ ảnh .png ko đều)
Xử lý các viên đạn xuất phát đúng vị trí xuất phát là miệng súng
*/
function sortBallPos(x, y) {
    let rotateAngle = angle;
    //Tính toán khoảng cách giữa điểm quay và vòi phun của pháo
    let dx = x - (cannon.x + 15);
    let dy = y - (cannon.y - 50);
    let distance = Math.sqrt(dx * dx + dy * dy);
    let originalAngle = Math.atan2(dy, dx);
    //Tìm kiếm các vị trí mới
    let newX = (cannon.x + 15) + distance * Math.cos(originalAngle + rotateAngle);
    let newY = (cannon.y - 50) + distance * Math.sin(originalAngle + rotateAngle);
    return {
        x: newX,
        y: newY
    }
}

class Cannon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.topX = x - 20;
        this.topY = y - 95;
    }

    //Vẽ chân đế
    stand() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x + 15, this.y - 50);
        c.lineTo(this.x + 30, this.y);
        c.stroke();
    }

    rotateTop() {
        if (mousePos) {
            angle = Math.atan2(
                mousePos.y - (this.y - 50),
                mousePos.x - (this.x + 15));
            c.translate(this.x + 15, this.y - 50)
            c.rotate(angle);
            c.translate(-(this.x + 15), -(this.y - 50))
        }
    }

    draw() {
        //Gọi hàm vẽ chân đế trước
        this.stand();
        c.save();
        //sau đó gọi hàm vẽ súng pháo
        this.rotateTop();
        c.drawImage(cannonTop, this.topX, this.topY, 100, 50)
    }
}

let cannon = new Cannon(80, 580);

class CannonBall {
    constructor(angle, x, y) {
        this.radius = 15;
        this.mass = this.radius;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.dx = Math.cos(angle) * 7;
        this.dy = Math.sin(angle) * 7;
        this.gravity = 0.05;
        this.elasticity = 0.5;
        this.friction = 0.008;
        this.collAudio = new Audio('https://archive.org/download/metal-block_202104/metal-block.wav')
        this.collAudio.volume = 0.7;
        this.shouldAudio = true;
        this.timeDiff1 = null;
        this.timeDiff2 = new Date();
    }

    move() {
        //Phân loại trọng lực
        if (this.y + this.gravity < 580) {
            this.dy += this.gravity;
        }

        //Tác dụng ma sát lên trục X
        this.dx = this.dx - (this.dx * this.friction)

        this.x += this.dx;
        this.y += this.dy;
    }

    //Vẽ viên đạn
    draw() {
        c.fillStyle = 'black';
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
    }

}

//Mảng chứa đối tượng viên đạn
let cannonBalls = [];

//Xử lý đạn chạm tường
function ballHitWall(ball) {
    // Đã xảy ra va chạm ở bất kỳ phía nào của canvas
    if (ball.x + ball.radius > 580 ||
        ball.x - ball.radius < 20 ||
        ball.y + ball.radius > 580 ||
        ball.y - ball.radius < 20) {
        /* Xử lý âm thanh khi đứng yên trong khoảng thời gian nhất định,
        nó sẽ tự động tắt khi bóng chạm tường */
        if (ball.timeDiff1) {
            ball.timeDiff2 = new Date() - ball.timeDiff1;
            ball.timeDiff2 < 200 ? ball.shouldAudio = false : null;
        }
        if (ball.shouldAudio) ball.collAudio.play();

        //Phân loại độ co giãn và sau đó thay đổi hướng(tạo quỹ đạo cong xuống)
        ball.dy = (ball.dy * ball.elasticity)

        //Bên phải của quả bóng chạm bên phải của canvas
        if (ball.x + ball.radius > 580) {
            /* Chúng tôi đặt tọa độ X & Y trước để 
            tránh bóng bị kẹt trong đường viền canvas*/
            ball.x = 580 - ball.radius;
            ball.dx *= -1;

        } else if (ball.x - ball.radius < 20) {
            //Mặt trái của quả bóng chạm vào mặt trái của canvas
            ball.x = 20 + ball.radius;
            ball.dx *= -1;

        } else if (ball.y + ball.radius > 580) {
            //Đáy bóng chạm đáy canvas
            ball.y = 580 - ball.radius;
            ball.dy *= -1;

        } else if (ball.y - ball.radius < 20) {
            // Đầu quả bóng chạm đầu canvas
            ball.y = 20 + ball.radius;
            ball.dy *= -1;
        }
        ball.timeDiff1 = new Date();
    }
}

//hàm xử lý va chạm nhiều bóng
function collide(index) {
    let ball = cannonBalls[index];
    for (let i = index + 1; i < cannonBalls.length; i++) {
        let testBall = cannonBalls[i];
        if (ballHitBall(ball, testBall)) {
            collideBalls(ball, testBall);
        }
    }
}

function collideBalls(ball1, ball2) {
    /* Điều quan trọng là chúng tôi đang nhận được sự
     khác biệt chính xác từ bóng 1 và bóng 2 */
    let dx = ball2.x - ball1.x;
    let dy = ball2.y - ball1.y;
    let distance = Math.sqrt(dx * dx + dy * dy);


    //---------------------xem lý thuyết về tích vô hướng 2 vector ----------------
    //Tính toán vectơ va chạm chuẩn hóa (chỉ hướng)
    let vCollisionNorm = { 
        x: dx / distance, 
        y: dy / distance 
    };

    //Vận tốc tương đối của ball 2
    let vRelativeVelocity = { 
        x: ball1.dx - ball2.dx, 
        y: ball1.dy - ball2.dy 
    };
    //Công thức tính tích vô hướng 2 vector
    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
    //----------------------------------------------------------------------------

    //Đừng làm bất cứ điều gì bởi vì các quả bóng đã di chuyển ra khỏi nhau theo cách
    if (speed < 0) return;
    let impulse = 2 * speed / (ball1.mass + ball2.mass);

    /* Sau khi chúng tôi tính toán vận tốc tương đối của quả bóng2. 
    Ball1 cần phải đi theo hướng ngược lại, do đó sẽ xảy ra va chạm. 
    (mass: khối lượng) (Collision Norm: Định mức va chạm) (impulse: thúc đẩy)*/
    ball1.dx -= (impulse * ball2.mass * vCollisionNorm.x);
    ball1.dy -= (impulse * ball2.mass * vCollisionNorm.y);
    ball2.dx += (impulse * ball1.mass * vCollisionNorm.x);
    ball2.dy += (impulse * ball1.mass * vCollisionNorm.y);

    //Vẫn phải tính đến độ co giãn (elasticity: độ đàn hồi)
    ball1.dy = (ball1.dy * ball1.elasticity);
    ball2.dy = (ball2.dy * ball2.elasticity);
}

//Xử lý 2  quả bóng va chạm dùng định lý pythago
function ballHitBall(ball1, ball2) {
    let collision = false;
    let dx = ball1.x - ball2.x;
    let dy = ball1.y - ball2.y;
    //Công thức tính định lý py-ta-go
    let distance = (dx * dx + dy * dy);
    if (distance <= (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius)) {
        collision = true;
    }
    return collision;
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height)
    //draw border first
    drawBorder();
    //moving canvas graphics
    cannon.draw();
    c.restore();
    //shoot the cannon _balls
    cannonBalls.forEach((ball, index) => {
        // move the balss
        ball.move();
        ballHitWall(ball);
        collide(index);
        //renders ball to canvas
        ball.draw();
    })

}

canvas.addEventListener('mousemove', (e) => {
    mousePos = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    }
})

canvas.addEventListener('click', e => {
    //Chúng tôi không muốn có thể bắn một quả bóng ở góc độ này!
    if (angle < -2 || angle > 0.5) {
        return;
    }
    if (!canShoot) {
        return;
    }
    canShoot = false;

    let ballPos = sortBallPos(cannon.topX + 100, cannon.topY + 30);

    cannonBalls.push(
        new CannonBall(angle, ballPos.x, ballPos.y)
    );

    cannonSfx.currentTime = 0.2;
    cannonSfx.play();

    //Mỗi lần chỉ có thể bắn đại bác 1 giây
    setTimeout(() => {
        canShoot = true;
    }, true)
})
