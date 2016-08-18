(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
lib.webFontTxtFilters = {}; 


var selectedPoint=null;
 
var request;

 if(window.XMLHttpRequest)
 {
	 request = new window.XMLHttpRequest();
 }else
   if(window.ActiveXObject)
   {
	   request = new window.ActiveXObject('Microsoft.XMLHTTP');
   }



var locationService = {};
var service, canvas, info, place, stage, tooltip, instructions, draggable, zoomIn, zoomOut;

var ease = Sine.easeInOut;

(locationService = function()
{
	   var self = this;
	   var data = {};
	    
		request.onload = function(event)
		{
			self.data = JSON.parse(request.responseText);

			//stage.start();

			 stage.updatePointerPositions();
			
		}
		
	    request.open('GET', 'data.json', true);
        
        request.send(null);

})




// library properties:
lib.properties = {
	width: 1366,
	height: 768,
	fps: 24,
	color: "#FFFFFF",
	webfonts: {},
	manifest: [
		{src:"images/map4.gif",     id:"landscape"},
		{src:"images/zoomin.png",  id:"zoomIn"},
		{src:"images/zoomout.png", id:"zoomOut"},
		{src:"images/pointer.png", id:"pointer"}
	]
};



lib.webfontAvailable = function(family) { 
	lib.properties.webfonts[family] = true;
	var txtFilters = lib.webFontTxtFilters && lib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};


// scroll circle
(lib.circle = function() {
	this.initialize();

	var shape = new cjs.Shape();

	var radius = 15;

	shape.graphics.s('#FF0000').f('#ffffff').drawCircle(0, 0, radius);

	//this.label = new cjs.Text("1500", "11px Arial", "#ffffff");

	this.regX = this.regY = 5;

	this.addChild(shape);

	this.radius = radius;

}).prototype = p = new cjs.Container();



(lib.arrow = function()
{
	this.initialize();
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#F300A9").ss(2).p("AAvheIBuBaIgMAIIAMAAAirAEIE8AAACRAOIhiBQ");
	this.shape.setTransform(17.3,0);
	this.addChild(this.shape);
}
).prototype = p = new cjs.Container();
// marker
(lib.marker = function() {
	this.initialize();

	var shape = new cjs.Shape();

	shape.graphics.f('#ffffff').drawRect(0, 0, 2, 12);

	var color = "#ffffff";
	var style = "bold 11px HelveticaNeueReg";

	this.label = new cjs.Text("1500", style, color);

	this.label.x = 3;

	this.addChild(shape, this.label);

}).prototype = p = new cjs.Container();



// stage content:
(lib.timeline = function() {
	this.initialize();
    
	var self = this;




	var offsetX, offsetY;

	

	var shape = new cjs.Shape();

	this.width = canvas.width - 1;
	this.height = 40;

	var color = "#ffffff";
	var style = "bold 11px HelveticaNeueReg";

	shape.graphics.f('#F300A9').drawRect(0, 0, this.width, this.height);
  


	var line = new cjs.Shape();

   line.graphics.f('#ffffff').drawRect(0, 0, this.width, 1);


   line.y = this.height * .5;

   




   this.addChild(shape, line);

    var value = this.value = (canvas.width * 10) / 100;


	this.startLabel = new cjs.Text("1570", style, color);

	this.endLabel = new cjs.Text("1700", style, color);

	this.addChild(this.startLabel);

   for(var i=1; i<21; i++)
   {
	   var marker = this['marker'+i] =  new lib.marker();

	   marker.label.text = (i * 10 + 1570).toString();
	   
	   marker.x = value * i;
	   
	   this.addChild(marker);
   }


   this.resetPos = function()
   {
	   self.circle.x = this.cpos = value * .5;
   }

   this.endLabel.x = marker.x - (value * .5) + 7 ;

   this.addChild(this.endLabel);


   this.circle = new lib.circle();

   this.circle.y = this.height * .5;

   this.resetPos();

   this.addChild(this.circle);





	this.circle.addEventListener('pressmove', onPressMove);

	this.circle.addEventListener('mousedown', onMousedown);

	this.circle.addEventListener('pressup', onPressup);


	function onTick()
	{
		for(var i=0; i<stage.meanPins.length; i++)
		{
			var pin = stage.meanPins[i];

			   pin.subscribeTotimeline();
		}
	}

	function onPressup()
	{
		/*for(var i=1; i<39; i++)
		{
			//console.log('pin', stage.pins['p'+i], 'pressup');

			var pin = stage.pins['p'+i];

			pin.removeEventListener('tick', pin.subscribeTotimeline)
		}*/



        draggable = false;
		self.circle.removeEventListener('tick', onTick);


		
	}


  

	function onMousedown(event)
	{

		
		draggable = true;

		var p = new cjs.Point(self.circle.x, self.circle.y);

		p = self.localToGlobal(p.x, p.y);

		offsetX = event.stageX - p.x;
		offsetY = event.stageY - p.y;


		self.circle.addEventListener('tick', onTick);



		

		

      

	/*	for(var i=1; i<39; i++)
		{
			//console.log('pin', stage.pins['p'+i], 'mousedown');

			var pin = stage.pins['p'+i];

			pin.addEventListener('tick', pin.subscribeTotimeline);
		}
	*/
		
	}


	function onPressMove(event)
	{

		var nx = event.stageX - offsetX;

		var p = new cjs.Point(nx, offsetY);


		   
	
			//tooltip.htmlElement.innerHTML = place.parent.town.htmlElement.innerHTML;


		  // tooltip.htmlElement.innerHTML = selectedPoint.data.place + '<br>' + selectedPoint.data.v1;

			stage.tooltip.y = canvas.height - stage.tLine.height - tooltip.htmlElement.offsetHeight -5;


			stage.tooltip.x = p.x -tooltip.htmlElement.offsetWidth * .5;


			stage.tooltip.visible = true;
		
		
		

		
		p = self.globalToLocal(p.x, p.y);

		
		if(self.circle.radius - p.x <=0)
		{
			self.circle.x =self.circle.radius * 2;
		}else
		if( (self.circle.x + self.circle.radius) - self.width >=0)
		{
			self.circle.x = self.circle.x;
		}
		

		
	     self.circle.x = p.x;

		

		 self.timelinePos= 1570 + Math.round( (10 * self.circle.x) / value);

	}


}).prototype = p = new cjs.Container();




//map
(lib.landscape = function() {
	this.initialize(img.landscape);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4689,3036);


//pin

(lib.pointer = function() {
	this.initialize(img.pointer);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,31,55);


//map point

(lib.point = function() {
	
	this.initialize();
	var self = this;

	this.bg= new cjs.Shape();

	
 
    this.bg.graphics.beginFill("#ffffff").drawCircle(0, 0, 8);

	//this.bg.setTransform(-16,-17);

	this.bg.visible = false;

	this.addChild(this.bg);
 

	this.position = function(a,b,c, d,e,f,g,h,i)
	{
		self.setTransform(a,b,c, d,e,f,g,h,i);
	}

	this.redraw=function(c, r)
	{
		self.bg.graphics.clear();
		self.bg.graphics.beginFill(c).drawCircle(0, 0, r);
	}
	

}).prototype = p = new cjs.Container();



(lib.place = function()
{
	this.initialize();

	var self = this;


	this.town = new cjs.Text('', '15px, HelveticaNeueReg', '#F300A9');

	this.shadow = new cjs.Shadow("#ffffff", 5, 5, 10);

	this.addChild(this.town);

}).prototype = p = new cjs.Container();



(lib.pin = function(string, _pin) {
	this.initialize();

	var self = this;
	// Layer 1
	this.pointer = new lib.pointer();
	this.pointer.setTransform(-16,-54);
	
	this.addChild(this.pointer);

	this.scaleX = this.scaleY = .8;


	this.place = new lib.place();


	this.addChild(this.place);


	this.bg= new cjs.Shape();



	if(_pin=='p3')
	{
		var arrow = new lib.arrow();

		this.addChild(arrow);

	}


         var element = document.getElementById(_pin);

	   this[_pin + 'tab'] = new createjs.DOMElement(element);


	   this[_pin + 'tab'].x = -10;
	   this[_pin + 'tab'].y = -20;


	   this.addChild(this[_pin + 'tab']);

 
   // this.bg.graphics.beginFill("#ff0000").drawCircle(0, 0, 10);
    this.bg.y = -37;
	

	this.location = string;

	var data;

	this.drawMe = function()
	{
		self.bg.graphics.clear();
		self.bg.graphics.beginFill("#ffffff").drawCircle(0, 0, 5);

		self.addChild(self.bg);

	}

	this.clearMe = function()
	{
		self.bg.graphics.clear();
	}


	this.updateTownPos = function()
	{

		try{


			data = service.data[self.location];


			if(data)
			{
				 place.visible = true;
		         place.alpha = 1;
		         place.parent.town.htmlElement.innerHTML = data.place;
		         place.x = self.x - place.parent.town.htmlElement.offsetWidth/2  + 5;
		         place.y = self.y - place.parent.town.htmlElement.offsetHeight - 60;

			}
		   


		}catch(error)
		{
			console.log('@updateTownPos', error, self.location);
		}
		
	}

	this.updateInfoBoxPos = function()
	{

	  

	   data = service.data[self.location];

	  //self.boxInfo.htmlElement.innerText = self.location;


	  try{


	  self.boxInfo.htmlElement.innerHTML = data.info;


	  tooltip.htmlElement.innerHTML = data.place;

	  stage.updateCloseBtnPos();


	  info.visible = true;

	  TweenLite.to(info, 1, {alpha:1, ease:ease});


	  }catch(error)
	  {
		  console.log('@updateInfoBoxPos', error, self.location);
	  }


	 self.updateTownPos();



	}

	this.doMean = function()
	{
		 data = service.data[self.location];

		if(data && data.v1 && data.v2)
		{
			self.mean = Math.round( (data.v1 + data.v2) / 2);

			return true;
		}

		return false;	
	}
	this.subscribeTotimeline=function()
	{
		 data = service.data[self.location];
		
		try{

			if(data.v1 && data.v2)
			{
				if(!self.mean)
				   self.doMean();

				   var v = self.mean == stage.tLine.timelinePos;

				 
                 

				   if(v)
				   {
					   self.onClick();

					
				   }
				
			}
		}catch(error)
		{

		}
	}

    this.onClick = function(event)
	{
		stage.instructionHidden = true;

	   if(selectedPoint)
	   {
		   selectedPoint.clearMe();
	   }
       self.updateInfoBoxPos();
	   
	   selectedPoint = self;




	   self.drawMe();


	   self.repositionMap();


	   if(stage.tooltip.visible && !draggable)
		{
			//console.log('tooltip.visible', stage.tooltip.visible);


			var cx = Math.round( (stage.tLine.value * (self.mean - 1570) ) / 10);



			//stage.tLine.circle.x = cx;

			//stage.tooltip.x = cx -tooltip.htmlElement.offsetWidth * .5;


			TweenLite.to(stage.tLine.circle, 1, {x:cx});
			
			TweenLite.to(stage.tooltip, 1, {x: cx -tooltip.htmlElement.offsetWidth * .5});
		}

		
		



	}


	this.repositionMap=function()
	{
		
		
		var nx= (canvas.width/2)  - self.x;
	    var ny= (canvas.height/2) - self.y;

		TweenLite.to(self.map, 1, {x:self.map.x + nx, y:self.map.y+ny, ease:ease, onComplete:function()
			{
				stage.removeEventListener('tick', onTick);
			}})

	   stage.addEventListener('tick', onTick);

		function onTick(event)
		{
				stage.updatePointerPositions();
		}

	
	}





	this.addEventListener('click', this.onClick)

	
	

}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-16,-17,31,55);








//pins

(lib.points = function() {

	this.initialize();















	this.p1 = new lib.point();
	this.p1.position(3442.2,1273,1,1,0,0,0,15.5,27.5);

	this.p2 = new lib.point();
	this.p2.position(4171.2,1958.9,1,1,0,0,0,15.5,27.5);

	this.p3 = new lib.point();
	this.p3.position(4633.2,1562,1,1,0,0,0,15.5,27.5);

	this.p4 = new lib.point();
	this.p4.position(4015.2,1577,1,1,0,0,0,15.5,27.5);

	this.p5 = new lib.point();
	this.p5.position(4111.2,1561,1,1,0,0,0,15.5,27.5);

	this.p6 = new lib.point();
	this.p6.position(3499.1,999,1,1,0,0,0,15.5,27.5);

	this.p7 = new lib.point();
	this.p7.position(3510.2,1091,1,1,0,0,0,15.5,27.5);

	this.p8 = new lib.point();
	this.p8.position(3434.2,1525,1,1,0,0,0,15.5,27.5);

	this.p9 = new lib.point();
	this.p9.position(3435.2,1715.4,1,1,0,0,0,15.5,27.5);

	this.p10 = new lib.point();
	this.p10.position(3438.2,1828.9,1,1,0,0,0,15.5,27.5);

	this.p11 = new lib.point();
	this.p11.position(3501.1,2242.8,1,1,0,0,0,15.5,27.5);

	this.p12 = new lib.point();
	this.p12.position(2781.6,2546.8,1,1,0,0,0,15.5,27.5);

	this.p13= new lib.point();
	this.p13.position(2907.1,2507.3,1,1,0,0,0,15.5,27.5);

	this.p14 = new lib.point();
	this.p14.position(2820.6,2452.3,1,1,0,0,0,15.5,27.5);

	this.p15 = new lib.point();
	this.p15.position(2575.6,2542.3,1,1,0,0,0,15.5,27.5);

	this.p16 = new lib.point();
	this.p16.position(2590.6,2327.8,1,1,0,0,0,15.5,27.5);

	this.p17= new lib.point();
	this.p17.position(1998.6,2441.3,1,1,0,0,0,15.5,27.5);

	this.p18 = new lib.point();
	this.p18.position(2444.6,1104.9,1,1,0,0,0,15.5,27.5);


	this.p19 = new lib.point();
	this.p19.position(1920.6,1069.4,1,1,0,0,0,15.5,27.5);

	this.p20 = new lib.point();
	this.p20.position(2111.1,1632,1,1,0,0,0,15.5,27.5);
	

	this.p21 = new lib.point();
	this.p21.position(2581.6,1398.9,1,1,0,0,0,15.5,27.5);

	this.p22 = new lib.point();
	this.p22.position(2508.1,1577,1,1,0,0,0,15.5,27.5);

	this.p23 = new lib.point();
	this.p23.position(2362.6,1706.4,1,1,0,0,0,15.5,27.5);

	this.p24 = new lib.point();
	this.p24.position(2177.1,1751.8,1,1,0,0,0,15.5,27.5);

	this.p25 = new lib.point();
	this.p25.position(2191.6,1806.8,1,1,0,0,0,15.5,27.5);

	this.p26 = new lib.point();
	this.p26.position(1985.1,1813.9,1,1,0,0,0,15.5,27.5);

    this.p27 = new lib.point();
	this.p27.position(1979.6,1779.3,1,1,0,0,0,15.5,27.5);

	this.p28 = new lib.point();
	this.p28.position(1776.1,2099.9,1,1,0,0,0,15.5,27.5);

	this.p29 = new lib.point();
	this.p29.position(1841.4,1895.9,1,1,0,0,0,15.5,27.5);

	this.p30 = new lib.point();
	this.p30.position(1570.5,1664.4,1,1,0,0,0,15.5,27.5);

	this.p31 = new lib.point();
	this.p31.position(1492.5,1738.4,1,1,0,0,0,15.5,27.5);

	this.p32 = new lib.point();
	this.p32.position(1121.7,1746.4,1,1,0,0,0,15.5,27.5);

	this.p33 = new lib.point();
	this.p33.position(1100.7,1546,1,1,0,0,0,15.5,27.5);

	this.p34 = new lib.point();
	this.p34.position(751,2471.1,1,1,0,0,0,15.5,27.5);



	this.p35 = new lib.point();
	this.p35.position(85.2,1505,1,1,0,0,0,15.5,27.5);

	this.p36 = new lib.point();
	this.p36.position(235.7,2265.6,1,1,0,0,0,15.5,27.5);

	this.p37 = new lib.point();
	this.p37.position(927.9,1672.9,1,1,0,0,0,15.5,27.5);

	this.p38 = new lib.point();
	this.p38.position(419.9,1972.2,1,1,0,0,0,15.5,27.5);
	


	this.left= new lib.point();
	
    this.top= new lib.point();

	this.right= new lib.point();
	
    this.bottom= new lib.point();

	 this.center= new lib.point();
	 


	this.left.x =0;
	this.left.y = 0;
	this.right.x =4689;
	this.right.y = 0;

	this.bottom.x = 4689;
	this.bottom.y = 3036;

	this.left.redraw('#ff0000',0);
	//this.left.redraw('#ff0000', 50);
	this.right.redraw('#ff0000', 0);
	this.bottom.redraw('#ff0000', 0);


	this.addChild(
		
		this.p1,
		this.p2,
		this.p3,
		this.p4, 
		this.p5,
		this.p6,
		this.p7,
		this.p8, 
		this.p9,
		this.p10,
		this.p11,
		this.p12,
		this.p13,
		this.p14,
		this.p15,
		this.p16,
		this.p17,
		this.p18,
		this.p19,
		this.p20,
		this.p21,
		this.p22,
		this.p23,
		this.p24,
		this.p25,
		this.p26,
		this.p27,
		this.p28,
		this.p30,
		this.p31,
		this.p32,
		this.p33,
		this.p34,
		this.p35,
		this.p36,
		this.p37,
		this.p38,

		this.left,
		this.right,
		this.bottom
		
	);

}).prototype = p = new cjs.Container();


//pins

(lib.pins = function() {

	this.initialize();


  /*  this.p1 = new lib.pin('bethelm_hospital_off_map');
	//this.p1.setTransform(4634.2,2553.8,1,1,0,0,0,15.5,27.5);

	this.p2 = new lib.pin('tower_of_london');
	//this.p2.setTransform(4171.2,1958.9,1,1,0,0,0,15.5,27.5);

	this.p3 = new lib.pin('the_red_lion');
	//this.p3.setTransform(4243.2,1562,1,1,0,0,0,15.5,27.5);

	this.p4 = new lib.pin('roman_walls_gates');
	//this.p4.setTransform(4015.2,1577,1,1,0,0,0,15.5,27.5);

	this.p5 = new lib.pin('the_boars_head');
	//this.the_boars_head.setTransform(4111.2,1561,1,1,0,0,0,15.5,27.5);

	this.p6 = new lib.pin('the_theatre');
	//this.the_theatre.setTransform(3499.1,999,1,1,0,0,0,15.5,27.5);

	this.p7 = new lib.pin('the_curtain');
	//this.the_curtain.setTransform(3510.2,1091,1,1,0,0,0,15.5,27.5);

	this.p8 = new lib.pin('the_bull');
	//this.the_bull.setTransform(3434.2,1525,1,1,0,0,0,15.5,27.5);

	this.p9 = new lib.pin('cross_keys');
	//this.cross_keys.setTransform(3435.2,1715.4,1,1,0,0,0,15.5,27.5);

	this.p10 = new lib.pin('bell_inn');
	//this.bell_inn.setTransform(3438.2,1828.9,1,1,0,0,0,15.5,27.5);

	this.p11 = new lib.pin('london_bridge');
	//this.london_bridge.setTransform(3501.1,2242.8,1,1,0,0,0,15.5,27.5);

	this.p12 = new lib.pin('the_houpe_off_map');
	//this.the_houpe_off_map.setTransform(2781.6,2546.8,1,1,0,0,0,15.5,27.5);

	this.p13 = new lib.pin('the_globe');
	//this.the_globe.setTransform(2907.1,2507.3,1,1,0,0,0,15.5,27.5);

	this.p14 = new lib.pin('the_rose');
	//this.the_rose.setTransform(2820.6,2452.3,1,1,0,0,0,15.5,27.5);

	this.p15 = new lib.pin('newington_butts_off_map');
	//this.newington_butts_off_map.setTransform(2575.6,2542.3,1,1,0,0,0,15.5,27.5);

	this.p16 = new lib.pin('the_swan');
	//this.bankside.setTransform(2590.6,2327.8,1,1,0,0,0,15.5,27.5);

	this.p17 = new lib.pin('the_swan');
	//this.the_swan.setTransform(1998.6,2441.3,1,1,0,0,0,15.5,27.5);

	this.p18 = new lib.pin('the_fortune');
	//this.the_fortune.setTransform(2444.6,1104.9,1,1,0,0,0,15.5,27.5);

	this.p19 = new lib.pin('the_red_bull');
	//this.the_red_bull.setTransform(1920.6,1069.4,1,1,0,0,0,15.5,27.5);

	this.p20 = new lib.pin('new_gate');
	//this.new_gate.setTransform(2175.1,1380.9,1,1,0,0,0,15.5,27.5);

	this.p21 = new lib.pin('silver_street');
	//this.silver_street.setTransform(2581.6,1398.9,1,1,0,0,0,15.5,27.5);

	this.p22 = new lib.pin('cheapside');
	//this.cheapside.setTransform(2508.1,1577,1,1,0,0,0,15.5,27.5);

	this.p23 = new lib.pin('st_paul_s');
	//this.st_paul_s.setTransform(2362.6,1706.4,1,1,0,0,0,15.5,27.5);

	this.p24 = new lib.pin('the_bell_savage_inn');
	//this.the_bell_savage_inn.setTransform(2177.1,1751.8,1,1,0,0,0,15.5,27.5);

	this.p25 = new lib.pin('blackfriars');
	//this.blackfriars.setTransform(2191.6,1806.8,1,1,0,0,0,15.5,27.5);

	this.p26 = new lib.pin('the_secound_blackfriars');
	//this.the_secound_blackfriars.setTransform(1985.1,1813.9,1,1,0,0,0,15.5,27.5);

	this.p27 = new lib.pin('thames');
	//this.the_first_blackfriars.setTransform(1979.6,1779.3,1,1,0,0,0,15.5,27.5);

	this.p28 = new lib.pin('whitefriars');
	//this.tahmes.setTransform(1776.1,2099.9,1,1,0,0,0,15.5,27.5);

	this.p29 = new lib.pin('inns_of_court');
	//this.salisbury_court.setTransform(1689.5,1825.9,1,1,0,0,0,15.5,27.5);

	this.p30 = new lib.pin('somerset_house');
	//this.whitefriars.setTransform(1570.5,1664.4,1,1,0,0,0,15.5,27.5);

	this.p31 = new lib.pin('cockpit');
	//this.inns_of_court.setTransform(1492.5,1738.4,1,1,0,0,0,15.5,27.5);

	this.p32 = new lib.pin('lambeth_place');
	//this.somerset_house.setTransform(1121.7,1746.4,1,1,0,0,0,15.5,27.5);

	this.p33 = new lib.pin('Tyburn_off_map');
	//this.the_cockpit.setTransform(1100.7,1546,1,1,0,0,0,15.5,27.5);

	this.p34 = new lib.pin('westminster');
	//this.lambeth_place.setTransform(751,2471.1,1,1,0,0,0,15.5,27.5);

	this.p35 = new lib.pin('the_strand');
	//this.Tyburn_off_map.setTransform(85.2,1505,1,1,0,0,0,15.5,27.5);

	this.p36 = new lib.pin('westminster');
	//this.westminster.setTransform(235.7,2265.6,1,1,0,0,0,15.5,27.5);

	this.p37 = new lib.pin('the_strand');
	//this.the_strand.setTransform(927.9,1672.9,1,1,0,0,0,15.5,27.5);

	this.p38 = new lib.pin('whitehall');
	//this.whitehall.setTransform(419.9,1972.2,1,1,0,0,0,15.5,27.5);*/










    this.p1 = new lib.pin('bethelm_hospital_off_map', 'p1');
	//this.bethelm_hospital_off_map.setTransform(3442.2,1273,1,1,0,0,0,15.5,27.5);

	this.p2 = new lib.pin('tower_of_london', 'p2');
	//this.tower_of_london.setTransform(4171.2,1958.9,1,1,0,0,0,15.5,27.5);

	this.p3 = new lib.pin('the_red_lion', 'p3');
	//this.the_red_lion.setTransform(4243.2,1562,1,1,0,0,0,15.5,27.5);

	this.p4 = new lib.pin('roman_walls_gates', 'p4');
	//this.roman_walls_gates.setTransform(4015.2,1577,1,1,0,0,0,15.5,27.5);

	this.p5 = new lib.pin('the_boars_head', 'p5');
	//this.the_boars_head.setTransform(4111.2,1561,1,1,0,0,0,15.5,27.5);

	this.p6 = new lib.pin('the_theatre', 'p6');
	//this.the_theatre.setTransform(3499.1,999,1,1,0,0,0,15.5,27.5);

	this.p7 = new lib.pin('the_curtain', 'p7');
	//this.the_curtain.setTransform(3510.2,1091,1,1,0,0,0,15.5,27.5);

	this.p8 = new lib.pin('the_bull', 'p8');
	//this.the_bull.setTransform(3434.2,1525,1,1,0,0,0,15.5,27.5);

	this.p9 = new lib.pin('cross_keys', 'p9');
	//this.cross_keys.setTransform(3435.2,1715.4,1,1,0,0,0,15.5,27.5);

	this.p10 = new lib.pin('bell_inn', 'p10');
	//this.bell_inn.setTransform(3438.2,1828.9,1,1,0,0,0,15.5,27.5);

	this.p11 = new lib.pin('london_bridge', 'p11');
	//this.london_bridge.setTransform(3501.1,2242.8,1,1,0,0,0,15.5,27.5);

	this.p12 = new lib.pin('the_houpe_off_map', 'p12');
	//this.the_houpe_off_map.setTransform(2781.6,2546.8,1,1,0,0,0,15.5,27.5);

	this.p13 = new lib.pin('the_globe', 'p13');
	//this.the_globe.setTransform(2907.1,2507.3,1,1,0,0,0,15.5,27.5);

	this.p14 = new lib.pin('the_rose', 'p14');
	//this.the_rose.setTransform(2820.6,2452.3,1,1,0,0,0,15.5,27.5);

	this.p15 = new lib.pin('newington_butts_off_map', 'p15');
	//this.newington_butts_off_map.setTransform(2575.6,2542.3,1,1,0,0,0,15.5,27.5);

	this.p16 = new lib.pin('bankside', 'p16');
	//this.bankside.setTransform(2590.6,2327.8,1,1,0,0,0,15.5,27.5);

	this.p17 = new lib.pin('the_swan', 'p17');
	//this.the_swan.setTransform(1998.6,2441.3,1,1,0,0,0,15.5,27.5);

	this.p18 = new lib.pin('the_fortune', 'p18');
	//this.the_fortune.setTransform(2444.6,1104.9,1,1,0,0,0,15.5,27.5);

	this.p19 = new lib.pin('the_red_bull', 'p19');
	//this.the_red_bull.setTransform(1920.6,1069.4,1,1,0,0,0,15.5,27.5);

	this.p20 = new lib.pin('newgate', 'p20');
	//this.newgate.setTransform(2111.1,1632,1,1,0,0,0,15.5,27.5);
	new cjs.ButtonHelper(this.p20, 0, 1, 1);

	this.p21 = new lib.pin('silver_street', 'p21');
	//this.silver_street.setTransform(2581.6,1398.9,1,1,0,0,0,15.5,27.5);

	this.p22 = new lib.pin('cheapside', 'p22');
	//this.cheapside.setTransform(2508.1,1577,1,1,0,0,0,15.5,27.5);

	this.p23 = new lib.pin('st_paul_s', 'p23');
	//this.st_paul_s.setTransform(2362.6,1706.4,1,1,0,0,0,15.5,27.5);

	this.p24 = new lib.pin('the_bell_savage_inn', 'p24');
	//this.the_bell_savage_inn.setTransform(2177.1,1751.8,1,1,0,0,0,15.5,27.5);

	this.p25 = new lib.pin('blackfriars', 'p25');
	//this.blackfriars.setTransform(2191.6,1806.8,1,1,0,0,0,15.5,27.5);

	this.p26 = new lib.pin('the_secound_blackfriars', 'p26');
	//this.the_secound_blackfriars.setTransform(1985.1,1813.9,1,1,0,0,0,15.5,27.5);

	this.p27 = new lib.pin('the_first_blackfriars', 'p27');
	//this.the_first_blackfriars.setTransform(1979.6,1779.3,1,1,0,0,0,15.5,27.5);

	this.p28 = new lib.pin('thames', 'p28');
	//this.tahmes.setTransform(1776.1,2099.9,1,1,0,0,0,15.5,27.5);

	this.p29 = new lib.pin('salisbury_court', 'p29');
	//this.salisbury_court.setTransform(1841.4,1895.9,1,1,0,0,0,15.5,27.5);

	this.p30 = new lib.pin('whitefriars', 'p30');
	//this.whitefriars.setTransform(1570.5,1664.4,1,1,0,0,0,15.5,27.5);

	this.p31 = new lib.pin('inns_of_court', 'p31');
	//this.inns_of_court.setTransform(1492.5,1738.4,1,1,0,0,0,15.5,27.5);

	this.p32 = new lib.pin('somerset_house', 'p32');
	//this.somerset_house.setTransform(1121.7,1746.4,1,1,0,0,0,15.5,27.5);

	this.p33 = new lib.pin('the_cockpit', 'p33');
	//this.the_cockpit.setTransform(1100.7,1546,1,1,0,0,0,15.5,27.5);

	this.p34 = new lib.pin('lambeth_place', 'p34');
	//this.lambeth_place.setTransform(751,2471.1,1,1,0,0,0,15.5,27.5);


	this.p35 = new lib.pin('Tyburn_off_map', 'p35');
	//this.p35.position(85.2,1505,1,1,0,0,0,15.5,27.5);

	this.p36 = new lib.pin('Westminster', 'p36');
	//this.p36.position(235.7,2265.6,1,1,0,0,0,15.5,27.5);

	this.p37 = new lib.pin('the_strand', 'p37');
	//this.p37.position(927.9,1672.9,1,1,0,0,0,15.5,27.5);

	this.p38 = new lib.pin('Whitehall', 'p38');
	//this.p38.position(419.9,1972.2,1,1,0,0,0,15.5,27.5);





























    


}).prototype = p = new cjs.Container();





//zoomIn

(lib.zoomIn = function() {
	this.initialize(img.zoomIn);
}).prototype = p = new cjs.Bitmap();



(lib.zoomOut = function() {
	this.initialize(img.zoomOut);
}).prototype = p = new cjs.Bitmap();




(lib.views = function() {
	this.initialize();
	var self = this;

	this.parent = null;

	this.zoomIn = new lib.zoomIn();
	this.zoomOut = new lib.zoomOut();

	this.zoomOut.y = this.zoomIn.image.height + 5;

	this.addChild(this.zoomIn, this.zoomOut);

	

	this.width = this.zoomIn.image.width;
	this.height = this.zoomIn.image.height * 2 + 5;

    this.map = null;
	this.shape= new cjs.Shape();

	this.drawOnMap = function()
	{
		self.shape.graphics.clear();
        
		self.shape.graphics.beginFill("#ff0000").drawRect(0, 0, (self.map.nWidth) - (self.map.width * self.map.scaleX), 30);

		self.map.addChild(self.shape);
	}
	
 

    this.onTick = function (event)
	{
		
		self.map.parent.updatePointerPositions();
	}


    this.updateMapMetrics=function(event)
	{
		
		self.map.nWidth = self.map.width + (self.map.width * self.map.scaleX);

        self.map.nHeight = self.map.height + (self.map.height * self.map.scaleY);


        self.map.parent.removeEventListener('tick', self.onTick);


      //self.map.parent.updatePointerPositions();


	}


	

	this.onClick = function(event)
	{


		var xscale=0;
		var yscale=0;

		
		switch (event.target) {

			case self.zoomIn:


			//console.log('zoomIn', self.map.parent.points.p11);
			
			self.map.oscale = self.map.scaleX;
			
			xscale= self.map.scaleX + .1;
			yscale= self.map.scaleY + .1;
			
			//self.animatePins = true;

			//self.map.parent.updatePointerPositions();


			TweenLite.to(self.map, .5, {scaleX:xscale, scaleY:yscale, ease:ease, onComplete:self.updateMapMetrics});



			if(selectedPoint)
			{
				selectedPoint.repositionMap();
			}else
			{
				self.map.parent.addEventListener('tick', self.onTick);

			}

			

				

				break;


		   case self.zoomOut:

				//console.log('zoomOut', self.map.x, self.map.y);

				if(self.map.scaleX <=.24) return;

				self.map.oscale = self.map.scaleX;

				xscale= self.map.scaleX -.1;
			    yscale= self.map.scaleY - .1;

				//self.animatePins = true;

				// self.map.parent.updatePointerPositions();

			
			    TweenLite.to(self.map, .5, {scaleX:xscale, scaleY:yscale, ease:ease, onComplete:self.updateMapMetrics});

				if(selectedPoint)
				{
					selectedPoint.repositionMap();
			    }else
				{
					self.map.parent.addEventListener('tick', self.onTick);
				}

			    break;
		
			default:
				break;
		}
	}



	this.addEventListener('click', this.onClick);

}).prototype = p = new cjs.Container();





// stage content:
(lib.index = function(mode,startPosition,loop) {


   var self = stage = this;

	service = new locationService(this);
	canvas  = document.canvas;


	//canvas.style.width = '100%';
	//canvas.style.height = '100%';
	
	var offsetX = 0;
	var offsetY = 0;

	var ox, oy;

	this.initialize();



   //MAP STUFF

	var mapbg = new lib.landscape();
	
	mapbg.setTransform(0,0);

	

    this.map = new cjs.Container();

	this.map.x = canvas.width   * .5;
	this.map.y = canvas.height  * .5;


	this.map.regX= mapbg.image.width *.5;

	this.map.regY= mapbg.image.height *.5;

	this.map.oscale = 1;

	this.map.scaleX = this.map.scaleY = 1;

	this.map.oscale=this.map.scaleX;


	this.points = new lib.points();

	this.pins   = new lib.pins();



	this.map.addChild(mapbg, this.points);

	//console.log('this.pins.p11', this.points.p11);

	this.map.width  = mapbg.image.width;
	this.map.height = mapbg.image.height;
	


	this.map.nWidth  = this.map.width -    (this.map.scaleX * this.map.width);
	
	this.map.nHeight  = this.map.height -  (this.map.scaleY * this.map.height);

	this.map.incW = (this.map.scaleX * this.map.width);

	


	//viewport the map;

	this.mapviewport= new cjs.Shape();
 
    this.mapviewport.graphics.beginFill("#ff0000").drawRect(0, 0, mapbg.image.width, mapbg.image.height);

	this.mapviewport.regX = this.map.regX;
	this.mapviewport.regY = this.map.regY;

    this.mapviewport.x = this.map.x;

	this.mapviewport.y = this.map.y;

	this.mapviewport.setBounds(this.mapviewport.x, this.mapviewport.y, mapbg.image.width, mapbg.image.height);


	this.mapviewport.scaleX = this.mapviewport.scaleY =  .24;

	//this.map.mask = this.mapviewport;

	
	


	//views

	this.views = new lib.views();

	this.views.x = canvas.width  -  this.views.width;
	this.views.y = 20;

	this.views.scaleX = this.views.scaleY = .8;

	this.views.map = this.map;




	this.addChild(this.map, this.views);

	this.map.addEventListener('mousedown', function name(event) {

        
		offsetX = event.stageX - self.map.x;
		offsetY = event.stageY - self.map.y;

		ox = event.stageX;
		oy = event.stageY;

		//console.log('ox', ox, 'oy', oy);
	
	});

	this.map.addEventListener('pressmove', function name(event) {

		var bounds = self.mapviewport.getBounds();
	    
		
		var v1, v2, df;

	     v1 = (self.map.x) + self.map.nWidth/2;
	     v2 = (bounds.x) + bounds.width/2;
		 
		 var dx = Math.abs(v1) - Math.abs(v2);

        //console.log('dx is ', dx, self.map);
	    
		//if(dx <= 600) return;

        

		

		v1 = (self.map.y) + self.map.nHeight/2;
		v2 = (bounds.y) + bounds.height/2;
		
		var dy = Math.abs(v1) - Math.abs(v2);

		//console.log('fv', fv, 'sv', sv, 'df', df);
		
	   
	   // console.log('dy is ', dy);
		
		//if(dy <=370) return;
		
		var l = self.map.parent.points.left;
		var r = self.map.parent.points.right;
		var b = self.map.parent.points.bottom;


		//console.log(l, r, b);


        

          var p = new cjs.Point(r.x, r.x);

		  var trp = self.map.localToGlobal(p.x, p.y);

		  trp = self.map.parent.globalToLocal(trp.x, trp.y);


		  

		


		
		   var dx =   event.stageX - ox;
		   var dy =   event.stageY - oy;


		   var value = Math.pow(dx, dx) + Math.pow(dy, dy);

		   var dist = Math.round(Math.sqrt(value));



		   var checkup = false;


		   if(dx < 1  && (canvas.width - trp.x) <=0)
		   {
			   self.map.x = event.stageX - offsetX;
			   self.map.y = event.stageY - offsetY;
			   checkup=false;
		   }else
		   {
			   p = new cjs.Point(l.x, l.y);
               trp = self.map.localToGlobal(p.x, p.y);

		       trp = self.map.parent.globalToLocal(trp.x, trp.y);

		   }

		   if(dx > 0 && trp.x < 0)
		   {
			   self.map.x = event.stageX - offsetX;
			   self.map.y = event.stageY - offsetY;
			   checkup=false;
		   }
		   





		  


		   

	

		 //  console.log('distance', dx/dist, dy/dist);

		   ox = event.stageX;
		   oy = event.stageY;
		  
		   
		

		  //self.map.x = event.stageX - offsetX;
		  //self.map.y = event.stageY - offsetY;



       /* TweenLite.to(self.map, 2, {x:nx, y:ny, onComplete:function()
			{
				self.removeEventListener('tick', onTick)
			}})

			self.addEventListener('tick', onTick)


			function onTick(event)
			{
				self.updatePointerPositions();
			}*/

		


          self.updatePointerPositions();

		
	});


	this.updatePointerPositions = function()
	{

		if(stage.instructionHidden) stage.instr.visible = false;
		
		 for(var i=1; i<39; i++)
		{
			var point = self.map.parent.points['p'+i];
			var pin = self.map.parent.pins['p'+i];


			    pin.map = self.map;
			    pin.boxInfo = self.boxInfo;



			var p= new cjs.Point(point.x,point.y);

			var trp= self.map.localToGlobal(p.x, p.y);

			trp = self.map.parent.globalToLocal(trp.x, trp.y);


			

			if(self.animatePins)
			{
				TweenLite.to(pin, .5, {x:trp.x, y:trp.y, ease:ease});
			}else
			{
				pin.x = trp.x;
			    pin.y = trp.y;
			}


			self.map.parent.addChild(pin);

			if(pin == selectedPoint)
			{
				pin.updateTownPos();
			}
		}


		stage.addChild(stage.views, stage.tLine);


		

	}


	



    var element = document.getElementById('boxInfo');

	this.boxInfo = new createjs.DOMElement(element);





	

	//console.log('boxInfo', this.boxInfo);





        
		this.boxInfo.x=2;
		//this.boxInfo.y=20;
	    

	  



		 element = document.getElementById('close');

	     this.closeBtn = new createjs.DOMElement(element);

		
		 
		 


		 this.updateCloseBtnPos = function()
		 {
			 self.closeBtn.x = self.boxInfo.htmlElement.offsetWidth - self.closeBtn.htmlElement.offsetWidth-5;
		 
		      //self.closeBtn.y = -20;
		 }

		// this.boxInfo.htmlElement.style.height = (canvas.height -20) + 'px';



		 info = new cjs.Container();

		 info.alpha = 0;
		 info.visible = false;

	

		
		 this.addChild(info)

		 this.closeBtn.htmlElement.addEventListener('click',  onCloseBtn);


		 function onCloseBtn(event)
		 {

			    TweenLite.to(info, .5, {alpha:0, onComplete:function()
				 {
					 info.visible = false;
				 }})
		 }
		 
		 
		 
		 
		  this.animatePins = false;

		  element = document.getElementById('town');

	     this.town = new createjs.DOMElement(element);

		 place = new cjs.Container();

		 place.visible = false;
		 place.alpha = 0;

		 place.addChild(this.town);


		 this.addChild(place);



		 element = document.getElementById('navigation');

	     this.nav = new createjs.DOMElement(element);

		 this.navigation = new cjs.Container();

		

		 this.navigation.addChild(this.nav);


		 this.navigation.x = canvas.width - this.nav.htmlElement.offsetWidth >> 1;

		 this.navigation.x+=100;


		 this.addChild(this.navigation);

		 


		 info.addChild(this.boxInfo, this.closeBtn);



		 this.tLine = new lib.timeline();

		 this.tLine.visible = false;
		 this.tLine.alpha = 0;

		 this.tLine.y = canvas.height - this.tLine.height;
		 this.addChild(this.tLine);






		 element = document.getElementById('tooltip');

	     tooltip = new createjs.DOMElement(element);


		 this.tooltip = new cjs.Container();

		 this.tooltip.addChild(tooltip);

		 this.addChild(this.tooltip);


		 this.tooltip.visible = false;





		  element = document.getElementById('instructions');

	     instructions = new createjs.DOMElement(element);


		 this.instr = new cjs.Container();

		 this.instr.addChild(instructions);


		

		 this.addChild(this.instr);


		 this.tooltip.visible = false;

		 this.town.htmlElement.addEventListener('click', onTownClick);






		  element = document.getElementById('in');

	     zoomIn = new createjs.DOMElement(element);



		 element = document.getElementById('out');

	     zoomOut = new createjs.DOMElement(element);


		 this.eviews = new cjs.Container();



		 zoomOut.y = 54 + 5;

		 this.eviews.addChild(zoomIn, zoomOut);

		 this.addChild(this.eviews);

		 this.eviews.x = this.views.x;
		 this.eviews.y = this.views.y;
		  
		 this.eviews.scaleX = this.eviews.scaleY = .8;




		 zoomIn.htmlElement.addEventListener('click', onZoom);
		 zoomOut.htmlElement.addEventListener('click', onZoom);

		 function onZoom(event)
		 {

			 switch(event.target.id)
			 {
				 case 'in':
				 var evt={};
			     evt.target = stage.views.zoomIn;
				 stage.views.onClick(evt);
				  break;

				 case 'out':
				 var evt={};
			     evt.target = stage.views.zoomOut;
			     stage.views.onClick(evt);
				 break;
			 }

			
		}


		 function onTownClick()
		 {

			
			if(selectedPoint)
			     selectedPoint.updateInfoBoxPos();
		 }

		 this.nav.htmlElement.addEventListener('click', onNavClick)

		 function onNavClick(event)
		 {
			
			stage.instructionHidden = true;

			 switch(event.target.id)
			 {
				 case 'btn0': 
				 showModernLocations();

				  break;
				  case 'btn1':
				  enableTimeline();
				  break;
				  default:

			 }


			 selectBtn(event.target);
		 }

		 var selectedBtn;

		 function selectBtn(btn)
		 {
			 var defaultBgColor = '#FFFFFF';
			 var activeBgColor  ='#F300A9';
			 var defaultColor = '#727376';
			 var activeColor  = '#FFFFFF';


			 if(selectedBtn)
			 {
				 selectedBtn.style.backgroundColor=defaultBgColor;
				 selectedBtn.style.color=defaultColor;
			 }

			  btn.style.backgroundColor=activeBgColor;
			  btn.style.color=activeColor;

			  selectedBtn = btn;
			  
		 }


		 function toggleView(timeline)
		 {
			 for(var i=1; i<39; i++)
			 {
				 var pin = stage.pins['p'+i];
				 if(timeline && pin.doMean())
				 {
					 pin.visible = true;
				 }else
				 if(!timeline && !pin.doMean())
				 {
					 pin.visible = true;
				 }else
				 pin.visible = false;
			 }
			 
		 }


		 function showModernLocations()
		 {
			 place.visible = false;
			 
			 stage.tooltip.visible = false;

			 var nx = canvas.width   * .5;
			 var ny = canvas.height  * .5;


                toggleView(false)

			 TweenLite.to(self.map, .5, {scaleX:.24, scaleY:.24, x:nx, y:ny, onComplete:function()
				 {
					 stage.removeEventListener('tick', onTick);
				 }});

			   stage.addEventListener('tick', onTick);

			   function onTick()
			   {
				   stage.updatePointerPositions();
			   }

			if(stage.tLine.visible)
			{
				 TweenLite.to(self.tLine, 1, {alpha:0, ease:Bounce.easeInOut, onComplete:function()
					 {
						 self.tLine.visible = false;
					 }});


					 self.tLine.resetPos();
			}


			


			//activeElement.focus();


			setTimeout(stage.pins['p'+28].onClick, 1000);

			//setTimeout(ae.focus, 1000);
			
		 }

		 var meanDone = false;
		 this.meanPins =[];

		 function enableTimeline()
		 {
			 place.visible = false;
			 
			 self.tLine.visible = true;

			 stage.tooltip.visible = true;

			 var activeElement = document.getElementById('tooltip');

			 activeElement.focus();

			

			 stage.tooltip.y = canvas.height - stage.tLine.height - tooltip.htmlElement.offsetHeight -15;



			 var nx = canvas.width   * .5;
			 var ny = canvas.height  * .5;


            toggleView(true)

			 TweenLite.to(self.map, .5, {scaleX:.24, scaleY:.24, x:nx, y:ny, onComplete:function()
				 {
					 stage.removeEventListener('tick', onTick);
				 }});

			   stage.addEventListener('tick', onTick);

			   function onTick()
			   {
				   stage.updatePointerPositions();
			   }


			

			 TweenLite.to(self.tLine, 1, {alpha:1, ease:Bounce.easeInOut});


			  setTimeout(stage.pins['p'+30].onClick, 1000);
            // var activeElement = document.getElementById('p28');

			 activeElement.focus();

             if(meanDone) return;

			 for(var i=1; i<39; i++)
			 {
				 var pin = stage.pins['p'+i];

				   if(pin.doMean())
				   {
					  

					   stage.meanPins.push(pin);

				   }

				    
			 }

			 meanDone = true;


		

		 }


		

		var btn = document.getElementById('btn0');

		selectBtn(btn);
		//showModernLocations();
         


		
			 this.instr.x = canvas.width - instructions.htmlElement.offsetWidth  >> 1;
		     this.instr.y = canvas.height - instructions.htmlElement.offsetHeight >> 1;

             this.instructionHidden = false;

			 instructions.htmlElement.addEventListener('click', onInstruclick);

			 function onInstruclick(event)
			 {
				 if(event.target.id == "proceed")
				 {
					 self.instr.visible = false;

					 stage.instructionHidden = true;

					 showModernLocations();

				 }
			 }


			 TweenLite.fromTo(this.instr, 1, {alpha:0}, {alpha:1, ease:Bounce.easeInOut})
	
		
		//setTimeout(showModernLocations, 1600);


         window.onresize = function(event)
		 {
			  stage.closeBtn.x = stage.boxInfo.htmlElement.offsetWidth - stage.closeBtn.htmlElement.offsetWidth-5;
		 }
    	//this.updatePointerPositions();


window.document.onkeydown= function(event)
{


     event.stopImmediatePropagation();

	try{


		if(event.code == 'ArrowLeft')
		   {
			   //TweenLite.to(stage.map, .5, {x:stage.map.x-50});;


			   stage.map.x -=10;

		   }
		else
		if(event.code == 'ArrowRight')
		   {
			   stage.map.x +=10;
		   }
		else
	   if(event.code == 'ArrowUp')
			{
				  stage.map.y -=10;
			}

		else
		if(event.code == 'ArrowDown')
		   
			{
				 stage.map.y +=10;

			}



	}catch(error)
	{
		 console.log(error)
	}

}
         
    window.document.onkeyup = function(event)
   {
	   

	 event.stopImmediatePropagation();

	  var element;  var dir;

	  try{




        
	  if(event.code=='Equal')
		{
				  var evt={};
			     evt.target = stage.views.zoomIn;
				 stage.views.onClick(evt);
		}else
			  
		if(event.code == 'Minus')
		{
			var evt={};
			evt.target = stage.views.zoomOut;
			stage.views.onClick(evt);
		}




	 switch(document.activeElement.id)
	 {
		 case 'proceed':
		 
		  if(event.code == 'Space')
		  {
			  onInstruclick(event);

			  activeElement = document.getElementById('p28');

			 setTimeout(activeElement.focus.bind(document.body), 10);

			  //activeElement.focus();

		  }

		  
		 break;


        case 'close':

		 if(event.code == 'Space')
		  {
			     onCloseBtn();
		  }

		   
		
		break;

		 case 'btn0':
		 case 'btn1':
		 
		  if(event.code == 'Space')
		  {
			
			var evt = {};
			evt.target = document.activeElement;

			 onNavClick(evt);
		  }


		 case 'in':
		 
		 if(event.code == 'Equal')
		 {
			 var evt={};
			     evt.target = stage.views.zoomIn;
				 stage.views.onClick(evt);
		 }
		 break;


		  case 'out':
		 
		 if(event.code == 'Minus')
		 {
			 var evt={};
			     evt.target = stage.views.zoomOut;
				 stage.views.onClick(evt);
		 }
		 break;


		 default:

		 try{
			  var pin = stage.pins[event.target.id];

			  //console.log('pin', pin, event.target.id);

			  if(pin)	
			  {
				  //pin.onClick();
			  }


		 }catch(error)
		 {
			 

		 }
		
		 break;

		 
	 }



	  }catch(error)
	  {
		  console.log('error occurred', error);
	  }



      var c = document.getElementById('container');

	  

    }

	


}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;