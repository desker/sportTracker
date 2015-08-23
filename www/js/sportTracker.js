var sportTracker = {

  _cache: {
    distance: 0,
    distanceTrack: 0,
    distanceFull: 0
  },

  _maxAlt: 0,

  _minAlt: 10000,

  _prevAlt: 0,

  _altUp: 0,

  _altDown: 0,

  _config: {},

  _distance: function($s1,$d1,$s2,$d2) {
    return 111.2 * Math.acos(Math.sin($s1)*Math.sin($s2) + Math.cos($s1) * Math.cos($s2) * Math.cos($d2-$d1));
  },

  getTime: function() {
    return new Date().getTime() - this._timeStart.getTime();
  },

  getDistance: function() {
    return this._distanceFull;
  },

  _watch: function(position) {
    var self = sportTracker,
        lat = position.coords.latitude,
        lon = position.coords.longitude,
        alt = position.coords.altitude;

    self._maxAlt = self._maxAlt > alt ? self._maxAlt : alt;
    self._minAlt = self._minAlt < alt ? self._minAlt : alt;
    
    if (self._cache.lat && self._cache.lon) {
      var lat2 = self._cache.lat,
          lon2 = self._cache.lon,
          dist = self._distance(lat, lon, lat2, lon2) * 1000;

      self._cache.distance += dist;
      self._cache.distanceTrack += dist;
      self._cache.distanceFull += dist;

      if (alt >= self._prevAlt) {
        self._altUp += alt - self._prevAlt;
      } else {
        self._altDown += self._prevAlt - alt;
      }

      if (self._cache.distanceTrack >= self._config.distanceTrack) {
        var endTime = new Date(),
            time = (endTime.getTime() - self._cache.startTrack.getTime()) / 1000;

        self._config.onDistanceTrack({
          lat: lat,
          lon: lon,
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
          speed: self._cache.distance / (time / 60),
          upAltitude: self._altUp,
          downAltitude: self._altDown,
          maxAltitude: self._maxAlt,
          minAltitude: self._minAlt
        });
        self._cache.distance = 0;
        self._cache.start = new Date();
        self._altUp = 0;
        self._altDown = 0;
        self._maxAlt = 0;
        self._minAlt = 10000;
      }
    } else {
      self._cache.start = new Date();
      self._cache.startTrack = new Date();
    }


    self._cache.lat = lat;
    self._cache.lon = lon;
    self._prevAlt = alt;
  },

  _error: function(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');

  },

  start: function(config) {
    this._config = config;

    this._timeStart = new Date();

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