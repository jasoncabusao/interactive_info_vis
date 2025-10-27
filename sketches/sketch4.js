// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  const totalSteps = 1600;
  const totalTime = 600000;
  const stepInterval = totalTime / totalSteps;
  let feet = [];
  let lastStepTime = 0;
  let startTime;
  let totalStepsTaken = 0;


  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textFont('monospace');
    startTime = p.millis();
  };

  p.draw = function () {
    p.background('#03002e');
    let now = p.millis();

    let totalStepsNow = totalStepsTaken + feet.length;
    let mileText = `Miles: ${(totalStepsNow / 1600).toFixed(2)}`;
    let stepText = `Steps: ${totalStepsNow}`;
    let fullText = `${stepText}   ${mileText}`;

    p.textSize(20);
    p.textFont('monospace');
    let textWidth = p.textWidth(fullText);
    let padding = 20;
    let boxWidth = textWidth + padding;
    let boxHeight = 40;

    p.fill('#222');
    p.stroke('#888');
    p.strokeWeight(2);
    p.rectMode(p.CENTER);
    p.rect(p.width / 2, 40, boxWidth, boxHeight, 10);

    p.fill('#fff');
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.text(fullText, p.width / 2, 40);

    if (now - lastStepTime >= stepInterval) {
      feet.push({
        x: p.random(p.width),
        y: p.random(80, p.height),
        angle: p.random(360)
      });
      lastStepTime = now;
    }

    p.fill('#fff');
    p.noStroke();
    feet.forEach(foot => {
      p.push();
      p.translate(foot.x, foot.y);
      p.rotate(foot.angle);
      p.textSize(24);
      p.text('🦶', 0, 0);
      p.pop();
    });
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
