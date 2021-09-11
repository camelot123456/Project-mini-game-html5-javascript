const KEY_BOARD = { 
    'arow_up': 38,
    'arow_down': 40,
    'arow_left': 37,
    'arow_right': 39,
    'key_w': 87,
    'key_s': 83,
    'key_a': 65,
    'key_d': 68,
    'key_space': 32,
    'key_e': 69,
    'key_r': 82,
    'key_q': 81
}

export default class Input{
    constructor(player,canvas){

        this.canvas = canvas;
        this.player = player;

        this.keys = [];
        this.typeControl = ''

        window.addEventListener('keydown', (e)=>{
            this.typeControl = 'key'
            this.keys[e.keyCode] = true;
        })

        window.addEventListener('keyup', (e)=>{
            delete this.keys[e.keyCode];
            this.player.moving = false;
        })

    }

    moveKey(){
        if (this.keys[KEY_BOARD.arow_up] || this.keys[KEY_BOARD.key_w]) {
            this.player.moving = true;
            this.player.y -= this.player.speed
            this.player.frameY = 3;
        }
        if (this.keys[KEY_BOARD.arow_down] || this.keys[KEY_BOARD.key_s]) {
            this.player.moving = true;
            this.player.y += this.player.speed
            this.player.frameY = 0;
        }
        if (this.keys[KEY_BOARD.arow_left] || this.keys[KEY_BOARD.key_a]) {
            this.player.moving = true;
            this.player.x -= this.player.speed
            this.player.frameY = 1;
        }
        if (this.keys[KEY_BOARD.arow_right] || this.keys[KEY_BOARD.key_d]) {
            this.player.moving = true;
            this.player.x += this.player.speed
            this.player.frameY = 2;
        }
        if (this.keys[KEY_BOARD.key_space]) {
            var posCurrent = {
                x: this.player.x, 
                y: this.player.y
            };
            
            this.player.y -= this.player.hightJump * this.player.gravity;
        }
    }

}