var sportTracker = {

  _cache: {
    distance: 0,
    distanceTrack: 0
  },

  _config: {},

  _distance: function($s1,$d1,$s2,$d2) {
    return 111.2 * Math.acos(Math.sin($s1)*Math.sin($s2) + Math.cos($s1) * Math.cos($s2) * Math.cos($d2-$d1));
  },

  _watch: function(position) {
    var self = sportTracker,
        lat = position.coords.latitude,
        lon = position.coords.longitude;

    
    if (self._cache.lat && self._cache.lon) {
      var lat2 = self._cache.lat,
          lon2 = self._cache.lon,
          dist = self._distance(lat, lon, lat2, lon2) * 1000;

      self._cache.distance += dist;
      self._cache.distanceTrack += dist;
      
      if (self._cache.distance >= self._config.distance) {
        var startDate = self._cache.startDate,
            endDate = new Date(),
            diffTime = (endDate.getTime() - startDate.getTime()) / 1000,
            distance = self._cache.distance,
            speed = distance / (diffTime / 60);

        self._config.onDistance(startDate, endDate, diffTime, distance, speed);
        self._cache.distance = 0;
        self._cache.startDate = new Date();
      }
    } else {
      self._cache.startDate = new Date();
    }


    self._cache.lat = lat;
    self._cache.lon = lon;
  },

  _error: function() {

  },

  start: function(config) {
    this._config = config;

    this._watchID = navigator.geolocation.watchPosition(
      this._watch,
      this._error,
      {
        timeout: config.watch*1000
      }
    );
  }

}