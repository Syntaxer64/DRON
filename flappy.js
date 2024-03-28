class Flappy {
  r = 10;
  pos = createVector(width / 2, height / 2);
  vel = createVector(0, 0.5);
  acc = createVector(0, 0.15);
  opor = createVector(0, 1.5);
  bird_size = 100;

  update = function () {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    if (this.pos.y > height - this.r / 2) {
      this.vel.y = 0;
      this.acc.y = 0;
      this.pos.y = height - this.r / 2;
    }
    if (this.pos.x >= width) {
      this.pos.x = 0;
    }
    this.acc.add(this.opor);
    if (this.acc.y > 0.5) this.acc.y = 0.3;
    this.vel.limit(8);
  };

  draw = function () {
    stroke(0, 0);
    fill(113, 215, 217);
    ellipse(this.pos.x, this.pos.y, this.r);
    image(
      img,
      this.pos.x - this.bird_size / 2,
      this.pos.y - this.bird_size / 2
    );
    img.resize(this.bird_size, 0);
  };

  flap = function () {
    var flap_acc = createVector(0, -8);
    this.acc.add(flap_acc);
  };
}
