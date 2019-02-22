	var sources =new Array(1); //needs a value
	var numSources= 0;
	var startDate=new Date();
	var startTime= startDate.getTime();//recording for delta time.

	var clickable=true;
	var dimY=40;
	var dimX=80;
	var shownfirst=false;

function init() {

	createColorMap();
	createParticles();

	document.addEventListener("click",function(event) {
		if (event.target.classList.contains("particle") && clickable ){
			particleClicked(event.target);
		}
	},false);

	setInterval(mapFrame,50);
}

function mapFrame() {
	if (numSources==0 ) 
		if (!shownfirst) shownfirst=true;
		else return;

	var d= new Date();
	var t= d.getTime()-startTime;
	var rate=40;// 'pixels' per period
	var dt,front,fct,i,j,clr,s;

	for (i=0;i<dimY;i++)
		for (j=0;j<dimX;j++) {
			for (clr=0;clr<3;clr++)
				colorMap[i][j][clr]=-1.;

			for ( s=0;s<numSources;s++) {  // cache friendlier
				dt=t-sources[s][2];
				front=dt-distsrc[i][j][s]*rate;

				if (front<0.) continue;
				fct=Math.sin(front/500.);
				fct=fct**3;
				for (var clr=0;clr<3;clr++)
					colorMap[i][j][clr]+=fct*sources[s][3+clr]; 
			}

			pixels[i][j].style.backgroundColor= 
				colorString(makeColor(colorMap[i][j][0]), makeColor(colorMap[i][j][1]),makeColor(colorMap[i][j][2]));
		}
}

function makeColor( fraction ) {
	fraction=Math.min(1., Math.max(-1.,fraction));
	return Math.floor( 128+ 127*fraction);
}

function colorString( r,g,b ) {
	return 'rgb('+r+','+g+','+b+')';
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
	pixels=new Array(dimY);
	distsrc=new Array(dimY);

	for ( var i=0;i<dimY; i++) {
		pixels[i]= new Array( dimX );// one for each div element acting as pixels	
		distsrc[i] = new Array( dimX );

		var line=document.createElement("div");
		line.id="scanline"+i.toString(10);
		line.classList.add("scanline");
		line.style.height=side.toString(10)+"px";

		for (var j=0;j<dimX; j++) {
			var elem=document.createElement("div");
			elem.id=createId(i,j);
			elem.classList.add("particle");
			pixels[i][j]=elem;
			distsrc[i][j]=new Array(1);//initially irrelevant
			distsrc[i][j][0]=-1.;//invalid

			line.appendChild(elem);
		}
		screen.appendChild(line);
	}
}

function particleClicked( element ) {
	var y= parseInt( element.id.substr(1,2) );
	var x= parseInt( element.id.substr(4,2) );

	var color=Math.floor((1<<24)*Math.random());
	var d= new Date();
	
	var newsource=[x,y,d.getTime()-startTime,Math.random(),Math.random(),Math.random()];//contribution to wave color

	if (numSources==0)
		sources[0]=newsource;
	else sources.push(newsource); //add the new source information

	for ( var i=0;i<dimY;i++)
		for( var j=0;j<dimX;j++)
		{
			if (numSources>0)
				distsrc[i][j].push(-1.); //when numSources is 0 , an invalid element is already there
			//for every element calculate once the distance from this source
			distsrc[i][j][numSources]=Math.sqrt( (y-i)*(y-i)+(x-j)*(x-j)); 
		}

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

