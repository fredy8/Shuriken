var point = function(x, y) {
	var _x = x || 0;
	var _y = y || 0;

	return {
		getX: function() {
			return _x;
		},
		getY: function() {
			return _y;
		},
		setX: function(x) {
			_x = x;
		},
		setY: function(y) {
			_y = y;
		}
	}
}