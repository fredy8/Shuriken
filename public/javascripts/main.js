(function () {
	'use strict';

	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 800;
	canvas.height = 600;
	document.body.appendChild(canvas);

	var keyEvents = {
		down: {},
		justPressed: {},
		justReleased: {}
	};

	addEventListener("keydown", function (e) {
		keyEvents.down[e.keyCode] = true;
		keyEvents.justPressed[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keyEvents.down[e.keyCode];
		keyEvents.justReleased[e.keyCode];
	}, false);

	var renderer = Renderer(ctx);
	var game = Game(Size(canvas.width, canvas.height));

	var then;
	var loop = function () {
		var now = Date.now();
		var delta = now - then;

		game.update(delta / 1000, keyEvents);
		game.draw(renderer);

		keyEvents.justPressed = {};
		keyEvents.justReleased = {};

		then = now;
		requestAnimationFrame(loop);
	}

	var imgSrcs = ['background', 'hero', 'monster'].map(function (val) {
		return 'images/' + val + '.png';
	});

	renderer.loadImages(imgSrcs, function () {
		then = Date.now();
		loop();
	});
}());