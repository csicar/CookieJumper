document.body.innerHTML += '<div class="doodle" style="position: absolute;"></div>'
var doodle = document.querySelector('.doodle')
doodle.style.top = '100px';
doodle.style.left = '0px';
var pageWidth = document.body.offsetWidth;
var ax = 0;
var g = 0.0581;
var v_layer = -4;
var vy = 0;
var vx = 0;
var y = 500;
var x = 0;
var width = doodle.offsetWidth;
var layers = [
	{
		x: [0, pageWidth],
		y: 900,
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
		y: 300,
	},
	{
		x: [400, 500],
		y: 600,
	},
]
function addLayer(x0, x1, y){
	layers.push({x: [x0, x1], y: y})
	render()
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
 	//ax = ev.gamma/50;
 	vx = ev.gamma/3;
 }, false);
(function next(){
	var inPos = layers.filter(function(layer){
		return (
			((layer.y-y)<1)&&
			((layer.y-y)>-1)&&
			(x+width>layer.x[0])&&
			(x<layer.x[1])&&
			(vy>0)
		);
	})
	if(inPos.length){
		console.log(inPos, y, x, vy)
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
	}
	vx += ax;
	vy += g;
	y += vy;
	x += vx;
	doodle.style.top = y-doodle.offsetHeight+'px';
	doodle.style.left = x+'px';
	setTimeout(next, 10);
}())
