registerSketch('sk5', function (p) {
  p.preload = function () {
    table = p.loadTable('StateLiteracy.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);
    p.textFont('Arial');
    p.textSize(10);
  };

  p.draw = function () {
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});

