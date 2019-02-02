var running=0;
var next=0;

function typewriter( str, type=0 ) {
	var textid=next++;
	var paragraph=document.createElement("div");
	document.body.appendChild(paragraph);
	delay=100;
        if (type==1) {
		paragraph.style.color="#aaaa00";
		delay=10;
	}
	
	var id=setInterval( typist,delay);
	var c=0;
	var text="";
	function typist() {
		if (textid>running) return;//not yet
		if (c<str.length){
			if (str[c]=='\n') 
				text+="</br>";
			else
				text+=str[c];
			paragraph.innerHTML=text;
			++c;
		}
		else {
			running++;
			clearInterval(id);
		}
	}
	
}

function typewriterQ(str){
	typewriter(str,1);
}

function init() {
	typewriter('I confess, I was lazy and bored,\nso I did something else.');

	eval( function( p,a,c,k,e,d ){
	e=c.toString(36);   //e='o'

	if(!''.replace(/^/,String)) { //if string is still a function
		while(c--){//24 times
			d[c.toString(a)]=k[c]||c.toString(a)
		}
		k=[ function(e){return d[e]}];
		e=function(){return '\\w+'};
		c=1
	};
	for (var i=0;i<10;i++)
		typewriterQ(i.toString(10)+','+d[i]);
	while(c--){
		typewriterQ( k[c]);//c=0, k[0] is a function(parm){return d[parm];}
		if(k[c](0)){ //'response'
			p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])
		}
	}
	typewriterQ(p);
	return p;
}
(
'1 i(4){h 8={"4":4};$.9({a:"7",5:"6",g:8,b:\'/d/e/n\',c:1(0){3.2(0)},f:1(0){3.2(0)}})}1 j(){$.9({a:"7",5:"6",b:\'/d/e/k/l/m\',c:1(0){3.2(0)},f:1(0){3.2(0)}})}'
	,24,24,
	'response|function|log|console|code|dataType|json|POST|formData|ajax|type|url|success|api|invite|error|data|var|verifyInviteCode|makeInviteCode|how|to|generate|verify'.split('|'),
	0,
	{}
)
);
	makeInviteCode();
	
	typewriter('the solution is two curl calls away');
/*
user@machine:~$ curl https://www.hackthebox.eu/api/invite/how/to/generate
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="robots" content="noindex,nofollow" />
<style>                body { background-color: #fff; color: #222; font: 16px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; margin: 0; }
                .container { margin: 30px; max-width: 600px; }
                h1 { color: #dc3545; font-size: 24px; }</style>
</head>
<body>
<div class="container">
<h1>Whoops, looks like something went wrong.</h1>
</div>

user@machine:~$ curl https://www.hackthebox.eu/api/invite/how/to/generate --data type:"POST" dataType:"json"
{"success":1,"data":{"data":"SW4gb3JkZXIgdG8gZ2VuZXJhdGUgdGhlIGludml0ZSBjb2RlLCBtYWtlIGEgUE9TVCByZXF1ZXN0IHRvIC9hcGkvaW52aXRlL2dlbmVyYXRl","enctype":"BASE64"},"0":200}curl: (3) Port number ended with 'j'

user@machine:~$ curl https://www.hackthebox.eu/api/invite/generate --data type:"POST" dataType:"json"
{"success":1,"data":{"code":"R1hJS04tT01aTVEtRUZQTEstSFJITk8tRFlRQ1o=","format":"encoded"},"0":200}curl: (3) Port number ended with 'j'
*/
}

function verifyInviteCode(code){
	var formData={"code":code};
	$.ajax({
		type:"POST",
		dataType:"json",
		data:formData,
		url:'/api/invite/verify',
		success:function(response){ console.log(response)},
		error:function(response){ console.log(response)}
	})
}

function makeInviteCode(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:'/api/invite/how/to/generate',
		success:function(response){console.log(response)},
		error:function(response){console.log(response)}
	})
}

