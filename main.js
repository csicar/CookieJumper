document.body.innerHTML += '<div class="doodle" style="position: absolute;"></div>'
var doodle = document.querySelector('.doodle')
var pageWidth = document.body.offsetWidth;
var pageHeight = document.body.scrollHeight;
var ax = 0;
var g = 0.0381;
var v_layer = -3;
var vy = 0;
var vx = 0;
var y = pageHeight+100;
var x = pageWidth/2;
var width = doodle.offsetWidth;
doodle.style.top = y;
doodle.style.left = x;
var layers = []/*[
	{
		x: [10, 400],
		y: 750,
	},
	{
		x: [200, 300],
		y: 700,
	},
	{
		x: [200, 300],
		y: 600,
	},
	{
		x: [100, 200],
		y: 500,
	},
	{
		x: [400, 500],
		y: 600,
	},
	{
		x: [200, 300],
		y: 400,
	},
]*/
function addLayer(x, y){
	layers.push({x: [x[0], x[1]], y: y})
	render()
}
for(var i = 0; i < 10; i++){
	var pos = ((Math.random()%2)+(Math.random()%2)+(Math.random()%2)+(Math.random()%2))*100
	addLayer([pos, pos+100], i*100)
}
function render(){
	d3.select('body').data(layers)
			.enter().append('div')
				.attr('class', 'layer')
				.style('position', 'absolute')
				.style('top', function(d){return d.y+"px"})
				.style('left', function(d){return d.x[0]+"px"})
				.style('width', function(d){return d.x[1]-d.x[0]+"px"})	
}
render()

window.addEventListener('deviceorientation', function(ev){
 	//ax = ev.gamma/100;
 	vx = ev.gamma/3;
 	//x = ev.gamma*10+100;
 }, false);
(function next(){
	var inPos = layers.filter(function(layer){
		return (
			((layer.y-y)<2)&&
			((layer.y-y)>-2)&&
			(x+width>layer.x[0])&&
			(x<layer.x[1])&&
			(vy>0)
		);
	})
	if(inPos.length){
		vy = v_layer;
	}
	if(x>pageWidth){
		x = 0;
	}
	if(x<0){
		x = pageWidth;
	}
	if(y > 1000){
		y = 0;
	}else{
		setTimeout(next, 1);
	}
	vx += ax;
	vy += g;
	y += vy;
	x += vx;
	doodle.style.top = y-doodle.offsetHeight+'px';
	doodle.style.left = x+'px';
}())
