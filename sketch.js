let shapeHeight;
let horizon;
let boxSize = 100; // size of the moving box

function setup() {
  createCanvas(windowWidth, windowHeight);
  horizon = height / 2;
}

function draw() {
  shapeHeight = mouseY;

  // background color depends on shape position
  if (shapeHeight < horizon) {
    background("green");
  } else {
    background("grey");
  }

  // box follows the mouse
  fill("white");
  rect(mouseX - boxSize/2, mouseY - boxSize/2, boxSize, boxSize);

  // text inside box
  textSize(16);
  fill("black");
  textAlign(CENTER, CENTER);
  text('Hi! My name is Jason Cabusao! :p', mouseX, mouseY);

  // horizon line
  stroke('lavender');
  line(0, horizon, width, horizon);

  // grass rectangle (bottom half)
  fill("lavender");
  rect(0, horizon, width, height - horizon);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  horizon = height / 2;
}
