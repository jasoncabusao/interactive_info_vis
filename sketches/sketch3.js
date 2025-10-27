// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  let walkButton, jogButton, sprintButton;
  let mode = 'none';


  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textFont('monospace');
    p.angleMode(p.DEGREES);

    walkButton = p.createButton('Walk');
    jogButton = p.createButton('Jog');
    sprintButton = p.createButton('Sprint');

    walkButton.position(20, 100);
    jogButton.position(20, 140);
    sprintButton.position(20, 180);

    walkButton.mousePressed(() => mode = 'walk');
    jogButton.mousePressed(() => mode = 'jog');
    sprintButton.mousePressed(() => mode = 'sprint');
  };

  p.draw = function () {
    p.background('#111');
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
