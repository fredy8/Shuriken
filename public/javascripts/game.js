requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

var bg = entity("images/background.png", canvas.width, canvas.height);
var hero = entity("images/hero.png", 32, 32);
hero.speed = 256;

var monsters = [];
var entities = [bg, hero];

var monstersCaught = 0;

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var spawnMonster = function () {
	var monster = entity("images/monster.png", 32, 32);
	monster.x = (Math.random() * (canvas.width - monster.width));
	monster.y = (Math.random() * (canvas.height - monster.height));
	monsters.push(monster);
}

var reset = function () {
	hero.x = bg.width / 2;
	hero.y = bg.height / 2;

	monsters = [];
	for(var i = 0; i < 3; i += 1) {
		spawnMonster();
	}
};

var update = function (modifier) {
	if (38 in keysDown) {
		if (hero.y > 0) {
			hero.y -= hero.speed * modifier;
		} else {
			hero.y = 0;
		}
	}
	if (40 in keysDown) {
		if (hero.y + 32 < canvas.height) {
			hero.y += hero.speed * modifier;
		} else {
			hero.y = canvas.height - 32;
		}
	}
	if (37 in keysDown) {
		if (hero.x > 0) {
			hero.x -= hero.speed * modifier;
		} else {
			hero.x = 0;
		}
	}
	if (39 in keysDown) {
		if (hero.x + 32 < canvas.width) {
			hero.x += hero.speed * modifier;
		} else {
			hero.x = canvas.width - 32;
		}
	}

	for(var i = 0; i < monsters.length; i += 1) {
		var monster = monsters[i];
		if (hero.collidesWith(monster)) {
			monstersCaught += 1;
			monsters.splice(i, 1);
			i -= 1;
			spawnMonster();
		}
	}
	
};

var render = function () {
	for(var i = 0; i < entities.length; i += 1) {
		if (entities[i].imgLoaded) {
			ctx.drawImage(entities[i].image, entities[i].x, entities[i].y);
		}
	}

	for(var i = 0; i < monsters.length; i += 1) {
		if (monsters[i].imgLoaded) {
			ctx.drawImage(monsters[i].image, monsters[i].x, monsters[i].y);
		}
	}

	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.testBaseline = "top";
	ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
};

var then;
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
	requestAnimationFrame(main);
}

then = Date.now();
reset();
main();
