var weapons=["paper","scissors","rock"];
var userchoice=-1;
var clickable=true;

function init() {
	document.addEventListener("click",function(event) {
		if (event.target.classList.contains("mybutton")) {
			clickable=false;		//disable all buttons

			var id=event.target.id.slice(4);//set id as weapon chosen
			for (var i=0;i<3;i++)		//identify selection
				if (weapons[i]==id) {
					userchoice=i;
					break;
				}
			enableHand("left");		//start animation
			enableHand("right");
			document.getElementById("result").innerHTML="Let's see...";
							//set timeout function to show the appropriate picture
							//and calculate the result, also re-enable buttons
			setTimeout(onTimeOut,1500);
		}
	},false);
}

function enableHand(side) {
	var elem = document.getElementById(side+"hand");
	elem.classList.remove("invisible");
	elem.classList.add("visible");
	elem.classList.add("moving");

	for (var i=0;i<3;i++) {
		elem=document.getElementById(side+weapons[i]);
		if (elem.classList.contains("visible")) {
			elem.classList.remove("visible");
			elem.classList.add("invisible");
			break;
		}
	}
}

function calcComputerMove() {
	return Math.floor(3*Math.random());
}

function setChoice( side, wpnnum) {
	//show one, disappear all others
	var elem=document.getElementById(side+"hand");
	elem.classList.remove("visible");
	elem.classList.add("invisible");

	elem=document.getElementById(side+weapons[wpnnum]);
	elem.classList.remove("invisible");
	elem.classList.add("visible");
}


function onTimeOut() {
	var comp=calcComputerMove();
	setChoice("left",comp);
	setChoice("right",userchoice);
	showResult(comp,userchoice);
	clickable=true;
}

function showResult( comp, user ) {
	var result="You win.\nOnce more!";
	if ((comp==0 && user==2) || (comp==user+1))
		result="You lose.\nTry again!";
	else if (comp==user)
		result="A tie.\nTry again!";

	document.getElementById("result").innerHTML=result;
}
