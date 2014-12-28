var Renderer = function(ctx) {
	var that = {};
	var images = {};

	ctx.efillStyle = "rgb(0, 0, 0)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.testBasline = "top";

	that.write = function (text, x, y) {
		var pos = Point(x, y);
		ctx.fillText(text, pos.x, pos.y);
	};

	/**
	* image, box |
	* image, point
	* image, point, size |
	* image, point, width, height |
	* image, x, y, size |
	* image, x, y, width, height
	**/
	that.draw = function (image, x, y, width, height) {
		if(!(image in images)) {
			throw new Error("Images should be preloaded.");
		}
		
		var pos, size;
		if(x && !isUndefined(x.x) && !isUndefined(x.width)) {
			pos = Point(x);
			size = Size(x);
		} else if(x && !isUndefined(x.x)) {
			pos = Point(x);
			size = isUndefined(y) ? images[image] : Size(y, width);
		} else {
			pos = Point(x, y);
			size = isUndefined(width) ? images[image] : Size(width, height);
		}

		ctx.drawImage(images[image], pos.x, pos.y, size.width, size.height);
	}

	that.loadImages = function (imgSrcs, done) {
		var imagesLoaded = 0;
		var onImageLoaded = function() {
			imagesLoaded += 1;
			if(imagesLoaded === imgSrcs.length) {
				done();
			}
		}

		for (var i = 0; i < imgSrcs.length; i += 1) {
			images[imgSrcs[i]] = new Image();
			images[imgSrcs[i]].onload = onImageLoaded;
			images[imgSrcs[i]].src = imgSrcs[i];
		}
	}

	return that;
}