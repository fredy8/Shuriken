var Map = function(bgImage) {
	var that = {};

	that.entities = [];
	that.update = function(modifier) {
		for (var i = 0; i < that.entities.length; i += 1) {
			that.entities[i].update(modifier);
		}
	};

	that.draw = function(renderer) {
		renderer.draw(bgImage);
		for (var i = 0; i < that.entities.length; i += 1) {
			renderer.draw(that.entities[i].image, that.entities[i]);
		}
	};

	return that;
}