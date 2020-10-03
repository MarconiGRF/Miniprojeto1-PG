let axes, sceneElements;

class SceneElements {
  surfaceCircle;
  rotatingCircle;
  lapDurationInFrames;
  shapesColor;
  pointColor;

  constructor(surfaceCircleRadius, surfaceCircleRotationAroundXAxis, rotatingCircleRadius, lapDurationInSeconds, shapesColor, pointColor) {
    this.lapDurationInFrames = lapDurationInSeconds * targetFrameRate;
    
    this.surfaceCircle = {
      radius: surfaceCircleRadius,
      rotationAroundXAxis: surfaceCircleRotationAroundXAxis
    };

    this.rotatingCircle = {
      radius: rotatingCircleRadius,
      angularSpeed: 360 / this.lapDurationInFrames,
      currentAngle: 0
    };

    this.shapesColor = shapesColor;
    this.pointColor = pointColor;
  }

  drawSquare(x, y, radius) {
    strokeWeight(2);
    stroke(this.shapesColor);
    rect(x, y, radius * 2);
  }

  drawCircle(x, y, radius) {
    strokeWeight(2);
    stroke(this.shapesColor);
    circle(x, y, radius * 2);
  }

  drawPoint(x, y, z) {
    strokeWeight(10);
    stroke(this.pointColor);
    point(x, y, z);
  }

  update() {
    this.rotatingCircle.currentAngle += this.rotatingCircle.angularSpeed;
  }
  
  display() {
    rotateX(this.surfaceCircle.rotationAroundXAxis + 180);

    this.drawSquare(0, 0, this.surfaceCircle.radius);
    this.drawCircle(this.surfaceCircle.radius, this.surfaceCircle.radius, this.surfaceCircle.radius);

    translate(this.surfaceCircle.radius, this.surfaceCircle.radius);
    
    this.drawPoint(0, 0, 0);

    rotateZ(this.rotatingCircle.currentAngle);
    translate(0, - this.surfaceCircle.radius, - this.rotatingCircle.radius);
    
    rotateX(90);
    rotateZ(this.rotatingCircle.currentAngle * 2);

    this.drawCircle(0, 0, this.rotatingCircle.radius);
    this.drawPoint(0, this.rotatingCircle.radius, 0);
  }
}

class Axes {
  xColor;
  yColor;
  zColor;

  constructor(xColor, yColor, zColor) {
    this.xColor = xColor;
    this.yColor = yColor;
    this.zColor = zColor;
  }

  drawLine(x1, y1, z1, x2, y2, z2, color) {
    strokeWeight(1);
    stroke(color);
    line(x1, y1, z1, x2, y2, z2);
  }

  display() {
    this.drawLine(0, 0, 0, canvasSize.width, 0, 0, this.xColor);
    this.drawLine(0, 0, 0, 0, 0, - canvasSize.width, this.yColor);
    this.drawLine(0, 0, 0, 0, - canvasSize.width, 0, this.zColor);

    orbitControl();
  }
}

function setup() {
  createCanvas(canvasSize.width, canvasSize.height, WEBGL);
  angleMode(DEGREES);
  frameRate(targetFrameRate);
  noFill();
  perspective();

  const surfaceCircleRadius = 100;
  const surfaceCircleRotationAroundXAxis = 60;
  const rotatingCircleRadius = 25;
  const lapDurationInSeconds = 4;

  axes = new Axes(colorPalette.red, colorPalette.green, colorPalette.lightBlue);
  sceneElements = new SceneElements(surfaceCircleRadius, surfaceCircleRotationAroundXAxis, rotatingCircleRadius, lapDurationInSeconds, colorPalette.slateGray, colorPalette.yellow);
}
  
function draw() {
  background(colorPalette.lightGray);
  axes.display();
  sceneElements.update();
  sceneElements.display();
}
