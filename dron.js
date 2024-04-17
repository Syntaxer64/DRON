class Dron {
    r = 10; //promień okręgu (drona)
    pos = createVector(width / 2, height / 2); //pozycja drona na płótnie (canvas)
    vel = createVector(0, 0.5); //prędkość grawitacji drona
    acc = createVector(0, 0.15); //przyspieszenie grawitacyjne drona
    opor = createVector(0, 1.5); //opór drona
    drone_size = 100; //wielkość drona
    flyKeyPressed=false; //sprawdza, czy przycisk jest naciśnięty (default=fałsz)
  
    update = function () {
      this.pos.add(this.vel); //dodanie prędkości do pozycji
      this.vel.add(this.acc); //dodanie przyspieszenia do pozycji
      if (this.pos.y > height - this.r / 2) { //warunek, który sprawdza czy dron nie dotyka podłogi
        this.vel.y = 0;
        this.acc.y = 0;
        this.pos.y = height - this.r / 2;
      }
      this.acc.add(this.opor); //dodanie oporu do przyspieszenia
      if (this.acc.y > 0.5) this.acc.y = 0.3; //nadanie limitu przyspieszeniu
      this.vel.limit(8); //nadanie limitu prędkości

      if (this.flyKeyPressed) { //jeżeli flyKeyPressed jest true, to dodaj przyspieszenie ujemne do drona
        var fly_acc = createVector(0, -0.5);
        this.acc.add(fly_acc);
    };
};
  
    draw = function () { //rysowanie drona
      stroke(0, 0);
      fill(113, 215, 217);
      ellipse(this.pos.x, this.pos.y, this.r);
    };
  
    fly = function () { //funkcja sprawdzająca, czy dron ma lecieć do góry
      this.flyKeyPressed=true;
    };

    fall = function () { //funkcja sprawdzająca, czy dron ma spadać
        this.flyKeyPressed=false;
    }
  };
