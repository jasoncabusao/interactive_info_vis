registerSketch('sk5', function (p) {
  let table;

  p.preload = function () {
    table = p.loadTable('StateLiteracy.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);
    p.textFont('Arial');
    p.textSize(10);

    // Axes with smaller margins
    let leftMargin = 100;
    let rightMargin = 100;
    let topMargin = 120;
    let bottomMargin = 100;

    p.stroke(0);
    p.line(leftMargin, p.height - bottomMargin, p.width - rightMargin, p.height - bottomMargin); // x-axis
    p.line(leftMargin, p.height - bottomMargin, leftMargin, topMargin); // y-axis

    // Axis labels
    p.noStroke();
    p.textAlign(p.CENTER);
    p.text("Poverty 150%", (p.width - leftMargin - rightMargin) / 2 + leftMargin, p.height - bottomMargin + 30);
    p.textAlign(p.RIGHT);
    p.text("Y-axis Metric", leftMargin - 20, (p.height - bottomMargin + topMargin) / 2);

  };

  p.draw = function () {
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});

