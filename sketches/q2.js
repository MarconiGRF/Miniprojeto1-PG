let arm;

class Arm {
  upperArmLength;
  lowerArmLength;
  angularSpeed;
  currentAngle;
  movementDurationInFrames;
  edgeColor;
  vertexColor;

  constructor(upperArmLength, lowerArmLength, movementDurationInSeconds, edgeColor, vertexColor) {
    this.upperArmLength = upperArmLength;
    this.lowerArmLength = lowerArmLength;
    
    this.angularSpeed = (45 / movementDurationInSeconds) / targetFrameRate;
    this.currentAngle = 0;
    this.movementDurationInFrames = movementDurationInSeconds * targetFrameRate;

    this.edgeColor = edgeColor;
    this.vertexColor = vertexColor;
  }

  drawVertex(x, y) {
    strokeWeight(10);
    stroke(this.vertexColor);
    point(x, y);
  }

  drawEdge(length) {
    strokeWeight(5);
    stroke(this.edgeColor);
    line(0, 0, 0, length);
  }

  update() {
    if (frameCount > this.movementDurationInFrames) {
      return;
    }
    this.currentAngle -= this.angularSpeed;
  }

  display() {
    translate(canvasSize.width / 2, canvasSize.height / 2);
    rotate(this.currentAngle);

    this.drawEdge(this.upperArmLength)
    this.drawVertex(0, 0);

    translate(0, this.upperArmLength);
    rotate(this.currentAngle);
    
    this.drawEdge(this.lowerArmLength);
    this.drawVertex(0, 0);
    this.drawVertex(0, this.lowerArmLength);

  }

}

function setup() {
  createCanvas(canvasSize.width, canvasSize.height);
  noStroke();
  frameRate(targetFrameRate);
  angleMode(DEGREES);

  const uc = 20;
  const upperArmLength = 2 * uc;
  const lowerArmLength = 3 * uc;
  const movementDurationInSeconds = 2;
  
  arm = new Arm(upperArmLength, lowerArmLength, movementDurationInSeconds, colorPalette.slateGray, colorPalette.lightBlue);
}

function draw() {
  background(colorPalette.lightGray);
  arm.update();
  arm.display();
}
