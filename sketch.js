var x = 100;
var y = 100;
var dir_x = 1;
var dir_y = 1;
var flappy;

function preload() {
  img = loadImage("bird.png");
}

function setup() {
  createCanvas(1000, 600);
  flappy = new Flappy();
  obstacle = new Obstacle();
}

function draw() {
  background(143, 233, 255);
  flappy.draw();
  flappy.update();
  obstacle.draw();
  obstacle.update();
  obstacle.checkCollision(flappy);
  obstacle.countPoints(flappy);
}

function keyPressed() {
  flappy.flap();
}
