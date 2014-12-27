requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
}

bgImage.src = "images/background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
}

heroImage.src = "../images/hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
}

monsterImage.src = "images/monster.png";

var hero = {
	speed: 256,
	x: 0,
	y: 0
};

var monster = {
	x: 0,
	y: 0
};

var monstersCaught = 0;

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var spawnMonster = function () {
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
}

var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	spawnMonster();	
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

	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		monstersCaught += 1;
		spawnMonster();
	}
};

var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
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
