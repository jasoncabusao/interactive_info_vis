registerSketch('sk5', function (p) {
  let table;
  let points = [];
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
  let leftMargin = 200;
  let rightMargin = 200;
  let topMargin = 120;
  let bottomMargin = 100;
  let xStart = leftMargin + 50;
  let plotWidth = 850;

  p.preload = function () {
    table = p.loadTable('StateLiteracy.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);
    p.textFont('Sans-serif');
    p.textSize(10);

    // Plot points
    for (let i = 0; i < table.getRowCount(); i++) {
      let row = table.getRow(i);
      let state = row.get('State');
      let poverty = parseFloat(row.get('Poverty_150'));
      let value = parseFloat(row.get('Lit_A'));
      let region = row.get('Region');

      let x = p.map(poverty, 0.1, 0.35, xStart, xStart + plotWidth);
      let y = p.map(value, 240, 285, p.height + 50, 50);

      points.push({ x, y, state, literacy: value, poverty, region });
    }
  }

  p.draw = function () {
    p.background(255);

    // Convert data coordinates to canvas positions
    let x1 = p.map(0.255, 0.1, 0.35, xStart, xStart + plotWidth);
    let x2 = p.map(0.34, 0.1, 0.35, xStart, xStart + plotWidth);
    let y1 = p.map(267, 240, 285, p.height - bottomMargin, topMargin);
    let y2 = p.map(242, 240, 285, p.height - bottomMargin, topMargin);

    // Title and subtitle
    let title = "When Poverty Rises, Literacy Falls — and the Gap Is Regional";
    let subtitle = "Average adult literacy scores decline as the share of residents living below 150% of the poverty line increases. States in the Southeast and Southwest are the most affected, while New England and the Upper Midwest maintain higher literacy levels even at lower poverty rates.";

    // Title styling
    p.textAlign(p.CENTER, p.TOP);
    p.textFont('Arial');
    p.textSize(20);
    p.textStyle(p.BOLD);
    p.fill(0);
    p.text(title, p.width / 2, 30);

    // Subtitle styling
    p.textStyle(p.SEMI_BOLD);
    p.textSize(13);
    p.textWrap(p.WORD);
    p.text(subtitle, p.width / 4.5, 60, p.width / 2); // wrapped to fit nicely




    // DASHED BOX
    // Dashed line settings
    let dashLength = 4;
    let gapLength = 9;
    p.stroke(0);
    p.strokeWeight(2);
    // Top edge
    for (let x = x1; x < x2; x += dashLength + gapLength) {
      p.line(x, y1, x + dashLength, y1);
    }
    // Bottom edge
    for (let x = x1; x < x2; x += dashLength + gapLength) {
      p.line(x, y2, x + dashLength, y2);
    }
    // Ensure y1 is the top and y2 is the bottom
    let yTop = Math.min(y1, y2);
    let yBottom = Math.max(y1, y2);
    // Left edge
    for (let y = yTop; y < yBottom; y += dashLength + gapLength) {
      p.line(x1, y, x1, y + dashLength);
    }
    // Right edge
    for (let y = yTop; y < yBottom; y += dashLength + gapLength) {
      p.line(x2, y, x2, y + dashLength);
    }



    // Light red shading behind the dashed box
    p.noStroke();
    p.fill(255, 100, 100, 50); // light red with transparency
    p.rect(x1, yTop, x2 - x1, yBottom - yTop);


    // AXES
    // x-axis
    p.stroke(0);
    p.line(leftMargin, p.height - bottomMargin, p.width - rightMargin, p.height - bottomMargin);
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(10);
    p.stroke(0);
    p.strokeWeight(1);

    for (let i = 0.1; i <= 0.35; i += 0.05) {
      let x = p.map(i, 0.1, 0.35, xStart, xStart + plotWidth);
      p.line(x, p.height - bottomMargin, x, p.height - bottomMargin + 5); // tick
      p.noStroke();
      p.fill(0);
      p.text((i * 100).toFixed(0) + "%", x, p.height - bottomMargin + 8); // label
    }

    // y-axis
    p.stroke(0);
    p.strokeWeight(1);
    p.line(leftMargin, p.height - bottomMargin, leftMargin, topMargin);
    p.textAlign(p.RIGHT, p.CENTER);
    p.textSize(10);
    p.stroke(0);
    p.strokeWeight(1);

    for (let i = 240; i <= 285; i += 5) {
      let y = p.map(i, 240, 285, p.height - bottomMargin, topMargin);
      p.line(leftMargin - 5, y, leftMargin, y); // tick
      p.noStroke();
      p.fill(0);
      p.text(i, leftMargin - 10, y); // label
    }


    // Axis labels
    p.textStyle(p.NORMAL);
    p.textSize(12);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.text("Population (%) below 150% of the poverty level", (p.width - leftMargin - rightMargin) / 2 + leftMargin, p.height - bottomMargin + 30);
    p.textAlign(p.RIGHT);
    p.text("Average Literacy Score", leftMargin - 40, (p.height - bottomMargin + topMargin) / 2);


    // Convert New Hampshire data point to canvas coordinates
    let nhX = p.map(0.14, 0.1, 0.35, xStart, xStart + plotWidth) - 150;
    let nhY = p.map(278.9, 240, 285, p.height - bottomMargin, topMargin) + 20;

    // Annotation text
    let nhAnnotation = "New Hampshire shows one of the highest average literacy scores in the nation, and one of the lowest poverty rates.";

    // Position annotation slightly above and to the right
    let nhTextX = nhX + 20;
    let nhTextY = nhY - 40;

    p.fill(0);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textWrap(p.WORD);
    p.text(nhAnnotation, nhTextX, nhTextY, 200);

    // Dotted outline around New Hampshire point
    let radius = 10; // radius of the dotted circle
    let dotCount = 15; // number of dots around the circle

    p.stroke(0);
    p.strokeWeight(2);
    for (let i = 0; i < dotCount; i++) {
      let angle = p.TWO_PI * i / dotCount;
      let x = nhX + radius * p.cos(angle) + 150;
      let y = nhY + radius * p.sin(angle) - 60;
      p.point(x, y);
    }

    p.stroke(0);
    p.strokeWeight(1);
    p.line(nhX + 90, nhY - 43, nhX + 135, nhY - 60); // from dot to annotation

    // Annotation text
    let annotation = "Southern states cluster together, showing consistently higher poverty and lower literacy levels compared to other regions.";

    // Position near the right side of the box
    let annotationX = x2 - 160; // slightly inside from the right edge
    let annotationY = yTop + 50; // slightly below the top edge

    p.fill(0);
    p.noStroke();
    p.textAlign(p.LEFT, p.CENTER);
    p.textWrap(p.WORD);
    p.text(annotation, annotationX, annotationY, 150); // 250px wide text box


    // Legend
    let i = 0;
    for (let region in regionColors) {
      p.fill(regionColors[region]);
      p.rect(p.width - 200, 200 + i * 20, 10, 10);
      p.fill(0);
      p.textAlign(p.LEFT);
      p.text(region, p.width - 180, 205 + i * 20);
      i++;
    }

    for (let pt of points) {
      p.fill(regionColors[pt.region] || 'black');
      p.noStroke();
      p.ellipse(pt.x, pt.y, 12, 12);
    }

    // Tooltip on hover
    for (let pt of points) {
      let d = p.dist(p.mouseX, p.mouseY, pt.x, pt.y);
      if (d < 8) {
        // Tooltip background
        p.fill(255);
        p.stroke(0);
        p.rect(p.mouseX + 10, p.mouseY + 10, 220, 60);

        // Tooltip text
        p.noStroke();
        p.fill(0);
        p.textSize(12);
        p.textAlign(p.LEFT, p.TOP);
        p.text(
          `State: ${pt.state}\nRegion: ${pt.region}\nLiteracy: ${pt.literacy}\nPoverty: ${(pt.poverty * 100).toFixed(1)}%`,          p.mouseX + 14,
          p.mouseY + 14
        );
      }
    }
  };


  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});

