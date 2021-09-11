import Hulk from '../objects/Hulk.js'
import Input from '../utils/Input.js'

export default class Game{

    constructor(canvas, background){

        this.canvas = canvas;
        this.c = this.canvas.getContext('2d');

        this.GAME_WIDTH = 650;
        this.GAME_HEIGHT = 650;

        this.canvas.width = this.GAME_WIDTH;
        this.canvas.height = this.GAME_HEIGHT;

        this.background = new Image();
        this.background.src = background;

        this.hulk = new Hulk(canvas);
        this.input = new Input(this.hulk, this.canvas);

    }

    initGame(){
        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.c.drawImage(this.background, 0, 0, canvas.width, canvas.height);

        this.hulk.init(this.c);
        this.hulk.handlerPlayerFrame();

        this.input.moveKey();
    }

}