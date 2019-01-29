	var sources =new Array(1); //needs a value
	var numSources= -1;
	var startDate=new Date();
	var startTime= startDate.getTime();//recording for delta time.

	var clickable=true;
	var dimY=40;
	var dimX=80;

function init() {

	createColorMap();
	createParticles();

	document.addEventListener("click",function(event) {
		if (event.target.classList.contains("particle") && clickable ){
			particleClicked(event.target);
		}
	},false);

	setInterval(mapFrame,100);
}

function mapFrame() {
	var d= new Date();
	var t= d.getTime()-startTime;
	var rate=40;// 'pixels' per period

	for (var i=0;i<dimY;i++)
		for (var j=0;j<dimX;j++) {
			for (var clr=0;clr<3;clr++)
				colorMap[i][j][clr]=-1.;

			for ( var s=0;s<numSources;s++) {  // cache friendlier
				var x=sources[s][0];
				var y=sources[s][1];
				var dt=t-sources[s][2];
				var dist=Math.sqrt( (x-i)*(x-i)+(y-j)*(y-j));

				if (dt<dist*rate) continue;
				var fct=Math.sin((dt-dist*rate)/500);
				fct=fct**3;
				for (var clr=0;clr<3;clr++)
					colorMap[i][j][clr]+=fct*sources[s][3+clr]; 
			}

			for (var clr=0;clr<3;clr++) 
				document.getElementById(createId(i,j)).style.backgroundColor=colorString(makeColor(colorMap[i][j][0]),
					makeColor(colorMap[i][j][1]),makeColor(colorMap[i][j][2]));
		}
}

function makeColor( fraction ) {

	fraction=Math.min(1., Math.max(-1.,fraction));
	return Math.floor( 128+ 127*fraction);
}

function colorString( r,g,b ) {
	var clr="#";
	if (r<16) clr+="0";
	clr+=r.toString(16);
	if (g<16) clr+="0";
	clr+=g.toString(16);
	if (b<16) clr+="0";
	clr+=b.toString(16);
	return clr;

}

function createColorMap() {
	colorMap=new Array( dimY );

	for( var i=0;i<dimY;i++ ) {
		colorMap[i]=new Array( dimX );
		for ( var j=0; j< dimX; j++)
			colorMap[i][j]=[0.,0.,0.];//each color in 0..1 range
	}		
}

function initMap() {
	for (var i=0;i<dimY;i++)
		for (var j=0;j<dimX;j++)
			for (var clr=0;clr<3;clr++)
				colorMap[i][j][clr]=-1.;
}

function createParticles( ) {
	var screen=document.getElementById("screen");
	var side=10;

	for ( var i=0;i<dimY; i++) {
		var line=document.createElement("div");
		line.id="scanline"+i.toString(10);
		line.classList.add("scanline");
		line.style.height=side.toString(10)+"px";

		for (var j=0;j<dimX; j++) {
			var elem=document.createElement("div");
			elem.id=createId(i,j);

			elem.classList.add("particle");
//			elem.style.width=side.toString(10)+"px";
//			elem.style.height=side.toString(10)+"px";

			line.appendChild(elem);
		}
		screen.appendChild(line);
	}
}

function particleClicked( element ) {
	var x= parseInt( element.id.substr(1,2) );
	var y= parseInt( element.id.substr(4,2) );

	var color=Math.floor((1<<24)*Math.random());
	var d= new Date();
	
	var newsource=[x,y,d.getTime()-startTime,Math.random(),Math.random(),Math.random()];//contribution to wave color

	if (numSources==-1){
		numSources=0;
		sources[0]=newsource;
	}
	else sources.push(newsource); 

	numSources++;
}


function createId( i, j ) {
	var id="p";
	if (i<10)
		id+="0";
	id+=i.toString(10)+"_";
	
	if (j<10) id+="0";
	id+=j.toString(10);

	return id;
}

