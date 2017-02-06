# canvas-overlap

一个canvas画的重叠透明demo

## Basic Usage
```js
	var canvas = document.getElementById('canvas'); // canvas节点
	var options = {
		width: 500, // 圆的水平活动范围
		height: 300, // 圆的垂直活动范围
		num: 12 // 圆的个数
	};

	ol(canvas, options);
```