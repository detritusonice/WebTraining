function init() {
	document.addEventListener("click",
		function(event) {
			if ( event.target.classList.contains('box')){
				growBoxShadow(event.target);
			}
		},false);
}

function growBoxShadow( element ) {
	var style=getStyle(element);
	if (style.boxShadow=="none") {
		element.style.boxShadow="0px 0px 10px 10px #ffff44";
	}
	else {
		var start=style.boxShadow.indexOf("0px");//find first occurrence. firefox places color first, along with some spaces
		var pre=style.boxShadow.slice(0,start);
		var shadow=style.boxShadow.slice(start,style.boxShadow.length);

		var parr=shadow.split(' ');
		var grow=parseInt(parr[3].slice(0,parr[3].indexOf('px')),10);

		grow+=10;
		parr[3]=grow.toString()+"px";

		shadow=pre;
		for (var i=0;i<2;i++)
			shadow+=' '+parr[i];
		for (var i=0;i<2;i++)
			shadow+=' '+parr[3];

		element.style.boxShadow=shadow;
	}
}

function getStyle( element) {
	if (element.currentStyle)
		return element.currentStyle;
	return document.defaultView.getComputedStyle(element,null);
}


					

