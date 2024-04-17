class Przeszkoda {
  constructor(obs_x, obs_height, isTop) {
    this.obs_width = 150;
    this.obs_x = obs_x;
    this.vel = createVector(-4, 0);
    this.obs_height = obs_height;
    this.open_height = 260;
    this.isTop = isTop;
  }

  update = function () {
    this.obs_x += this.vel.x;
  };

  draw = function () {
    stroke(0, 0);
    fill(113, 215, 217);
    if (this.isTop) {
      rect(this.obs_x, 0, this.obs_width, this.obs_height);
    } else {
      rect(
        this.obs_x,
        height - this.obs_height,
        this.obs_width,
        this.obs_height
      );
    }
  };

  offscreen = function () {
    return this.obs_x < -this.obs_width;
  };
}
