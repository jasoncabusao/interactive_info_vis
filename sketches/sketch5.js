registerSketch('sk5', function (p) {
  let table;
  let regionColors = {
    "New England": "#c282dfff",
    "Mideast": "#7ece5bff",
    "Southeast": "#ac8636ff",
    "Great Lakes": "#68aff1ff",
    "Plains": "#dba800ff",
    "Southwest": "#e380b5ff",
    "Rocky Mountains": "#f0f060ff",
    "Far West": "#f17769ff"
  };

  p.preload = function () {
    table = p.loadTable('StateLiteracy.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);
    p.textFont('Arial');
    p.textSize(10);

    // Axes with smaller margins
    let leftMargin = 200;
    let rightMargin = 200;
    let topMargin = 120;
    let bottomMargin = 100;

    p.stroke(0);
    p.line(leftMargin, p.height - bottomMargin, p.width - rightMargin, p.height - bottomMargin); // x-axis
    p.line(leftMargin, p.height - bottomMargin, leftMargin, topMargin); // y-axis

    // Axis labels
    p.noStroke();
    p.textAlign(p.CENTER);
    p.text("Population (%) below 150% of the poverty level", (p.width - leftMargin - rightMargin) / 2 + leftMargin, p.height - bottomMargin + 30);
    p.textAlign(p.RIGHT);
    p.text("Average Literacy Score", leftMargin - 20, (p.height - bottomMargin + topMargin) / 2);

    // Plot points
    for (let i = 0; i < table.getRowCount(); i++) {
      let row = table.getRow(i);
      let state = row.get('State');
      let poverty = parseFloat(row.get('Poverty_150'));
      let value = parseFloat(row.get('Lit_A'));
      let region = row.get('Region');

      let x = p.map(poverty, 0.1, 0.35, leftMargin+50, p.width - 400);
      let y = p.map(value, 240, 285, p.height + 50, 50);

      p.fill(regionColors[region] || 'black');      p.noStroke();
      p.ellipse(x, y, 12, 12);
      p.textAlign(p.CENTER);
    }

    // Legend
    let i = 0;
    for (let region in regionColors) {
      p.fill(regionColors[region]);
      p.rect(p.width - 200, 60 + i * 20, 10, 10);
      p.fill(0);
      p.textAlign(p.LEFT);
      p.text(region, p.width - 180, 70 + i * 20);
      i++;
    }

  };

  p.draw = function () {
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});

