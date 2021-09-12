import Input from '../utils/Input.js'

export default class Hulk {
    constructor(canvas, speed) {

        this.playerSprite = new Image();
        this.playerSprite.src = '../../public/images/players/hulk.png';
        
        this.canvas = canvas;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height * 2 / 3;
        this.width = 40;
        this.height = 56;
        this.frameX = 0;
        this.frameY = 0;
        this.hightJump = this.height;
        this.speed = speed;
        this.moving = false;
        this.buffPosY = this.y;

        //var phycical
        this.gravity = 2;
        this.friction = 0.75;

        //---------------------test--------------------
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.jumping = true;
        
        this.input = new Input(this, this.canvas);
    }

    init(ctx) {
        ctx.beginPath();
        ctx.drawImage(
            this.playerSprite,
            this.width * this.frameX, this.height * this.frameY,
            this.width, this.height,
            this.x, this.y,
            this.width, this.height);
        
        ctx.closePath();
    }

    handlerPlayerFrame(n) {
        if (this.frameX < n && this.moving) {
            this.frameX++;
        } else this.frameX = 0;
    }

    collision() {
        if(this.x <= 0){
            this.x = 0;
        }
        if(this.x >= this.canvas.width - this.width){
            this.x = this.canvas.width - this.width;
        }
        if(this.y <= 0){
            this.y = 0;
        }
        if(this.y >= this.canvas.height - this.height){
            this.y = this.canvas.height - this.height;
        }
        if (this.y > this.buffPosY && this.jumping) {
            this.jumping = false;
            this.y_velocity = 0;
            console.log('test')
        }
    }

    move() {
        console.log(this.buffPosY, this.jumping)
        if (this.input.jump && !this.jumping) {
            this.y_velocity -= 30;
            this.jumping = true;
        }
        if (this.input.left) {
            this.x_velocity -= this.speed
        }
        if (this.input.right) {
            this.x_velocity += this.speed;
        }

        if (this.input.up) {
            this.y_velocity -= this.speed;
        }
        if (this.input.down) {
            this.y_velocity += this.speed;
        }

        if (this.jumping) {
            this.y_velocity += this.gravity;
        }
        this.x += this.x_velocity;
        this.y += this.y_velocity;;
        this.x_velocity *= this.friction;
        this.y_velocity *= this.friction;

        this.collision();
        this.input.keyListener();
    }

}