// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let elapsedTime = 0;
  let lastMoveTime = 0;
  let lastFrameTime = 0;
  let bunnyFrames = [];
  let currentFrame = 0;
  let frameInterval = 100;
  let lastFrameSwitch = 0;
  let hasMovedOnce = false;


  p.preload = function () {
    for (let i = 0; i < 6; i++) {
      bunnyFrames[i] = p.loadImage(`runningbunny/bunny${i + 1}.jpg`);
    }
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textFont('monospace');
    lastFrameTime = p.millis();
  };

  p.draw = function () {
    p.background('#39760E');

    let now = p.millis();
    let deltaTime = now - lastFrameTime;
    lastFrameTime = now;

    let isMoving = now - lastMoveTime < 100;
    if (isMoving) {
      elapsedTime += deltaTime;
      if (now - lastFrameSwitch > frameInterval) {
        currentFrame = (currentFrame + 1) % bunnyFrames.length;
        lastFrameSwitch = now;
      }
    }

    let pad = (num, size) => num.toString().padStart(size, '0');
    let ms = Math.floor(elapsedTime % 1000);
    let sec = Math.floor((elapsedTime / 1000) % 60);
    let min = Math.floor((elapsedTime / 60000) % 60);
    let hr = Math.floor((elapsedTime / 3600000) % 24);
    let days = Math.floor(elapsedTime / 86400000);

    let formatted = `${pad(days, 2)}d ${pad(hr, 2)}h ${pad(min, 2)}m ${pad(sec, 2)}s ${pad(ms, 3)}ms`;

    p.fill("#183800");
    p.textSize(48);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${formatted}`, p.width / 2, 100);

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

    let message;
    if (!hasMovedOnce) {
      message = "Move cursor to simulate you running.";
    } else {
      message = isMoving ? "That's it! Keep running!" : "HEY! Why’d you stop?";
    }

    p.fill('#333');
    p.textSize(20);
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(message, p.width / 2, p.height / 2 + 100 + 80);
  };

  p.mouseMoved = function () {
    lastMoveTime = p.millis();
    hasMovedOnce = true;
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };

});
