var entity = function(imgSrc, width, height, x, y) {
	x = x || 0;
	y = y || 0;

	var img = new Image();
	var obj = {
		x: x,
		y: y,
		width: width,
		height: height,
		image: img,
		imgLoaded: false,
		collidesWith: function(other) {
			return  obj.x < other.x + other.width &&
					obj.x + obj.width > other.x &&
					obj.y < other.y + other.height &&
					obj.height + obj.y > other.y;
		}
	}
	
	img.onload = function() {
		obj.imgLoaded = true;
	}

	img.src = imgSrc;

	return obj;
}