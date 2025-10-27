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

    const buttonWidth = 80;
    const buttonHeight = 30;
    const spacing = 10;
    const totalHeight = 3 * buttonHeight + 2 * spacing;
    const startY = (p.height - totalHeight) / 2;

    walkButton.position(20, startY);
    jogButton.position(20, startY + buttonHeight + spacing);
    sprintButton.position(20, startY + 2 * (buttonHeight + spacing));

    [walkButton, jogButton, sprintButton].forEach(btn => {
      btn.style('font-family', 'monospace');
      btn.style('font-size', '16px');
      btn.style('border-radius', '8px');
      btn.style('padding', '8px 12px');
      btn.style('border', 'none');
      btn.style('color', '#fff');
      btn.style('width', `${buttonWidth}px`);
      btn.style('height', `${buttonHeight}px` + 10);
      btn.style('cursor', 'pointer');
    });

    walkButton.style('background-color', '#00AA55');
    walkButton.style('border', '2px solid #025c2fff');
    jogButton.style('background-color', '#e87714ff');
    jogButton.style('border', '2px solid #aa4405ff');
    sprintButton.style('background-color', '#FF3B3B');
    sprintButton.style('border', '3px solid #981515ff');

    walkButton.mousePressed(() => mode = 'walk');
    jogButton.mousePressed(() => mode = 'jog');
    sprintButton.mousePressed(() => mode = 'sprint');
  };

  p.draw = function () {
    p.background('#111');
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
