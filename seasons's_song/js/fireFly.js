//背景变换
$(document).ready(function(){
	(function($){			   
		var	$canvas = $('#canvas');
		var	$canvas2 = $('#canvas2');
		var	$canvas3 = $('#canvas3');
		var	ctx = $canvas[0].getContext('2d');
		var	ctx2 = $canvas2[0].getContext('2d');		
		var	w = $(window).width(); 
		var h = $(window).height();
		var	ww = $(window).width()/2;
		var hh = $(window).height()/2;
		var	img = new Image();
		$canvas.width(ww);
		$canvas.height(hh);
		$canvas3.width(w);
		$canvas3.height(h);
		//console.log(w,h,ww,hh);
			var	Puff = function(p) {				
				var	opacity,
					sy = (Math.random()*hh)>>0,
					sx = (Math.random()*ww)>>0;				
				this.p = p;						
				this.move = function(timeFac) {						
					p = this.p + 0.3 * timeFac;				
					opacity = (Math.sin(p*0.05)*0.6);						
					if(opacity <0) {
						p = opacity = 0;
						sy = (Math.random()*hh)>>0;
						sx = (Math.random()*ww)>>0;
					}												
					this.p = p;																			
					ctx.globalAlpha = opacity;						
					ctx.drawImage($canvas3[0], sy+p, sy+p, ww-(p*2),hh-(p*2), 0,0, w,h);								
				};
			};
			
			var	puffs = [];			
			var	sortPuff = function(p1,p2) { return p1.p-p2.p; };	
			puffs.push( new Puff(0) );
			puffs.push( new Puff(20) );
			puffs.push( new Puff(40) );
			//console.log(puffs);
			var	newTime, oldTime = 0, timeFac;
					
			var	loop = function()
			{								
				newTime = new Date().getTime();				
				if(oldTime === 0 ) {
					oldTime=newTime;
				}
				timeFac = (newTime-oldTime) * 0.1;
				if(timeFac>3) {timeFac=3;}
				oldTime = newTime;						
				puffs.sort(sortPuff);							
				
				for(var i=0;i<puffs.length;i++)
				{
					puffs[i].move(timeFac);	
				}					
				ctx2.drawImage( $canvas[0] ,0,0,w,h);				
				setTimeout(loop, 10 );				
			};
			var	$canvas3 = $('#canvas3');
			var	ctx3 = $canvas3[0].getContext('2d');
			$(img).bind('load',null, function() {  ctx3.drawImage(img, 0,0, w, h);	loop(); });
			img.src = 'img/summer/firefly-nights.jpg';
		
	})(jQuery);	 
});
//拖拽封装
$(function(){
	var w = $(window).width();
	var h = $(window).height();
	var n = 20;
	var a = Math.round(Math.random() * w/n);
	var b = Math.round(Math.random() * h/(n/2));
	for (var i = 0; i < n; i++) {
	    $("#div").append("<div class='fireFly' style='top:" + Math.round(Math.random() * b*i) + "px; left:" + a*i + "px;'></div>");
	   
	}	
	var fireFly = $(".fireFly");
	var img = $(".img");
	var x = 0;
	var y = 0;
	var arr = [{ 
	x: fireFly.offset().left, 
	y: fireFly.offset().top 
	}]; 	
	fireFly.mousedown(function(ev){
		x = ev.pageX - fireFly.offset().left;
		y = ev.pageY - fireFly.offset().top;
		$(document).mousemove(function(ev){
			var left = ev.pageX - x ;
			var top = ev.pageY - y;
			if (left <= 0) {
			    left = 0;					    
			}
			if (top <= 0) {
			    top = 0;					    
			}
			if (left >= $(window).width() - fireFly.innerWidth()) {
			    left = $(window).width() - fireFly.innerWidth();
			}
			if (top >= $(window).height() - fireFly.innerHeight()) {
			    top = $(window).height() - fireFly.innerHeight();
			}
			fireFly.css({
				left:left,
				top:top
			})
			arr.push({ 
				x: left, 
				y: top 
			}); 
			if( collide(fireFly,img)){
				img.css("box-shadow","0px 10px 30px 20px #ADFF2F");				
			}				
			ev.preventDefault();
		})		
		$(document).mouseup(function(){
			$(document).unbind("mousedown mousemove");
			if( !collide(fireFly,img)){
				var timer = setInterval(function() {
					var arr1 = arr.pop();
					arr1 ? (fireFly.css({left : arr1.x + "px", top : arr1.y + "px"})) : clearInterval(timer);
					img.css("box-shadow","none");				
				},30); 
			}									
		})
	})
})
/*	
	碰撞检测
	obj1 拖拽的元素
	obj2 被碰撞的元素
*/
function collide( obj1,obj2 ){
	var obj1W = obj1.innerWidth();
	var obj1H = obj1.innerHeight();
	var obj1L = obj1.offset().left;
	var obj1T = obj1.offset().top;

	var obj2W = obj2.innerWidth();
	var obj2H = obj2.innerHeight();
	var obj2L = obj2.offset().left;
	var obj2T = obj2.offset().top;
	console.log(obj1W,obj1H,obj2W,obj2H);
	//碰上返回true 否则返回false
	if( obj1W+obj1L>obj2L && obj1T+obj1H > obj2T && obj1L < obj2L+obj2W && obj1T<obj2T+obj2H ){
		return true
	}else{
		false;
	}

}