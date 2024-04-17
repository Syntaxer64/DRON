let topObstacles = [];
let bottomObstacles = [];
let minInterval = 50;
let maxInterval = 200;
let spawnCounterTop;
let spawnThresholdTop;
let spawnCounterBottom;
let spawnThresholdBottom;
let dron;

function setup() {
  createCanvas(1000, 600);
  dron = new Dron();
  spawnCounterTop = 0;
  spawnThresholdTop = random(minInterval, maxInterval);
  spawnCounterBottom = 0;
  spawnThresholdBottom = random(minInterval, maxInterval);
}

function draw() {
  background(143, 233, 255);
  dron.update();
  dron.draw();

  spawnCounterTop++;
  spawnCounterBottom++;
  if (spawnCounterTop >= spawnThresholdTop) {
    let obstacleheight = random(height / 4, height / 2);
    topObstacles.push(new Przeszkoda(width, obstacleheight, true));
    spawnCounterTop = 0;
    spawnThresholdTop = random(minInterval, maxInterval);
  }
  for (let i = topObstacles.length - 1; i >= 0; i--) {
    topObstacles[i].update();
    topObstacles[i].draw();
    if (topObstacles[i].offscreen()) {
      topObstacles.splice(i, 1);
    }
  }

  if (spawnCounterBottom >= spawnThresholdBottom) {
    let obstacleheight = random(height / 4, height / 2);
    bottomObstacles.push(new Przeszkoda(width, obstacleheight, false));
    spawnCounterBottom = 0;
    spawnThresholdBottom = random(minInterval, maxInterval);
  }
  for (let i = bottomObstacles.length - 1; i >= 0; i--) {
    bottomObstacles[i].update();
    bottomObstacles[i].draw();
    if (bottomObstacles[i].offscreen()) {
      bottomObstacles.splice(i, 1);
    }
  }
}

function keyPressed() {
  dron.fly();
}

function keyReleased() {
  dron.fall();
}
