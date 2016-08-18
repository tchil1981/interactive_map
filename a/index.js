(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
lib.webFontTxtFilters = {}; 

// library properties:
lib.properties = {
	width: 4689,
	height: 3036,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"images/map.jpg", id:"map"},
		{src:"images/pointer.png", id:"pointer"}
	]
};



lib.ssMetadata = [];


lib.webfontAvailable = function(family) { 
	lib.properties.webfonts[family] = true;
	var txtFilters = lib.webFontTxtFilters && lib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(lib.map = function() {
	this.initialize(img.map);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4689,3036);


(lib.pointer = function() {
	this.initialize(img.pointer);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,31,55);


(lib.pin = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.pointer();
	this.instance.setTransform(-16,-17);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16,-17,31,55);


// stage content:
(lib.index = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// layer
	this.bethelm_hospital_off_map = new lib.pin();
	this.bethelm_hospital_off_map.setTransform(3442.2,1273,1,1,0,0,0,15.5,27.5);

	this.tower_of_london = new lib.pin();
	this.tower_of_london.setTransform(4171.2,1958.9,1,1,0,0,0,15.5,27.5);

	this.the_red_lion = new lib.pin();
	this.the_red_lion.setTransform(4243.2,1562,1,1,0,0,0,15.5,27.5);

	this.roman_walls_gates = new lib.pin();
	this.roman_walls_gates.setTransform(4015.2,1577,1,1,0,0,0,15.5,27.5);

	this.the_boars_head = new lib.pin();
	this.the_boars_head.setTransform(4111.2,1561,1,1,0,0,0,15.5,27.5);

	this.the_theatre = new lib.pin();
	this.the_theatre.setTransform(3499.1,999,1,1,0,0,0,15.5,27.5);

	this.the_curtain = new lib.pin();
	this.the_curtain.setTransform(3510.2,1091,1,1,0,0,0,15.5,27.5);

	this.the_bull = new lib.pin();
	this.the_bull.setTransform(3434.2,1525,1,1,0,0,0,15.5,27.5);

	this.cross_keys = new lib.pin();
	this.cross_keys.setTransform(3435.2,1715.4,1,1,0,0,0,15.5,27.5);

	this.bell_inn = new lib.pin();
	this.bell_inn.setTransform(3438.2,1828.9,1,1,0,0,0,15.5,27.5);

	this.london_bridge = new lib.pin();
	this.london_bridge.setTransform(3501.1,2242.8,1,1,0,0,0,15.5,27.5);

	this.the_houpe_off_map = new lib.pin();
	this.the_houpe_off_map.setTransform(2781.6,2546.8,1,1,0,0,0,15.5,27.5);

	this.the_globe = new lib.pin();
	this.the_globe.setTransform(2907.1,2507.3,1,1,0,0,0,15.5,27.5);

	this.the_rose = new lib.pin();
	this.the_rose.setTransform(2820.6,2452.3,1,1,0,0,0,15.5,27.5);

	this.newington_butts_off_map = new lib.pin();
	this.newington_butts_off_map.setTransform(2575.6,2542.3,1,1,0,0,0,15.5,27.5);

	this.bankside = new lib.pin();
	this.bankside.setTransform(2590.6,2327.8,1,1,0,0,0,15.5,27.5);

	this.the_swan = new lib.pin();
	this.the_swan.setTransform(1998.6,2441.3,1,1,0,0,0,15.5,27.5);

	this.the_fortune = new lib.pin();
	this.the_fortune.setTransform(2444.6,1104.9,1,1,0,0,0,15.5,27.5);

	this.the_red_bull = new lib.pin();
	this.the_red_bull.setTransform(1920.6,1069.4,1,1,0,0,0,15.5,27.5);

	this.newgate = new lib.pin();
	this.newgate.setTransform(2111.1,1632,1,1,0,0,0,15.5,27.5);
	new cjs.ButtonHelper(this.newgate, 0, 1, 1);

	this.silver_street = new lib.pin();
	this.silver_street.setTransform(2581.6,1398.9,1,1,0,0,0,15.5,27.5);

	this.cheapside = new lib.pin();
	this.cheapside.setTransform(2508.1,1577,1,1,0,0,0,15.5,27.5);

	this.st_paul_s = new lib.pin();
	this.st_paul_s.setTransform(2362.6,1706.4,1,1,0,0,0,15.5,27.5);

	this.the_bell_savage_inn = new lib.pin();
	this.the_bell_savage_inn.setTransform(2177.1,1751.8,1,1,0,0,0,15.5,27.5);

	this.blackfriars = new lib.pin();
	this.blackfriars.setTransform(2191.6,1806.8,1,1,0,0,0,15.5,27.5);

	this.the_secound_blackfriars = new lib.pin();
	this.the_secound_blackfriars.setTransform(1985.1,1813.9,1,1,0,0,0,15.5,27.5);

	this.the_first_blackfriars = new lib.pin();
	this.the_first_blackfriars.setTransform(1979.6,1779.3,1,1,0,0,0,15.5,27.5);

	this.tahmes = new lib.pin();
	this.tahmes.setTransform(1776.1,2099.9,1,1,0,0,0,15.5,27.5);

	this.salisbury_court = new lib.pin();
	this.salisbury_court.setTransform(1841.4,1895.9,1,1,0,0,0,15.5,27.5);

	this.whitefriars = new lib.pin();
	this.whitefriars.setTransform(1570.5,1664.4,1,1,0,0,0,15.5,27.5);

	this.inns_of_court = new lib.pin();
	this.inns_of_court.setTransform(1492.5,1738.4,1,1,0,0,0,15.5,27.5);

	this.somerset_house = new lib.pin();
	this.somerset_house.setTransform(1121.7,1746.4,1,1,0,0,0,15.5,27.5);

	this.the_cockpit = new lib.pin();
	this.the_cockpit.setTransform(1100.7,1546,1,1,0,0,0,15.5,27.5);

	this.lambeth_place = new lib.pin();
	this.lambeth_place.setTransform(751,2471.1,1,1,0,0,0,15.5,27.5);

	this.Tyburn_off_map = new lib.pin();
	this.Tyburn_off_map.setTransform(85.2,1505,1,1,0,0,0,15.5,27.5);

	this.westminster = new lib.pin();
	this.westminster.setTransform(235.7,2265.6,1,1,0,0,0,15.5,27.5);

	this.the_strand = new lib.pin();
	this.the_strand.setTransform(927.9,1672.9,1,1,0,0,0,15.5,27.5);

	this.whitehall = new lib.pin();
	this.whitehall.setTransform(419.9,1972.2,1,1,0,0,0,15.5,27.5);

	this.instance = new lib.map();

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0066CC").s().p("ElZEAJsIAAzXMKyJAAAIAATXg");
	this.shape.setTransform(2308.6,2894.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance},{t:this.whitehall},{t:this.the_strand},{t:this.westminster},{t:this.Tyburn_off_map},{t:this.lambeth_place},{t:this.the_cockpit},{t:this.somerset_house},{t:this.inns_of_court},{t:this.whitefriars},{t:this.salisbury_court},{t:this.tahmes},{t:this.the_first_blackfriars},{t:this.the_secound_blackfriars},{t:this.blackfriars},{t:this.the_bell_savage_inn},{t:this.st_paul_s},{t:this.cheapside},{t:this.silver_street},{t:this.newgate},{t:this.the_red_bull},{t:this.the_fortune},{t:this.the_swan},{t:this.bankside},{t:this.newington_butts_off_map},{t:this.the_rose},{t:this.the_globe},{t:this.the_houpe_off_map},{t:this.london_bridge},{t:this.bell_inn},{t:this.cross_keys},{t:this.the_bull},{t:this.the_curtain},{t:this.the_theatre},{t:this.the_boars_head},{t:this.roman_walls_gates},{t:this.the_red_lion},{t:this.tower_of_london},{t:this.bethelm_hospital_off_map}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2344.5,1518,4689,3036);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;