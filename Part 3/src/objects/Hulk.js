export default class Hulk {
    constructor(canvas) {

        this.playerSprite = new Image();
        this.playerSprite.src = '../../public/images/players/hulk.png';

        this.canvas = canvas;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
        this.width = 40;
        this.height = 56;
        this.frameX = 0;
        this.frameY = 0;
        this.hightJump = 30;
        this.speed = 3;
        this.moving = false;

        //this.dx = Math.cos(angle) * 7;
        //this.dy = Math.sin(angle) * 7;

        this.gravity = 0.05;

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

    handlerPlayerFrame(){
        if (this.frameX < 3 && this.moving) {
            this.frameX++;
        } else this.frameX = 0;
    }
}