// javascript functions for colorboxes
// 7/Jan/2019

var prev; //will contain the previous element to adjust "glow"
//called upon body loading. sets initial values and event handler functions
function init() {
	prev=undefined;
	document.addEventListener('mouseover', function( event) { //lambda event handler function
		if ( event.target.classList.contains('colorbox')) {
			handleBox(event.target);
		}
	},false);

	createElements();
}
//create the html element structure
function createElements() {
	var floor=document.createElement("div");
	floor.id="dancefloor";
	document.body.appendChild(floor);

	for (var i=0;i<14;i++) {
		var strip=document.createElement("div");
		strip.classList.add("strip");

		for (var j=0;j<20;j++) {
			var box=document.createElement("div");
			box.classList.add("colorbox"); 	
			box.id="box"+i.toString()+"_"+j.toString();
			box.style.zIndex=1;
			strip.appendChild(box);
		}
		floor.appendChild(strip);
	}
}

//genereate hex string of random color, not too dark, not too light
function randomColor() {
	var r=(32+Math.floor(200*Math.random())).toString(16);
	var g=(32+Math.floor(200*Math.random())).toString(16);
	var b=(32+Math.floor(200*Math.random())).toString(16);
	return "#"+r+g+b;
}
// event handler for colorboxes	
function handleBox( element ) {
	if (prev==element) return;
	if (prev!=null) {
		prev.style.boxShadow="none";
		prev.style.zIndex=1;
	}
	element.style.backgroundColor=randomColor();
	element.style.zIndex=100000;
	element.style.boxShadow="0px 0px 10px 5px #eeeeee";
	prev=element;
}
