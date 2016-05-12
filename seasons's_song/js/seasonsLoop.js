"object" != typeof window.CP && (window.CP = {});
window.CP.PenTimer = {
	programNoLongerBeingMonitored: !1,
	//程序不再被监视
	timeOfFirstCallToShouldStopLoop: 0,
	//第一次调用时应该停止循环
	_loopExits: {},
	//退出循环
	_loopTimers: {},
	//循环时间
	START_MONITORING_AFTER: 1000,
	//开始监测
	STOP_ALL_MONITORING_TIMEOUT: 2000,
	//停止所有的监测
	MAX_TIME_IN_LOOP_WO_EXIT: 2000,
	//退出循环的最大时间
	exitedLoop: function(o) {
		this._loopExits[o] = !0
	},
	shouldStopLoop: function(o) {
		if (this.programKilledSoStopMonitoring) return !0;
		//当前程序被终止
		if (this.programNoLongerBeingMonitored) return !1;
		//当前程序不再被监视
		if (this._loopExits[o]) return !1;
		var t = this._getTime();
					//第一次调用时应该停止循环
		if (this.timeOfFirstCallToShouldStopLoop === 0) return this.timeOfFirstCallToShouldStopLoop = t, !1;
		var i = t - this.timeOfFirstCallToShouldStopLoop;
		if (i < this.START_MONITORING_AFTER) return !1;
		if (i > this.STOP_ALL_MONITORING_TIMEOUT) return this.programNoLongerBeingMonitored = !0, !1;		
		return !1
	},
	
	_checkOnInfiniteLoop: function(o, t) {
		//检查无限循环
		if (!this._loopTimers[o]) return this._loopTimers[o] = t, !1;
		var i = t - this._loopTimers[o];
		if (i > this.MAX_TIME_IN_LOOP_WO_EXIT) throw "Infinite Loop found on loop: " + o
	},
	_getTime: function() {
		return +new Date
	}
}, window.CP.shouldStopExecution = function(o) {
	return window.CP.PenTimer.shouldStopLoop(o)
}, window.CP.exitedLoop = function(o) {
	window.CP.PenTimer.exitedLoop(o)
};

//开关门整屏切换效果
$(document).ready(function (){
	//pages：页数		scrolling：是否滚动		curPage：当前页
	var pages = $(".page").length, scrolling = false, curPage = 1;
	function flip(page){//封装翻页函数
		scrolling = true;
	    curPage = page;	    
	    $(".page").removeClass("active small previous");
        $(".page-" + page).addClass("active");
        $(".navBtn").removeClass("active");
        $(".nav-page" + page).addClass("active");
        if(page > 1){//不是第一页
            while(--page){
                if(window.CP.shouldStopExecution(1)){
                    break;
                }
                $(".page-" + page).addClass("small");
            }
            window.CP.exitedLoop(1);
        }
        setTimeout(function () {
            scrolling = false;           
        }, 700);      
    }
    function navUp() {//向上导航
    	curPage--;
        if(curPage >= 1){           
            flip(curPage);
        }
        if(curPage < 1){
            curPage = pages;
            flip(curPage);
        }
    }
    function navDown() {//向下导航
    	curPage++;
        if(curPage <= pages){            
            flip(curPage);
        }
        if(curPage > pages){
            curPage = 1;
            flip(curPage);
        }
    }
    $(document).on('mousewheel DOMMouseScroll', function (ev) {//鼠标滚动
        if (!scrolling) {//是否在滚动中
            if (ev.originalEvent.wheelDelta > 0 || ev.originalEvent.detail < 0) {
                navUp();
            } else {
                navDown();
            }
        }
    });
    $(document).on('click','.scrollBtn' ,function () {//点击上下按钮
        if (scrolling)
            return;
        if ($(this).hasClass("up")) {
            navUp();
        } else {
            navDown();
        }
    });
     $(document).on("click", ".navBtn:not(.active)", function () {//导航圆球
        if (scrolling)
            return;
        flip(+$(this).attr("data-target"));
    });
    $(document).on('keydown', function (ev) {//键盘控制 	
        if (scrolling)
            return;
        if (ev.which === 38) {
            navUp();
        } else if (ev.which === 40) {
            navDown();
        }
    });  
     $(document).on("click", ".title", function () {
     	//点击标题跳转到相关页面    	
     	
    });
})

//记录从主页面跳转时的位置
$(function(){
	var hash = window.location.hash;
	var pageHash = 1;
	var pageNow = $(".page");
	if( hash ){
		pageHash = hash.split("=")[1];
	}
	for( var i = 0; i < pageNow.length; i++ ){
		pageNow[i].index = i;
		pageNow[i].onclick = function (){
			var index = this.index;
			render( index );
		};
	}
	function render( index ){
		window.location.hash = "page="+(index+1);		
	}
})

 //  box事件
var box = getByClass('box',document);
var icon = getByClass('icon',document);
var left = getByClass('left',document);
var jottings = getByClass('jottings',document);
var halfWidth = document.body.offsetWidth/2;
for(var i = 0;i < icon.length; i++){ 
	icon[i].index = i;
	icon[i].onmouseover = function(){  
		overCor(this);
	}
	icon[i].onmouseout = function(){
		outCor(this);
	}
	icon[i].onclick = function(){
		var that = this;
		if(this.parentNode.offsetWidth == 0){
			crashMove(this.parentNode,halfWidth);
			jottings[that.index].style.display = 'block';
		}else{
			crashMove(this.parentNode,0);
			jottings[that.index].style.display = 'none';		
		}
	}
}
function overCor(obj){  // 移入换图片
	var aImg = obj.getElementsByTagName('img');
	opacity(aImg[0],{opacity:0});
	opacity(aImg[1],{opacity:100});
}
function outCor(obj){   //移出换图片
	var aImg = obj.getElementsByTagName('img');
	opacity(aImg[0],{opacity:100});
	opacity(aImg[1],{opacity:0});
}
