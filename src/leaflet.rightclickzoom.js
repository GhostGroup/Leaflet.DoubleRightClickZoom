// Leaflet.DoubleRightClickZoom v1.0.1
// https://github.com/GhostGroup/Leaflet.DoubleRightClickZoom
// Lets users double right click to zoom out on all maps.

L.Map.mergeOptions({
  doubleRightClickZoom: true
});

L.Map.DoubleRightClickZoom = L.Handler.extend({
  addHooks: function() {
    this._map.clicks = 0;
    this._map.on('contextmenu', this._onDoubleClick, this);
  },
  removeHooks: function() {
    this._map.off('contextmenu', this._onDoubleClick, this);
  },
  _onDoubleClick: function(e) {
    this._map.clicks++;
    if (this._map.clicks === 1) {
      setTimeout(((function(_this) {
        return function() {
          if (_this._map.clicks === 1) {
            // single click
          } else {
            // double click
            _this._map.setZoom(Math.ceil(_this._map.getZoom()) - 1);
          }
          _this._map.clicks = 0;
        };
      })(this)), 300);
    }
    return false;
  }
});

L.Map.addInitHook('addHandler', 'doubleRightClickZoom', L.Map.DoubleRightClickZoom);
