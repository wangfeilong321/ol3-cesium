var ol2d = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  target: 'map',
  view: new ol.View({
    center: ol.proj.transform([25, 20], 'EPSG:4326', 'EPSG:3857'),
    zoom: 3
  })
});


var ol3d;


function _doToggle() {
  ol3d.setEnabled(!ol3d.getEnabled());
}


function toggle3D() {
  if (!ol3d) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../Cesium/Cesium.js";
    console.log('loading Cesium...');

    s.onload = function() {
      init3D();
      _doToggle();
    };

    document.body.appendChild(s);
  } else {
     _doToggle();
  }
}


function init3D() {
  ol3d = new olcs.OLCesium({map: ol2d});
  var scene = ol3d.getCesiumScene();
  var terrainProvider = new Cesium.CesiumTerrainProvider({
      url : '//cesiumjs.org/stk-terrain/tilesets/world/tiles'
  });
  scene.terrainProvider = terrainProvider;
}
