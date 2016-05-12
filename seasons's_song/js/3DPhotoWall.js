var rotX = 40;//中心点
var rotY = -30;
var currX = 0;
var currY = 0;
tracking = false;//切换鼠标拖拽 	移动

$(document).ready(function() {
  
  	diff = $('.container').width() - $('.container').height();
  	$('.container .inner').css({marginTop: '-'+diff/2+'px'})

  	setBindings();
  
  	setRotation(0,0);
});

function unsetBindings() {
  	$('body, li').off();
}

function setBindings() {
  	$('body').on('mousedown touchstart', function(e) {
    	if (e.type == "touchstart") {
     		interactionStart(e.originalEvent.touches[0].clientX, e.originalEvent.touches[0].clientY);
    	} else {
      		interactionStart(e.clientX, e.clientY);
    	}
    	e.preventDefault();
 	});
  	$('body').on('mousemove touchmove', function(e) {
    	if (e.type == "touchmove") {
      		interactionMove(e.originalEvent.touches[0].clientX, e.originalEvent.touches[0].clientY);
    	} else {
      		interactionMove(e.clientX, e.clientY);
    	}
    	e.preventDefault();
  	});

  	$('body').on('mouseup touchend', function(e) {
    	interactionEnd();
    	e.preventDefault();
  	});
   	$('.top').on('click', function() {
      	$('.container').addClass('anim');
      	rotX = 0;
      	rotY = -90;
      	setRotation(0,0);    
  	})
   	$('.right').on('click', function() {
      	$('.container').addClass('anim');
      	rotX = -90;
      	rotY = 0;
      	setRotation(0,0);
    
  	})
   	$('.bottom').on('click', function() {
      	$('.container').addClass('anim');
      	rotX = 0;
      	rotY = 90;
      	setRotation(0,0);
  	})
   	$('.left').on('click', function() {
      	$('.container').addClass('anim');
      	rotX = 90;
 	 	rotY = 0;
      	setRotation(0,0);
  	})
  	$('.front').on('click', function() {
      	$('.container').addClass('anim');
      	rotX = 0;
      	rotY = 0;
      	setRotation(0,0);
  	})
  	$('.back').on('click', function() {
 	 	$('.container').addClass('anim');
      	rotX = -180;
      	rotY = 0;
      	setRotation(0,0);
  })
}

function interactionStart(x, y) {
  currX = x;
  currY = y;
  tracking = true;
  $('.container').addClass('tracking');
}

function interactionMove(x, y) {//拖拽移动的距离
  if (tracking == false) {
    return;
  }
  var deltaX = x - currX;
  var deltaY = y - currY;
  setRotation(deltaX, deltaY);
  currX = x;
  currY = y;
}

function setRotation(x, y) {//旋转角度动画
  if (tracking == false) {
    unsetBindings();
    setTimeout(function() {
    setBindings();
      $('.container').removeClass('anim');
    }, 1000);
  }
  rotX+=x;
  rotY+=y;
  if (rotX >= 180) {
    rotX-=360;
  } else if (rotX <= (-179)) {
    rotX+=360;
  }
  
  if (rotY >= 90) {
    rotY = 90;
  } else if (rotY <= (-90)) {
    rotY = -90;
  }
  
  var radX = 0;
  var radZ = 0; 
  var radY = 0;
  
  $('.container .inner').css({transform:'rotateX('+rotY+'deg) rotateY('+rotX+'deg) translate3d('+radX+'px,'+radY+'px,'+radZ+'px)'});
}

function interactionEnd() {
  tracking = false;
  $('.container').removeClass('tracking');
}