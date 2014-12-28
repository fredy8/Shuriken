var Entity = function(image, pos, size) {
	if(!image) {
		throw new Error('image cannot be undefined.');
	}

	if(!pos) {
		throw new Error('pos cannot be undefined.');
	}

	if(!size) {
		throw new Error('size cannot be undefined.');
	}

	var that = Box(pos, size);
	that.image = image;
	that.speed = Vector();
	that.update = function(modifier) {
		that.move(that.speed.scale(modifier));
	}

	return that;
}