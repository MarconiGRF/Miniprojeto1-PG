let bouncingBall, rectangle;

class BouncingBall {
  radius;
  position;
  ground;
  gravity;
  verticalSpeed;
  periodInSeconds;
  color;
  velocity;

  constructor(radius, ground, gravity, verticalSpeed, periodInSeconds, color) {
    this.radius = radius;
    this.ground = ground;
    this.position = createVector(radius, ground - radius);
    this.gravity = gravity;
    this.verticalSpeed = verticalSpeed;
    this.periodInSeconds = periodInSeconds;
    this.color = color;
    this.velocity = createVector(0, verticalSpeed);
  }

  computeVelocity () {
    if (this.velocity.x < 0) {
      this.velocity.x = - canvasSize.width / targetFrameRate / (this.periodInSeconds / 2);
    } else {
      this.velocity.x = canvasSize.width / targetFrameRate / (this.periodInSeconds / 2);
    }
  }

  isOutOfHorizontalBounds() {
    return (this.position.x <= this.radius) || (canvasSize.width < (this.position.x + this.radius));
  }

  reachedGround() {
    return (this.position.y + this.radius) > this.ground;
  }

  update() {
    this.computeVelocity();
    this.position.add(this.velocity);

    if (this.isOutOfHorizontalBounds()) {
      this.velocity.x = - this.velocity.x;
    }

    if (this.reachedGround()){
      this.velocity.y = - this.velocity.y;
      this.position.y = this.ground - this.radius;
    }

    this.velocity.add(this.gravity);
    
  }

  display() {
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
  }
}

class Rectangle {
  x;
  y;
  rectangleWidth;
  rectangleHeight;
  color;

  constructor(x, y, rectangleWidth, rectangleHeight, color) {
    this.x = x;
    this.y = y;
    this.rectangleWidth = rectangleWidth;
    this.rectangleHeight = rectangleHeight;
    this.color = color;
  }

  display() {
    fill(this.color)
    rect(this.x, this.y, this.rectangleWidth, this.rectangleHeight)
  }
}

function setup() {
  createCanvas(canvasSize.width, canvasSize.height);
  noStroke();
  frameRate(targetFrameRate);

  const ballRadius = 30;
  const ballVerticalSpeed = 10;
  const gravity = createVector(0, 0.5);
  const ground = canvasSize.height/2;
  const periodInSeconds = 4;

  bouncingBall = new BouncingBall(ballRadius, ground, gravity, ballVerticalSpeed, periodInSeconds, colorPalette.lightBlue);
  rectangle = new Rectangle(0, ground, canvasSize.width, (canvasSize.height - ground), colorPalette.slateGray);
}

function draw() {
  background(colorPalette.lightGray);
  rectangle.display();
  bouncingBall.update();
  bouncingBall.display();
}
