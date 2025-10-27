// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  const totalSteps = 1600;
  const totalTime = 600000;
  const stepInterval = totalTime / totalSteps;
  let feet = [];
  let lastStepTime = 0;
  let startTime;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textFont('monospace');
    startTime = p.millis();
  };

  p.draw = function () {
    p.background('#03002e');
    let now = p.millis();

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
