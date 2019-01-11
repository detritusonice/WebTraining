function init() {
	setInterval( function() {
		var dt=new Date();
		var h=dt.getHours();
		var m=dt.getMinutes();
		var s=dt.getSeconds();

		var t=textColor(h,m,s);
		document.getElementById("clockpane").style.color=t;
		document.getElementById("colorpane").style.color=t; // setting innerHTML first  nullifies subsequent setting text color, so color precedes innerHTML.

		document.getElementById("clockpane").innerHTML=formatTime(h,m,s);
		var s=backgroundColor(h,m,s);
		document.getElementById("colorpane").innerHTML=s;
		document.body.style.backgroundColor=s;

	},20);
}

function formatTimeSlice(t) {
	var tm="";
	if (t<10) tm+="0";
	tm+=t.toString(10);
	return tm;
}

function formatColorComponent(cc) {
	var clr="";
	if (cc<16) clr+="0";
	clr+=cc.toString(16);
	return clr;
}

function formatTime( h,m,s) {
	var time="";
	time+=formatTimeSlice(h)+":";
	time+=formatTimeSlice(m)+":";
	time+=formatTimeSlice(s);
	return time;
}

function backgroundColor(h,m,s) {
	var bgcolor="#";
	bgcolor+=formatColorComponent(Math.floor(255.*(h/24.)));
	bgcolor+=formatColorComponent(Math.floor(255.*(m/60.)));
	bgcolor+=formatColorComponent(Math.floor(255.*(s/60.)));
	return bgcolor.toUpperCase();
}

function textColor(h,m,s) {
	var txtcolor="#";
	txtcolor+=formatColorComponent(Math.floor(255.*(((h+8)%24)/24.)));
	txtcolor+=formatColorComponent(Math.floor(255.*(((m+20)%60)/60.)));
	txtcolor+=formatColorComponent(Math.floor(255.*(((s+20)%60)/60.)));
	return txtcolor;
}
