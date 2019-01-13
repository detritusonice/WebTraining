function init() {
	pushable=true;
	for (var i=1;i<3;i++)
		makeDie("die_"+i.toString(10));

	document.addEventListener("mouseover", function( event ) {
		if (event.target.id=="pushbutton") 
			event.target.style.backgroundColor="#ffaa00";
	},false);

	document.addEventListener("mouseout",function(event) {
		if (event.target.id=="pushbutton") 
			event.target.style.backgroundColor="#dd8800";
	},false);

	document.addEventListener("mousedown",function(event) {
		if (event.target.id=="pushbutton" && pushable) { 
			event.target.style.backgroundColor="#ffdd00";
			event.target.innerHTML="Rolling...";
			buttonClicked();
		}
	},false);

	document.addEventListener("mouseup",function(event) {
		if (event.target.id=="pushbutton") { 
			event.target.style.backgroundColor="#ffaa00";
		}
	},false);

	setDieFace("die_1",6);
	setDieFace("die_2",6);
}


function makeDie( id ) {
	var die= document.getElementById(id);
	for (var i=0;i<7;i++) {
		var pimple=document.createElement("div");
		pimple.id=id+"_"+i.toString(10);
		if (i<6) {
			pimple.style.top=(25+60*Math.floor(i/2)).toString(10)+"px";
			pimple.style.left=(25 + 120*(i%2)).toString(10)+"px";
		}
		else {
			pimple.style.top="85px";
			pimple.style.left="85px";
		}
		pimple.classList.add("pimple");
		die.appendChild(pimple);
	}

}

function diceRoll() {
	var d1=Math.floor(1+5.9999999*Math.random());
	var d2=Math.floor(1+5.9999999*Math.random());
	var header= document.getElementById("header");
	header.innerHTML="You rolled: "+d1.toString(10) + ", "+ d2.toString(10);
	header.classList.remove("shakey");
	setDieFace("die_1",d1);
	setDieFace("die_2",d2);
	document.getElementById("pushbutton").innerHTML="Let's Roll";
	pushable=true;
}

function buttonClicked() {
	var header= document.getElementById("header");
	header.classList.add("shakey");
	header.innerHTML="shake rattle and roll";
	setTimeout(diceRoll,1000);
	pushable=false;
}

function setDieFace( id, roll ) {
	var faces=[ 	[ false, false, false, false, false, false, true ],
			[ true, false, false, false, false, true,false],
			[ true, false, false, false, false, true, true],
			[ true, true, false, false, true, true, false],
			[ true, true, false, false, true, true, true],
			[ true, true, true, true, true, true, false] ];
	var s=id+"_";
	for ( var p=0;p<7;p++) {
		var pimple=document.getElementById(s+p.toString(10));
		if (faces[roll-1][p]==false) 
			pimple.style.display="none";
		else
			pimple.style.display="inline-block";
	}
}
