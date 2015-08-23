var Timer = function(selector) {
  this.$el = $(selector);
};

Timer.prototype = {

  start: function() {
    var self = this;
      
    this._startAt = new Date();

    this._timer = setInterval(function() {
      var time = new Date().getTime() - self._startAt.getTime(),
          msec = time % 1000,
          sec = (time - msec) / 1000,
          min = Math.floor(sec / 60),
          hour = Math.floor(min / 60);

      sec -= min * 60;
      min -= hour * 60;
      if (msec<100) msec = "0" + msec;

      self.$el.text(hour+':'+min+':'+sec+'.'+msec);
    }, 100);
  }
};