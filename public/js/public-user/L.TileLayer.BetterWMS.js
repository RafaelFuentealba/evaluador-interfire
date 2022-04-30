L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  
    onAdd: function (map) {
      // Triggered when the layer is added to a map.
      //   Register a click listener, then do all the upstream WMS things
      L.TileLayer.WMS.prototype.onAdd.call(this, map);
      map.on('click', this.getFeatureInfo, this);
    },
    
    onRemove: function (map) {
      // Triggered when the layer is removed from a map.
      //   Unregister a click listener, then do all the upstream WMS things
      L.TileLayer.WMS.prototype.onRemove.call(this, map);
      map.off('click', this.getFeatureInfo, this);
    },
    
    getFeatureInfo: function (evt) {
      // Make an AJAX request to the server and hope for the best
      var url = this.getFeatureInfoUrl(evt.latlng),
          showResults = L.Util.bind(this.showGetFeatureInfo, this);
      $.ajax({
        url: url,
        success: function (data, status, xhr) {
          var err = typeof data === 'string' ? null : data;
          showResults(err, evt.latlng, data);
        },
        error: function (xhr, status, error) {
          showResults(error);  
        }
      });
    },
    
    getFeatureInfoUrl: function (latlng) {
      // Construct a GetFeatureInfo request URL given a point
      var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
          size = this._map.getSize(),
          
          params = {
              service: 'WMS',
              version: '1.1.1',
              request: 'GetFeatureInfo',
              format: 'image/png',
              transparent: 'true',
              query_layers: this.wmsParams.layers,
              layers: this.wmsParams.layers,
              info_format: 'text/html',
              feature_count: '50',
              srs: 'EPSG:4326',
              width: size.x,
              height: size.y,
              bbox: this._map.getBounds().toBBoxString()
          };
      
      params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
      params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
      
      return this._url + L.Util.getParamString(params, this._url, true);
      console.log()
  
  
    },
    
    showGetFeatureInfo: function (err, latlng, content) {
      console.log(content.length);
  if (content.length>1000)
      { if (err) { console.log(err); return; } // do nothing if there's an error
     
  
  
      
      // Otherwise show the content in a popup, or something.
      L.popup({ maxWidth: 590,maxHeight: 320})
        .setLatLng(latlng)
        .setContent(content)
        .openOn(this._map);
  
      }
  
     
    }
  });
  
  L.tileLayer.betterWms = function (url, options) {
    return new L.TileLayer.BetterWMS(url, options);  
  };
  