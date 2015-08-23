var sportTracker = {

  _cache: {
    distance: 0,
    distanceTrack: 0,
    distanceFull: 0
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
      self._cache.distanceFull += dist;

      if (self._cache.distanceTrack >= self._config.distanceTrack) {
        var endTime = new Date(),
            time = (endTime.getTime() - self._cache.startTrack.getTime()) / 1000;

        self._config.onDistanceTrack({
          distanceFull: self._cache.distanceFull, 
          start: self._cache.startTrack,
          end: endTime,
          time: time,
          distance: self._cache.distanceTrack,
          speed: self._cache.distanceTrack / (time / 60)
        });
        self._cache.distanceTrack = 0;
        self._cache.startTrack = new Date();
      }
      
      if (self._cache.distance >= self._config.distance) {
        var endTime = new Date(),
            time = (endTime.getTime() - self._cache.start.getTime()) / 1000;

        self._config.onDistance({
          distanceFull: self._cache.distanceFull,
          start: self._cache.start,
          end: endTime,
          time: time,
          distance: self._cache.distance,
          speed: self._cache.distance / (time / 60)
        });
        self._cache.distance = 0;
        self._cache.start = new Date();
      }
    } else {
      self._cache.start = new Date();
      self._cache.startTrack = new Date();
    }


    self._cache.lat = lat;
    self._cache.lon = lon;
  },

  _error: function(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');

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
  },

  end: function() {
    navigator.geolocation.clearWatch(this._watchID);
  },

  canTrack: function() {
    var error = false;
    navigator.geolocation.getCurrentPosition(function() {
      error = true;
    }, function(err) {
      error = error.message;
    });

    return error;
  }

}