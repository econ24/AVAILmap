window.onload = function(){
	var map = avl.Map({minZoom: '0'})
		.addControl('layer', 'top-left')
		.addLayer(avl.VectorLayer("http://{s}.tile.openstreetmap.us/vectiles-highroad/{z}/{x}/{y}.topojson",
			{styles:['road'], properties:['kind'], name:'Roads', zIndex: 1}))
		.addControl('zoom')
		.addControl('marker')

	var layer = avl.VectorLayer("http://{s}.tile.openstreetmap.us/vectiles-buildings/{z}/{x}/{y}.topojson",
			{styles:['building'], name:'Buildings', zIndex: 2})
	map.addLayer(layer)

	map.addMarker([-73.824, 42.686], {name: 'UAlbany'})
	map.addMarker([-76.47492, 42.691599], {name: 'Locke', minZoom: 5})

	var zIndex = 1,
		raster = avl.RasterLayer("http://{s}.tiles.mapbox.com/v3/am3081.map-lkbhqenw/{z}/{x}/{y}.png",
						{zIndex: zIndex})
	map.addLayer(raster)

	var marker = map.addMarker([-73.682446, 42.735232], {name: 'Troy', drag: true, click: _clickedMarker, BGcolor: "#a50026"})
	function _clicked(control) {
		zIndex *= -1;
		raster.zIndex(zIndex);
	}

	var BGcolors = ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],
		custom = map.customControl({name: 'Swap Raster', position: 'bottom-left', click: _clicked})
	function _clickedMarker(m) {
		marker.BGcolor(BGcolors[Math.floor(Math.random()*BGcolors.length)]);
	}
}