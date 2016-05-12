//获取元素属性
function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]
}
//运动函数封装
function doMove(obj, attr, dir, target, endFn) {
	dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var speed = parseInt(getStyle(obj, attr)) + dir;
		if (speed > target && dir > 0 || speed < target && dir < 0) {
			speed = target
		}
		obj.style[attr] = speed + 'px';
		if (speed == target) {
			clearInterval(obj.timer);
			endFn && endFn()
		}
	},30)
}
//抖动函数封装
function shake(obj, attr, endFn) {
	if (obj.onOff) return;
	obj.onOff = true;
	var pos = parseInt(getStyle(obj, attr));
	var arr = [];
	var num = 0;
	var timer = null;
	for (var i = 12; i > 0; i -= 2) {
		arr.push(i, -i)
	}
	arr.push(0);
	clearInterval(obj.shake);
	obj.shake = setInterval(function() {
		obj.style[attr] = pos + arr[num] + 'px';
		num++;
		if (num === arr.length) {
			clearInterval(obj.shake);
			endFn && endFn();
			obj.onOff = false
		}
	}, 50)
}
function opacity(obj,json,endFn){//透明度变化函数
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bBtn = true;
		for(var attr in json){
			var iCur = 0;
			if(attr == 'opacity'){
				if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){
				iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
				
				}
				else{
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
				}	
			}
			else{
				iCur = parseInt(getStyle(obj,attr)) || 0;
			}
			
			var iSpeed = (json[attr] - iCur)/8;
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur!=json[attr]){
				bBtn = false;
			}
			
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
				obj.style.opacity = (iCur + iSpeed)/100;
				
			}
			else{
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}
		
		if(bBtn){
			clearInterval(obj.timer);
			
			if(endFn){
				endFn.call(obj);
			}
		}
		
	},30);

}
function getByClass(sClass,parent){    //用className来获取元素的函数
	var aEles = (parent||document).getElementsByTagName('*');
	var arr = [];
	
	for(var i=0; i<aEles.length; i++){
		
		var aClass = aEles[i].className.split(' ');
	
		for(var j=0; j<aClass.length; j++){
			
			if(aClass[j] == sClass){
			
				arr.push(aEles[i]);	
				break;			
			}			
		}	
	}
	return arr;
}
function crashMove(obj,iTarget){   //碰撞弹性运动
		
	obj.iSpeed = 0;
	obj.iNow = 0;
	
	var num = 4;
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		if( obj.offsetWidth < iTarget ){
			num = 4;
		}
		else if(obj.offsetWidth > iTarget){
			num = -4;
		}
		
		obj.iSpeed += num;
		
		var W = obj.offsetWidth + obj.iSpeed;
		
		if( (W > iTarget && num > 0) || (W < iTarget && num < 0) ){
			
			obj.iNow++;
			
			W = iTarget;
			obj.iSpeed *= -1;
			obj.iSpeed *= 0.55;
			
			if(obj.iNow==2){
				clearInterval(obj.timer);
			}	
		}
		else{
			
			obj.iNow = 0;
		}	
		obj.style.width = W + 'px';	
	},30);	
}