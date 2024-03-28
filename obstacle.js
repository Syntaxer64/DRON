class Obstacle {
  points = 0;
  obs_width = 150;
  pos1 = createVector(width, height);
  pos2 = createVector(width + width / 2 + this.obs_width / 2, height);
  vel = createVector(-8, 0);
  acc = createVector(-0.001, 0);
  obs_height1 = random(50, 450);
  obs_height2 = random(50, 450);
  open_height = 260;
  pts = document.getElementById("pts");

  update = function () {
    this.pos1.add(this.vel);
    this.vel.add(this.acc);
    if (this.pos1.x < 0 - this.obs_width) {
      this.pos1.x = width;
      this.obs_height1 = random(50, 200);
    }
    this.pos2.add(this.vel);
    this.vel.add(this.acc);
    if (this.pos2.x < 0 - this.obs_width) {
      this.pos2.x = width;
      this.obs_height2 = random(50, 200);
    }
  };

  draw = function () {
    stroke(0, 0);
    fill(113, 215, 217);
    rect(
      this.pos1.x,
      this.pos1.y - this.obs_height1,
      this.obs_width,
      this.obs_height1
    );
    //stroke(0,0);
    //fill(255);
    //rect(this.pos1.x,this.pos1.y-(this.obs_height1+this.open_height),this.obs_width,this.open_height);
    stroke(0, 0);
    fill(113, 215, 217);
    rect(
      this.pos1.x,
      0,
      this.obs_width,
      height - (this.open_height + this.obs_height1)
    );

    stroke(0, 0);
    fill(113, 215, 217);
    rect(
      this.pos2.x,
      this.pos2.y - this.obs_height2,
      this.obs_width,
      this.obs_height2
    );
    //stroke(0,0);
    //fill(255);
    //rect(this.pos2.x,this.pos2.y-(this.obs_height2+this.open_height),this.obs_width,this.open_height);
    stroke(0, 0);
    fill(113, 215, 217);
    rect(
      this.pos2.x,
      0,
      this.obs_width,
      height - (this.open_height + this.obs_height2)
    );
  };

  checkCollision = function (flappy) {
    if (
      flappy.pos.x + flappy.bird_size / 3 >= this.pos1.x &&
      flappy.pos.x - flappy.bird_size / 4 <= this.pos1.x + this.obs_width
    ) {
      if (
        flappy.pos.y + flappy.bird_size / 3 >= height - this.obs_height1 ||
        flappy.pos.y - flappy.bird_size / 3 <=
          height - (this.open_height + this.obs_height1)
      ) {
        noLoop();
      }
    }

    if (
      flappy.pos.x + flappy.bird_size / 2 >= this.pos2.x &&
      flappy.pos.x - flappy.bird_size / 4 <= this.pos2.x + this.obs_width
    ) {
      if (
        flappy.pos.y + flappy.bird_size / 3 >= height - this.obs_height2 ||
        flappy.pos.y - flappy.bird_size / 3 <=
          height - (this.open_height + this.obs_height2)
      ) {
        noLoop();
      }
    }
  };


  //Punkty mogą się zmieniać nawet przy przegranej
  countPoints = function (flappy) {
    if (
      flappy.pos.x >= this.pos1.x &&
      flappy.pos.x <= this.pos1.x + this.obs_width
    ) {
      if (
        flappy.pos.y <= height - this.obs_height1 &&
        flappy.pos.y >= height - (this.open_height + this.obs_height1)
      ) {
        if (this.points == 0) {
          this.points = 1;
        } else {
          this.points += 1 / 26;
          this.pts.innerHTML = parseInt(this.points);
        }
      }
    }
    if (
      flappy.pos.x >= this.pos2.x &&
      flappy.pos.x <= this.pos2.x + this.obs_width
    ) {
      if (
        flappy.pos.y <= height - this.obs_height2 &&
        flappy.pos.y >= height - (this.open_height + this.obs_height2)
      ) {
        this.points += 1 / 26;
        this.pts.innerHTML = parseInt(this.points);
      }
    }
  };
}
