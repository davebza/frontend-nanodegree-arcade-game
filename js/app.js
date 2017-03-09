//random generator for numbers. Should it be part of the enemy object definition?
function setSpeed() {
    return Math.random() * (500 - 150) + 150;
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = setSpeed();
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x+(this.speed * dt);
    if (this.x > 480){
        this.x = 0;
        this.speed = setSpeed();
    }
    return this.x;
};

Enemy.prototype.drawBox = function (x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.drawBox(this.x, this.y+77, 100, 67, "red");
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = 200;
    this.boxWidth = 69;
    this.boxHeight = 79;
    this.boxXvalue = this.x + 16;
    this.boxYvalue = this.y + 61;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.drawBox = function (x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

Player.prototype.checkCollisions = function(){
    var playerBox = {x:this.boxXvalue, y:this.boxYvalue, width:this.boxWidth, height: this.boxHeight};
    console.log(playerBox);
};

Player.prototype.updateHitBoxXvalue = function () {
    this.boxXvalue = this.x + 16;
};

Player.prototype.updateHitBoxYvalue = function(){
    this.boxYvalue = this.y + 61;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.handleInput = function(direction) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    switch(direction){
        case "left":
            this.x -=100;
            this.updateHitBoxXvalue();
            break;
        case "right":
            this.x +=100;
            this.updateHitBoxXvalue();
            break;
        case "up":
            this.y -=90;
            this.updateHitBoxYvalue();
            break;
        case "down":
            this.y +=90;
            this.updateHitBoxYvalue();
            break;
    }
};

Player.prototype.reset = function(){
    this.y = 515;
    this.x = 200;
};

Player.prototype.update = function(dt) {
        //dectect x edges and make sure player stays in bounds:
        if (this.x < 0 || this.x > 400) {
        if(this.x < 0){
            this.x = 0;
        }
        else{
            this.x = 400;
        }
    }
    //detect y bounds and make sure player stays in bounds:
    if (this.y < 0 || this.y > 550) {
        if(this.y < 0){
            this.reset();
        }
        else{
            this.y = 550;
        }
    }
    this.checkCollisions();
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.drawBox(this.boxXvalue, this.boxYvalue, this.boxWidth, this.boxHeight, "purple");
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player - home square is 200, 515
var player = new Player(200, 515);
var allEnemies = [];

// enemy start positions: top row: 0, 140; mid row: 0, 220; bottom row: 0, 310;
var enemyTop = new Enemy(0,140);
var enemyMiddle = new Enemy(0, 220);
var enemyBottom = new Enemy(0, 310);
allEnemies.push(enemyTop, enemyMiddle, enemyBottom);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
