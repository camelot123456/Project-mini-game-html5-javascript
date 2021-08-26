var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

// function Rect() {
//     this.isSelected = false;
//     this.x = 0;
//     this.y = 0;
//     this.width = 1;
//     this.height = 1;
// }

// Rect.prototype.isContain = (x, y) => {
//     var right = this.x + this.width;
//     var bottom = this.y + this.height;
//     return x > this.x && x < right && y > this.y && y < bottom;
// }

// function ShapeList() {
//     this.items = [];
//     this.selectedItem = null;
//     this.offsetX = -1;
//     this.offsetY = -1;
// }

// ShapeList.prototype.addItem = function (x, y, width, height) {
//     var rect = new Rect;
//     rect.x = x;
//     rect.y = y;
//     rect.width = width;
//     rect.height = height;
//     this.items.push(rect);
// }

// ShapeList.prototype.selectAt = (x, y) => {
//     if (this.selectedItem) {
//         this.selectedItem.isSelected = false;
//     }
//     this.selectedItem = null;
//     for (var i = 0; i < this.items.length; i++) {
//         var rect = this.items[i];
//         if (rect.isContain(x, y)) {
//             this.selectedItem = this.items[i];
//             this.offsetX = x - this.items[i].x;
//             this.offsetY = y - this.items[i].y;
//             this.items[i].isSelected = true;
//             break;
//         }
//     }
// }

// function clear() {
//     c.clearRect(0, 0 ,canvas.width, canvas.height);
// }

// function draw() {
//     clear();
//     for (var i = _list.items.length - 1; i >= 0; i--) {
//         drawRect(_list.items[i]);
//     }
// }

// function drawRect(rect) {
//     c.fillRect(rect.x, rect.y, rect.width, rect.height);
//     if (rect.isSelected) {
//         c.save();
//         c.strokeStyle = "red";
//         c.strokeRect(rect.x, rect.y, rect.width, rect.height);
//         c.restore();
//     }
// }

// function canvas_mousedown(e) {
//     var x = e.pageX - canvas.offsetLeft;
//     var y = e.pageY - canvas.offsetTop;
//     _list.selectAt(x, y)
//     if (!_list.selectedItem)
//         _list.addItem(x - RECT_SIZE, yRECT_SIZE, RECT_SIZE * 2, RECT_SIZE * 2);
//     _ismoving = true;
//     draw();
// }
// function canvas_mousemove(e) {
//     if (_ismoving && _list.selectedItem) {
//         var x = e.pageX - _canvas.offsetLeft;
//         var y = e.pageY - _canvas.offsetTop;
//         _list.selectedItem.x = x - _list.offsetX;
//         _list.selectedItem.y = y - _list.offsetY;
//         draw();
//     }
// }
// function canvas_mouseup(e) {
//     _ismoving = false;
// }
// var _list = new ShapeList();
// var rect = new Rect(100, 100, 50, 50);
// drawRect(rect);

var isChoose = false;

function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function () {
        c.beginPath();
        c.strokeRect(this.x, this.y, this.width, this.height);
        c.stroke();
        c.closePath();
    }

    this.isSelected = function (velocity) {
        var right = this.x + this.width;
        var bottom = this.y + this.height;
        return velocity.x <= right && velocity.x >= this.x 
        && velocity.y <= bottom && velocity.y >= this.y;
    }
}

var rect = new Rect(100, 100, 50, 50);
rect.draw();

var mouse = {
    x: Infinity,
    y: Infinity,
}


document.addEventListener('mousedown', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    if(rect.isSelected(mouse)){
        isChoose = true;
    } else isChoose = false;
})

document.addEventListener('mouseup', (e) => {
    isChoose = false;
})

document.addEventListener('mousemove', (e) => {
    if (isChoose) {
        c.clearRect(0, 0, canvas.width, canvas.height)
        rect.x = e.x;
        rect.y = e.y;
        rect.draw();
    }
})

function animate() {
    requestAnimationFrame(animate);
}
animate();