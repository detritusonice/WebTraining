function init() {
	document.addEventListener('click',function(event) {
		if (event.target.classList.contains('ball')) {
			ballClick(event.target);
		}
		else if (event.target.id=='button') {
			buttonClick(envent.target);
		}
	},false);
	animate();
}

function ballClick( ball ) {
	var praise=document.getElementById("praise");
	praise.innerHTML="Well done, you clicked the "+ball.innerHTML+" ball!";
	//var style=getStyle(ball);
	//ball.style.setProperty("animation-iteration-count","0");
}

function getStyle( element ) {
	if (element.currentStyle )//IE
		return element.currentStyle;
	return document.defaultView.getComputedStyle(element,null);
}

function animate() {
	var y=10.;
	var v=0.;
	var g=0.5;
	var stop=false;

	var ball=document.getElementById("ball2");
	var id=setInterval( motionFrame,10);
	function motionFrame() {
		if (stop)
			clearInterval(id);
		else {
			v+=g;
			y+=v;
			if (y>=300) {
				v=-v;
				y=2.*300. -y;
			}
			ball.style.top=Math.floor(y)+"px";
		}
	}
}
