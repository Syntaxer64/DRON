class Tlo {
    constructor(image) {
      this.image = image;
      this.speed = 2;
      this.x = 0;
    }
  
    update() {
      this.x -= this.speed;
      if (this.x <= -width) {
        this.x = 0;
      }
    }
  
    draw() {
      image(this.image, this.x, 0, width, height);
      image(this.image, this.x + width, 0, width, height);
    }
  }