var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');
var mouse = {x: 0, y: 0};
var paint;


canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

document.addEventListener('mousedown', (e) => {
    mouse.x = e.x - canvas.offsetLeft;
    mouse.y = e.y - canvas.offsetTop;
    paint = true;
})

document.addEventListener('mousemove', (e)=>{
    if (paint) {
        var x = e.x - canvas.offsetLeft;
        var y = e.y - canvas.offsetTop;
        c.moveTo(mouse.x, mouse.y);
        c.lineTo(x, y);
        c.stroke();
        mouse.x = x;
        mouse.y = y;
    }
})

document.addEventListener('mouseenter', (e)=>{
    if (paint) {
        mouse.x = e.x - canvas.offsetLeft;
        mouse.y = e.y - canvas.offsetTop;
    }
})

document.addEventListener('mouseup', (e)=>{
    paint = false;
})

document.addEventListener('mouseleave', (e)=>{
    paint = false;
})

