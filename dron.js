class Dron {
    r = 10;
    pos = createVector(width / 2, height / 2);
    vel = createVector(0, 0.5);
    acc = createVector(0, 0.15);
    opor = createVector(0, 1.5);
    drone_size = 100;
    flyKeyPressed=false;
  
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

      if (this.flyKeyPressed) {
        var fly_acc = createVector(0, -0.5);
        this.acc.add(fly_acc);
    };
};
  
    draw = function () {
      stroke(0, 0);
      fill(113, 215, 217);
      ellipse(this.pos.x, this.pos.y, this.r);
    };
  
    fly = function () {
      this.flyKeyPressed=true;
    };

    fall = function () {
        this.flyKeyPressed=false;
    }
  };