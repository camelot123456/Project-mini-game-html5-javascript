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

export default class Input {
    constructor(player, canvas) {

        this.canvas = canvas;
        this.player = player;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.jump = false;

        this.keys = [];

        window.addEventListener('keydown', (e) => {
            // this.key_state = (e.type == "keydown") ? true : false;
            this.keys[e.keyCode] = true;
            this.player.moving = true;
        })

        window.addEventListener('keyup', (e) => {
            // this.key_state = (e.type == "keydown") ? true : false;
            delete this.keys[e.keyCode];
            this.player.moving = false;
            this.left = false;
            this.right = false;
            this.up = false;
            this.down = false;
            this.jump = false;
        })
    }

    keyListener() {
        if ((this.keys[KEY_BOARD.arow_up] && !this.player.jumping) ||
            (this.keys[KEY_BOARD.key_w] && !this.player.jumping)) {
            this.player.moving = true;
            this.player.frameY = 3;
            this.up = true;
        }
        if ((this.keys[KEY_BOARD.arow_down] && !this.player.jumping) ||
            (this.keys[KEY_BOARD.key_s] && !this.player.jumping)) {
            this.player.moving = true;
            this.player.frameY = 0;
            this.down = true;
        }
        if (this.keys[KEY_BOARD.arow_left] || this.keys[KEY_BOARD.key_a]) {
            this.player.moving = true;
            this.player.frameY = 1;
            this.left = true;
        }
        if (this.keys[KEY_BOARD.arow_right] || this.keys[KEY_BOARD.key_d]) {
            this.player.moving = true;
            this.player.frameY = 2;
            this.right = true;
        }
        if (this.keys[KEY_BOARD.key_space]) {
            if (!this.player.jumping) {
                this.jump = true;
                this.player.buffPosY = this.player.y
            }
        }
    }


}