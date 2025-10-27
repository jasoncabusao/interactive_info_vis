// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let bunnyFrames = [];
  let currentFrame = 0;
  let frameInterval = 100;
  let lastFrameSwitch = 0;
  let lastMoveTime = 0;

  p.preload = function () {
    for (let i = 0; i < 6; i++) {
      bunnyFrames[i] = p.loadImage(`../runningbunny/bunny${i + 1}.jpg`);
    }
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textFont('monospace');
  };

  p.draw = function () {
    p.background('#39760E');

    let now = p.millis();
    let isMoving = now - lastMoveTime < 100;

    //movement detection
    p.fill('#fff');
    p.textSize(20);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(isMoving ? "You're running!" : "Move your mouse to run!", p.width / 2, p.height / 2);


    if (now - lastFrameSwitch > frameInterval) {
      currentFrame = (currentFrame + 1) % bunnyFrames.length;
      lastFrameSwitch = now;
    }

    let img = bunnyFrames[currentFrame];
    if (img) {
      p.image(img, p.width / 2 - 150, p.height / 2 - 150, 300, 300);
    }
  };

  p.mouseMoved = function () {
    lastMoveTime = p.millis();
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };

});
