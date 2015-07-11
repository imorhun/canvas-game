var a = Date.now();







var app = document.createElement("canvas");
var ctx = app.getContext('2d');
var height = 400;
var width = 500;
app.height = height;
app.width = width;
document.body.appendChild(app);



// Если ничего нет - возвращаем обычный таймер
var requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(callback){
          	window.setTimeout(callback, 1000 / 60);
          };
}());



/************Main program *************/



var img = ['img/sprite.png', 'img/temp.bmp', 'img/background.jpg'];
loader.setOnLoadCallback(init);
loader.loadImg(img);
var lastTime;

function mainLoop() {

	var nowTime = Date.now();
	var dt = (nowTime - lastTime) / 1000; // 1 sec*/
	
	update(dt);
	render(dt);
	
	lastTime = nowTime;
	
	requestAnimFrame(mainLoop);

}

/************animCreate***********/

function AnimCreate(url, posOnSprite, sizeOnSprite, frameQuantity, dir, speed ) {
	this.url = url;
	this.pos = posOnSprite;
	this.imgSize = sizeOnSprite;
	this.dir = dir || "gorizontal";
	this.frameQuantity = frameQuantity;
	this.imIndex = 0;
	this.speed = speed || 0;

}

AnimCreate.prototype.update = function (dt) {
	this.imIndex += dt * this.speed; 
}

AnimCreate.prototype.render = function(pos) {
	var frame;
	if(this.speed > 0) {
		var indx = Math.floor(this.imIndex);
		frame = indx % this.frameQuantity;
		// if(frame > this.frameQuantity) {
		// 	frame = 0;
		// }

	} else {
		frame = 0;
	}

	/*if(this.frameQuantity) {
		if(this.imIndex >= )
			this.imIndex++;
		if(this.imIndex === this.frameQuantity) {
			this.imIndex = 0;
		}
	}*/

	var x = this.pos[0];
	var y = this.pos[1];



	if(this.dir === "gorizontal"){
		x = this.pos[0] + this.imgSize[0] * frame;
	} else {
		y = this.pos[1] + this.imgSize[1] * frame;
	}

	
	ctx.drawImage(loader.getImg(this.url), x, y, this.imgSize[0], this.imgSize[1], pos[0], pos[1], this.imgSize[0], this.imgSize[1]);

};

/**********End animCreate*********/

var player = {
	pos: [(width/2) - 25, height - 40],
	animCreate: new AnimCreate("img/sprite.png", [5,3], [31,35], 2, false, 8)

}

var bullets = [];

var playerSpeed = 150;
var enemiesSpeed = 10;
var bulletsSpeed = 200;

var enemi = {
	position: [0,0],
	animCreate: new AnimCreate ("img/sprite.png", [4,116], [24,46], 4, false, 6)
}

var enemies = 	[{
					pos: [0,0],
					animCreate: new AnimCreate ("img/sprite.png", [4,116], [24,46], 4, false, 2)
				 },
				 {
					pos: [70,200],
					animCreate: new AnimCreate ("img/sprite.png", [4,116], [24,46], 4, false, 6)
				 }
				];

function createEnemies() {

}

function render(dt) {
	renderBackground();

	
	// renderEntity(player);
	renderEntities(enemies);
	renderEntities(bullets);
	renderEntity(player);
	//player.animCreate.render(player.pos);


}

function renderEntities(list) {
	for(var i = 0, length = list.length; i < length; i++) {
		renderEntity(list[i]);
	}
}

function renderEntity(entity) {
	entity.animCreate.render(entity.pos);
}



function renderBackground() {
	ctx.fillStyle = background;
	ctx.fillRect(0, 0, app.width, app.height);

}

function update(dt){

	checkInputs(dt);
	player.animCreate.update(dt);

	updateEnemies(enemies, dt);
	updateBullets(bullets, dt)


}

function updateEnemies(list, dt) {
	for(var i = 0; i < list.length; i++) {
		updateEnemy(list[i], dt);
		deleteEntity(list, i);
	}
}

function updateEnemy(enemy, dt) {
	enemy.pos[1] += dt * enemiesSpeed;	
	enemy.animCreate.update(dt);
}

function updateBullets(list, dt) {
	for(var i = 0; i < list.length; i++) {
		updateBullet(list[i], dt);
		deleteEntity(list, i);
	}
}

function updateBullet(bullet, dt) {
	bullet.pos[1] -= dt * bulletsSpeed;
	bullet.animCreate.update(dt);
}
function deleteEntity(list, i) {
	if(list[i].pos[1] > height || list[i].pos[1] < 0 - list[i].animCreate.imgSize[1]) {
		list.splice(i, 1);
	}
}


function checkInputs(dt) {
	if(inputStatus.isPressed("Left")) {
		player.pos[0] -= dt * playerSpeed;
	}

	if(inputStatus.isPressed("Right")) {
		player.pos[0] += dt * playerSpeed;
	}

	if(inputStatus.isPressed("Up")) {
		player.pos[1] -= dt * playerSpeed;
	}

	if(inputStatus.isPressed("Down")) {
		player.pos[1] += dt * playerSpeed;
	}

	if(inputStatus.isPressed("Backspace")) {
		addBullet();
	}
}
/***************************************************test this*/
function addBullet() {
	bullets.push({
		pos: [player.pos[0] + player.animCreate.imgSize[0]/2 - 5,
			 player.pos[1] - 5],			/*CHANGE*/
		animCreate: new AnimCreate ("img/sprite.png", [7,74], [11,33], 5, false, 16)
	});
}

function randomPos() {
    var rand = Math.random() * (width + 1) - 0.5
    rand = Math.round(rand);
    return rand;
  }


var background;
var lastTime;

function init(){
	lastTime = Date.now();
	console.log("init allImgLoag");
	background = ctx.createPattern(loader.getImg('img/background.jpg'), "repeat");

		
	mainLoop();
	document.getElementById('restart').addEventListener('click', function(){
		//reset();
	});



}
/************End main program *************/




var b = Date.now();

console.log(b - a + "ms");