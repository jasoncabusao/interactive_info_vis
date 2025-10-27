// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textFont('monospace');
  };

  p.draw = function () {
    p.background('#39760E');
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };

});
