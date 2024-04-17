class Przeszkoda {
  constructor(obs_x, obs_height, isTop) {
    this.obs_width = 150; //szerokość przeszkody
    this.obs_x = obs_x; //wspołrzędna lewego górnego wierzchołka przeszkody
    this.vel = createVector(-4, 0); //prędkość przeszkody
    this.obs_height = obs_height; //wysokość przeszkody
    this.isTop = isTop; //sprawdza, czy przeszkoda powinna znajdować się na górze
  }

  update = function () {
    this.obs_x += this.vel.x; //dodanie prędkości do pozycji przeszkody
  };

  draw = function () { //rysowanie przeszkody
    stroke(0, 0);
    fill(113, 215, 217);
    if (this.isTop) { //jeżeli isTop jest true, to przeszkoda jest na górze
      rect(this.obs_x, 0, this.obs_width, this.obs_height);
    } else { //jeżeli nie, to na dole
      rect(
        this.obs_x,
        height - this.obs_height,
        this.obs_width,
        this.obs_height
      );
    }
  };

  offscreen = function () { //funkcja sprawdzająca, czy przeszkoda wyszła poza ekran
    return this.obs_x < -this.obs_width;
  };
}
