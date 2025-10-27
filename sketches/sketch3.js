// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textFont('monospace');
    p.angleMode(p.DEGREES);
  };

  p.draw = function () {
    p.background('#111');
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
