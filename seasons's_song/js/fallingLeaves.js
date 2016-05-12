window.onload = function(){
	function int(){//函数初始化
		img.innerHTML = '';							
		i = 1;
		score = 0;
		Points = 0;		
		oBtn.value = '开始游戏'
		oBtn.disabled = false;
	}
	var h = document.documentElement.clientHeight || document.body.scrollHeight;
	var score = 0;
	var Points = 0;
	var i = 1;
	var leaves = document.getElementById("leaves");
	var container = document.getElementById("container");
	var oBtn = document.getElementsByTagName('input')[0];
	var timer = null;
	var width = parseInt(getStyle(leaves, 'width'));
	var arrLeaves = ['img/autumn/1.png', 'img/autumn/2.png', 'img/autumn/3.png', 'img/autumn/4.png', 'img/autumn/5.png', 'img/autumn/6.png', 'img/autumn/7.png', 'img/autumn/8.png'];
	leaves.style.height = h +"px";	
	oBtn.onclick = function leaves() {
		console.log(width,h);
		oBtn.disabled = true;
    	oBtn.value = '点击下落的叶子';		
		var x = Math.round(Math.random() * (width - 80));//随机数，使图片出现的位置随机生成
		var n = Math.floor(Math.random() * arrLeaves.length);//随机数，图片随机出现
		var aImg = document.getElementsByTagName('img');
		img.innerHTML = '<img style="position:absolute; top:0px; left:' + x + 'px;" src="' + arrLeaves[n] + '" />';//把图片放入div中，并通过绝对定位来控制其出现的位置，用下标控制出现的图片
		doMove(aImg[0], 'top', i, h-40, function() {//运动函数
			Points++;
			if (Points < 3) {//失分小于3分时，游戏框抖动，继续出现图片
				shake(oBtn, 'top');//回调抖动函数
				leaves()	//回调整个函数							
			}else{//失败，初始化函数				
				alert("秋天的落叶一片一片");
				int()//回调初始化函数
			}														
		});
		aImg[0].onmousedown = function() {
			score++;
			if (score < 10) {//分数小于10分时
				var _this = this;//点击后，当前指向的图片指向get.png
				_this.src = 'img/autumn/get.png';
				clearInterval(_this.timer);//同时清除当前图片运动函数的定时器
				shake(_this, 'left', function() {//图片抖动
					i++;//运动速度增加
					leaves()//回调整个函数					
				})
			} else{
				alert("停车坐爱枫林晚，霜叶红于二月花")
					int()//回调初始化函数。
			}												
		}
	}
}


	var number = 30;//落叶数量
	function init(){//初始化
		var leaves = document.getElementById("leaves");
		 for (var i = 0; i < number; i++) {	   
	        leaves.appendChild(createLeaf());
	    }
	}

	//随机整数
	function randomInteger(low, high){
	    return low + Math.floor(Math.random() * (high - low));
	}
	//随机浮动的位置
	function randomFloat(low, high){
	    return low + Math.random() * (high - low);
	}
	//元素大小
	function pixelValue(value){
	    return value + 'px';
	}
	//持续时间
	function durationValue(value){
	    return value + 's';
	}
	function createLeaf(){   
	    var leafDiv = document.createElement('div');
	    var image = document.createElement('img');
	    var width = document.body.offsetWidth;
	   	//随机图片
	    image.src = 'img/autumn/' + randomInteger(1, 8) + '.png';
	    
	    leafDiv.style.top = "-100px";
	
	    /*出现的位置 宽度 */
	    leafDiv.style.left = pixelValue(randomInteger(0, width));
	    
	    /*顺逆时针 */
	    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
	    
	    /* 动作名字 */
	    leafDiv.style.MozAnimationName = 'fade, drop';
	    image.style.MozAnimationName = spinAnimationName;
	    leafDiv.style.webkitAnimationName = 'fade, drop';
	    image.style.webkitAnimationName = spinAnimationName;
	    
	    /* 坠落持续时间 */
	    var fadeAndDropDuration = durationValue(randomFloat(5, 11));
	    
	    /* 旋转持续时间 */
	    var spinDuration = durationValue(randomFloat(4, 8));	 
	    leafDiv.style.MozAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
	    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
	
	    var leafDelay = durationValue(randomFloat(0, 5));
	    leafDiv.style.MozAnimationDelay = leafDelay + ', ' + leafDelay;
	    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
	
	    image.style.MozAnimationDuration = spinDuration;
	    image.style.webkitAnimationDuration = spinDuration;
	
	    leafDiv.appendChild(image);
	    return leafDiv;
	}
	window.addEventListener('load', init, false);

