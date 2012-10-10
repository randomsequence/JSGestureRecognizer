var JSRotationGestureRecognizer = JSGestureRecognizer.extend({
  toString: function() {
    return "JSRotationGestureRecognizer";
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
        this.previousRotation = 0;
      } else {
        this.fire(this.target, JSGestureRecognizerStateChanged, this);
        this.velocity = event.rotation - this.rotation;
        this.rotation += (event.rotation - this.previousRotation);
        this.previousRotation = event.rotation;
      }
    }
  },
  
  // seems like if this isn't included jQuery doesn't run gestureend
  gestureend: function(event) {
    this._super(event);
  },
  
  reset: function() {
    this.beganRecognizer = false;
    this.previousRotation = 0;
    this.rotation = 0;
    this.velocity = 0;
  },
  
  setRotation: function(rot) {
    if (typeof rot == 'number') {
      this.rotation = rot;
    }
  }
});
