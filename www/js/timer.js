var Timer = function(selector) {
  this.$el = $(selector);

  this.$el.text('00:00:00.000');
};

Timer.prototype = {

  start: function() {
    var self = this;
      
    if (!this._startAt) this._startAt = new Date();

    this._timer = setInterval(function() {
      var time = new Date().getTime() - self._startAt.getTime(),
          msec = time % 1000,
          sec = (time - msec) / 1000,
          min = Math.floor(sec / 60),
          hour = Math.floor(min / 60);

      sec -= min * 60;
      min -= hour * 60;

      if (msec<10) msec = "00" + msec;
      else if (msec<100) msec = "0" + msec;

      if (sec < 10) sec = "0" + sec;
      if (min < 10) min = "0" + min;
      if (hour < 10) hour = "0" + hour;

      self.$el.text(hour+':'+min+':'+sec+'.'+msec);
    }, 100);
  },

  stop: function() {
    clearInterval(this._timer);
  },

  clear: function() {
    if (this._timer) clearInterval(this._timer);
    this._startAt = null;
    this.$el.text('00:00:00.000');
  }
};