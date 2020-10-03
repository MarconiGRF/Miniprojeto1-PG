let circles;

class Circles {
  outerCircle;
  innerCircle;
  lapDurationInFrames;
  circleColor;
  pointColor;

  constructor(outerCircleRadius, innerCircleRadius, lapDurationInSeconds, circleColor, pointColor) {
    this.lapDurationInFrames = lapDurationInSeconds * targetFrameRate;
    
    this.outerCircle = {
      radius: outerCircleRadius,
      currentAngle: 0,
      angularSpeed: - (360 / this.lapDurationInFrames)
    };

    this.innerCircle = {
      radius: innerCircleRadius,
      currentAngle: 0,
      angularSpeed: (360 * ((outerCircleRadius - innerCircleRadius) / innerCircleRadius)) / this.lapDurationInFrames
    };

    this.circleColor = circleColor;
    this.pointColor = pointColor;
  }

  drawCircle(x, y, radius) {
    strokeWeight(3);
    stroke(this.circleColor);
    circle(x, y, radius * 2);
  }

  drawPoint(x, y) {
    strokeWeight(10);
    stroke(this.pointColor);
    point(x, y);
  }

  update() {
    this.outerCircle.currentAngle += this.outerCircle.angularSpeed;
    this.innerCircle.currentAngle += this.innerCircle.angularSpeed;
  }

  display() {
    translate(canvasSize.width / 2, canvasSize.height / 2);

    this.drawCircle(0, 0, this.outerCircle.radius);    

    rotate(this.outerCircle.currentAngle);
    translate(0, this.innerCircle.radius - this.outerCircle.radius);

    this.drawCircle(0, 0, this.innerCircle.radius);
    
    rotate(this.innerCircle.currentAngle);

    this.drawPoint(0, - this.innerCircle.radius);
  }
}

function setup() {
  createCanvas(canvasSize.width, canvasSize.height);
  noFill();
  angleMode(DEGREES);
  frameRate(targetFrameRate);

  const uc = 2;
  const outerCircleRadius = 100 * uc;
  const innerCircleRadius = 25 * uc;
  const lapDurationInSeconds = 4;
  
  circles = new Circles(outerCircleRadius, innerCircleRadius, lapDurationInSeconds, colorPalette.slateGray, colorPalette.lightBlue);
}

function draw() {
  background(colorPalette.lightGray);
  circles.update();
  circles.display();
}
