(function() {
	function ol(canvas, options) {
		return new OL(canvas, options)._init();
	};

	function OL(canvas, options) {
		var options = options || {};
		this.canvas = canvas;
		this.W = options.width || 500;
		this.H = options.height || 500;
		this.NUM = options.num || 500;
		this.balls = [];
	}

	OL.prototype._init = function() {
		var self = this;
		self.createBalls() && requestAnimationFrame(self._animate.bind(self))
	}

	OL.prototype.createBalls = function() {
		var self = this,
			canvas = self.canvas;
		if (canvas.getContext) {
			var cxt = canvas.getContext('2d');
			for (var i = 0; i < self.NUM; i++) {
				var tempR = Math.floor(Math.random() * 255);
				var tempG = Math.floor(Math.random() * 255);
				var tempB = Math.floor(Math.random() * 255);
				var tempColor = 'rgb(' + tempR + ',' + tempG + ',' + tempB + ')';
	            var tempX = Math.floor(Math.random() * self.W);
	            var tempY = Math.floor(Math.random() * self.H);
	            var tempR = Math.floor(Math.random() * 60);
	            var tempBall = {
	            	x: tempX,
	            	y: tempY,
	            	r: tempR,
	                stepX: Math.floor(Math.random() * 4 -2),
	                stepY: Math.floor(Math.random() * 4 -2),
	                color: tempColor
	            };
	            self.balls.push(tempBall);
			}
			return true;
		}
		return false;
	}

	OL.prototype._animate = function() {
	    var self = this;
	    self.updateBalls();
	    self.renderBalls();
	    requestAnimationFrame(self._animate.bind(self));
	}

	OL.prototype.updateBalls = function() {
	    var self = this,
	    	balls = self.balls;
	    	len = balls.length;
        for(var i = 0; i < len; i++){
		    balls[i].x += balls[i].stepX;
		    balls[i].y += balls[i].stepY; 
		    self.bumpTest(balls[i]);
		}
	}

	OL.prototype.renderBalls = function() {
	    var self = this,
	    	canvas = self.canvas,
	    	balls = self.balls,
	    	len = balls.length;
        canvas.height = self.H;
        var cxt = canvas.getContext('2d');
        for(var i = 0; i < len; i++){
            cxt.beginPath();
            cxt.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2 * Math.PI);
            cxt.fillStyle = balls[i].color;
            cxt.globalCompositeOperation = 'xor';
            cxt.closePath();
            cxt.fill();
        }        
	}

	OL.prototype.bumpTest = function(ele) {
	    var self = this,
	    	W = self.W,
	    	H = self.H;
	    if(ele.x <= ele.r){
	        ele.x = ele.r;
	        ele.stepX = -ele.stepX;
	    }
	    if(ele.x >= W - ele.r){
	        ele.x = W - ele.r;
	        ele.stepX = -ele.stepX;
	    }
	    if(ele.y <= ele.r){
	        ele.y = ele.r;
	        ele.stepY = -ele.stepY;
	    }
	    if(ele.y >= H - ele.r){
	        ele.y = H - ele.r;
	        ele.stepY = -ele.stepY;
	    }
	}

	window.ol = ol;
})();