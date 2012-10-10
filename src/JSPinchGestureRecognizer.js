var JSPinchGestureRecognizer = JSGestureRecognizer.extend({
  toString: function() {
    return "JSPinchGestureRecognizer";
  },
  
  touchstart: function(event) {
    if (event.target == this.target) {
      event.preventDefault();
      this._super(event);
      this.center = this.getEventCenter(event);
    }
  },

  touchmove: function(event) {
      if (event.target == this.target || !MobileSafari) {
        this._super(event);
        this.center = this.getEventCenter(event);
      }
  },

  touchend: function(event) {
      if (event.target == this.target || !MobileSafari) {
        this._super(event);
        delete(this.center);
      }
  },  
  
  gesturestart: function(event) {
    if (event.target == this.target) {
      var allTouches = event.allTouches();
      if (allTouches.length == 2) {
        event.preventDefault();
        this._super(event);
      }
    }
  },
  
  gesturechange: function(event) {
    if (event.target == this.target) {
      event.preventDefault();
      if (this.beganRecognizer === false) {
        this.fire(this.target, JSGestureRecognizerStateBegan, this);
        this.beganRecognizer = true;
        this.previousScale = 1;        
      } else {
        this.fire(this.target, JSGestureRecognizerStateChanged, this);
        this.velocity = event.scale / this.scale;
        this.scale *= (event.scale / this.previousScale);
        this.previousScale = event.scale;
      }
    }
  },
  
  // seems like if this isn't included jQuery doesn't run gestureend
  gestureend: function(event) {
    this._super(event);
  },
  
  reset: function() {
    this.beganRecognizer = false;
    this.scale = 1;
    this.previousScale = 1;
    this.velocity = 0;
  },
  
  setScale: function(scale) {
    if (typeof scale == 'number') {
      this.scale = scale;
    }
  }
});
