let axes, spiral;

class Spiral {
  initialX;
  semicircleDrawingDurationInFrames;
  color;

  constructor(initialX, semicircleDrawingDurationInSeconds, color) {
    this.initialX = initialX;
    this.semicircleDrawingDurationInFrames = semicircleDrawingDurationInSeconds * targetFrameRate;
    this.color = color;
  }

  drawArc(centerX, radius, currentAngle, backwards) {
    noFill();
    strokeWeight(3);
    stroke(this.color);
    if (!backwards) {
      arc(centerX, 0, radius * 2, radius * 2, 180 - currentAngle, 180);
    } else {
      arc(centerX, 0, radius * 2, radius * 2, 360 - currentAngle, 0);
    }
  }

  display() {
    translate(canvasSize.width / 2, canvasSize.height / 2);

    const arcsToDraw = Math.ceil(frameCount / this.semicircleDrawingDurationInFrames);
    const lastArcAngle = ((frameCount % this.semicircleDrawingDurationInFrames) * 180) / this.semicircleDrawingDurationInFrames;

    let centerX = 0;
    let radius = this.initialX - 0;
    let backwards = this.initialX > 0;

    for (let drawnArcs = 0; drawnArcs < arcsToDraw; drawnArcs++) {
      if (drawnArcs === (arcsToDraw - 1) && lastArcAngle !== 0) {
        this.drawArc(centerX, radius, lastArcAngle, backwards);
      } else {
        this.drawArc(centerX, radius, 180, backwards);
      }

      backwards = !backwards;

      if (!backwards) {
        centerX = centerX - radius;
      } else {
        centerX = centerX + radius;
      }

      radius = radius * 2;
    }
  }
}

class Axes {
  xColor;
  yColor;
  
  constructor(xColor, yColor) {
    this.xColor = xColor;
    this.yColor = yColor;
  }

  drawLine(x1, y1, x2, y2, color) {
    strokeWeight(1);
    stroke(color);
    line(x1, y1, x2, y2);
  }

  display() {
    this.drawLine(0, canvasSize.height / 2, canvasSize.width, canvasSize.height / 2, this.xColor);
    this.drawLine(canvasSize.width / 2, 0, canvasSize.width / 2, canvasSize.height, this.yColor);
  }
}

function setup() {
  createCanvas(canvasSize.width, canvasSize.height);
  angleMode(DEGREES);
  frameRate(targetFrameRate);

  const initialX = -20;
  const semicircleDrawingDurationInSeconds = 4;

  axes = new Axes(colorPalette.lightBlue, colorPalette.slateGray);
  spiral = new Spiral(initialX, semicircleDrawingDurationInSeconds, colorPalette.slateGray);
}
  
function draw() {
  background(colorPalette.lightGray);
  axes.display();
  spiral.display();
}
