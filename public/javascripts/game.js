var Game = function(dimension) {
	var that = {};

	var map = Map("images/background.png");

	var hero = Entity("images/hero.png", Point(50, 50), Size(200, 200));
	map.entities.push(hero);

	var spawnMonster = function () {
		var monster = Entity("images/monster.png", Point(200, 200), Size(32, 32));
		monster.isMonster = true;
		monster.x = (Math.random() * (dimension.width - monster.width));
		monster.y = (Math.random() * (dimension.height - monster.height));
		map.entities.push(monster);
	}

	for (var i = 0; i < 10; i += 1) {
		spawnMonster();
	}

	var monstersCaught = 0;

	var movement = {
		37: Vector(-1, 0), // left
		38: Vector(0, -1), // up
		39: Vector(1, 0), // right
		40: Vector(0, 1) // down
	}

	that.update = function (modifier, keysDown) {
		for (var key in keysDown) {
			if(key in movement) {
				hero.move(movement[key].scale(250 * modifier));
			}
		}

		for (var i = 0; i < map.entities.length; i += 1) {
			var entity = map.entities[i];
			if(entity.isMonster) {
				if (hero.collidesWith(entity)) {
					monstersCaught += 1;
					map.entities.splice(i, 1);
					i -= 1;
					spawnMonster();
				}
			}
		}
	}

	that.draw = function (renderer) {
		map.draw(renderer);
		renderer.write("Monsters caught: " + monstersCaught, Point(32, 32));
	};

	return that;
};