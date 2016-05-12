function snow(x, y, s, n) {
  	this.x = x;
  	this.y = y;
  	this.s = s;//雪花大小
  	this.n = n;//形状 
  	this.img = document.createElement('canvas');
  	var context = this.img.getContext('2d');
  	this.img.height = this.img.width = this.s * 2;
  	context.translate(this.s, this.s);
  	context.rotate(Math.PI * 1/10 );
  	for (var i = 0; i < n; i++) {
	    context.lineTo(0, s);
	    context.rotate((Math.PI * 2 / (n * 2)));
	    context.lineTo(0, -s);
	    context.rotate((Math.PI * 2 / (n * 2)));
  	}
  	context.closePath();
  	context.shadowBlur = this.s * 2;
  	context.shadowColor = 'rgba(255,255,255,.9)';//阴影颜色
  	context.fillStyle = 'rgba(255,255,255,.45)';//雪花颜色
  	context.fill();
}

var canvas, context, height, width, snows;
init();

window.onresize = function(){
	init();
}

function init() {//雪花初始化
  	canvas = document.getElementById('canvas');
  	context = canvas.getContext('2d');
  	height = canvas.height = document.body.offsetHeight;
  	width = canvas.width = document.body.offsetWidth;
  	snows = [];
  	for (var i = 0; i < 200; i++) {
	    var x = Math.random() * width,
	      	y = Math.random() * height,
	      	s = Math.random() * 5 + 5,
	      	p = Math.random() * 5 + 5;
	    var s = new snow(x, y, s, p);
	   	 	s.vx = Math.random() * 2 - 1;
	    	s.vy = Math.random() * 2 + 1;
	    	s.r = Math.random() * 360;
	    	snows.push(s);
  	}

  	update();
  	render();
}
function update() {//更新
  	for (var i = 0, l = snows.length; i < l; i++) {
    	snows[i].r += snows[i].vx / 10;
    	snows[i].x += snows[i].vx;
    	snows[i].y += snows[i].vy;
	    if (snows[i].y > height) {
	      	snows[i].y = -snows[i].s;
	      	snows[i].vx = Math.random() * 2 - 1;
	      	snows[i].vy = Math.random() * 2 + 1;
	    }
  	}
  	setTimeout(update, 1000 / 60);//速度
}

function render() {//渲染
  context.clearRect(0, 0, width, height);
  for (var i = 0, l = snows.length; i < l; i++) {
    context.save();
    context.translate(snows[i].x, snows[i].y);
    context.rotate(snows[i].r);
    context.drawImage(snows[i].img, 0, 0);
    context.restore();
  }
 	setTimeout(render, 1000 / 60);
}

	//颜色搭配
	var colors = new Array("red","blue","yellow","white","black","green","pink","purple","orange","palegoldenrod","sapphire","yellowgreen");
	function changeColor(){
		var body = document.getElementById("body");
		var body1 = document.getElementById("body1");
		var body2 = document.getElementById("body2");
		var hat = document.getElementById("hat");
		var scarf = document.getElementById("scarf");
		var color = colors[Math.round(Math.random()*colors.length)];
		var color1 = colors[Math.round(Math.random()*colors.length)/2];
		var color2 = colors[Math.round(Math.random()*colors.length)/3];
		console.log(color);
		body.style.background = color;
		body1.style.background = color1;
		body2.style.background = color2;
		hat.style.borderBottomColor = color;
		hat.style.borderTopColor = color1;
		scarf.style.borderBottomColor = color;
	}
	body.onmouseover = function(){
		changeColor();
	}

