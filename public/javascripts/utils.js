var Point = function(x, y) {
	var that = {};

	if(x && isDefined(x.x)) {
		that.x = x.x;
		that.y = x.y;
	} else {
		that.x = x || 0;
		that.y = y || 0;
	}
	
	that.move = function(x, y) {
		var pos = Point(x, y);
		that.x += pos.x;
		that.y += pos.y;
	};

	return that;
};

var Vector = function (x, y) {
	var that = Point(x, y);

	that.magnitude = function() {
		throw new Error("TO DO");
	}

	that.scale = function(scale) {
		return Vector(that.x * scale, that.y * scale);
	}

	return that;
};

var Size = function(width, height) {
	if(width < 0 || height < 0) {
		throw new Error('width and height must be non-negative.');
	}

	var that = {};

	if(width && isDefined(width.width)) {
		that.width = width.width;
		that.height = width.height;
	} else {
		that.width = width || 0;
		that.height = height || 0;
	}

	return that;
};

var Box = function(pos, size) {
	if(!pos) {
		throw new Error('pos cannot be undefined.');
	}

	if(!size) {
		throw new Error('size cannot be undefined');
	}

	var that = Point(pos);
	var _size = Size(size);
	
	Object.defineProperty(that, "width", {
		get: function () { return _size.width; },
		set: function (value) { _size.width = value; }
	});

	Object.defineProperty(that, "height", {
		get: function () { return _size.height; },
		set: function (value) { _size.height = value; }
	});

	that.collidesWith = function(other) {
		return  that.x < other.x + other.width &&
				that.x + that.width > other.x &&
				that.y < other.y + other.height &&
				that.height + that.y > other.y;
	}

	return that;
};

var isDefined = function(obj) {
	return typeof obj !== "undefined";
};

requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;