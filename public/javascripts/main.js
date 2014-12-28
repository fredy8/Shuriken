(function () {
	'use strict';

	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 800;
	canvas.height = 600;
	document.body.appendChild(canvas);

	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

	var renderer = Renderer(ctx);
	var game = Game(Size(canvas.width, canvas.height));

	var then;
	var loop = function () {
		var now = Date.now();
		var delta = now - then;

		game.update(delta / 1000, keysDown);
		game.draw(renderer);

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