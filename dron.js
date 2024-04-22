class Dron {
  r = 50; //promień okręgu (drona)
  pos = createVector(width / 2, height / 2); //pozycja drona na płótnie (canvas)
  vel = createVector(0, 0.5); //prędkość grawitacji drona
  acc = createVector(0, 0.15); //przyspieszenie grawitacyjne drona
  opor = createVector(0, 1.5); //opór drona
  drone_size = 50; //wielkość drona
  flyKeyPressed=false; //sprawdza, czy przycisk jest naciśnięty (default=fałsz)
  
  update = function () {
    this.pos.add(this.vel); //dodanie prędkości do pozycji
    this.vel.add(this.acc); //dodanie przyspieszenia do pozycji
    if (this.pos.y > height - this.r / 2) { //warunek, który sprawdza czy dron dotyka podłogę
      noLoop(); //jeżeli dotyka, zakończ grę
    }
    if (this.pos.y - this.r/2 < 0) { //warunek sprawdzający czy dron dotyka sufitu
      this.vel.y = 0;
      this.acc.y = 0;
      this.pos.y = this.r / 2; //jeżeli tak, wyzeruj prędkość, przyspieszenie i zachowaj pozycję drona
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

  droneCollision(topObstacles, bottomObstacles) { //funkcja sprawdzająca kolizję drona z przeszkodami
    let droneLeft = this.pos.x - this.drone_size / 2;
    let droneRight = this.pos.x + this.drone_size / 2;
    let droneTop = this.pos.y - this.drone_size / 2;
    let droneBottom = this.pos.y + this.drone_size / 2; //zmienne sprawdzające granicę lewą, prawą, górną i dolną drona

    for (let i = 0; i < topObstacles.length; i++) { //dla każdej przeszkody z listy topObstacles
      let obstacle = topObstacles[i]; //zmienna, w której znajduje się analizowana przeszkoda
      if (this.obstacleCollision(obstacle, droneLeft, droneRight, droneTop, droneBottom)) { //jeżeli dron koliduje z przeszkodą (funkcja opisana niżej)
        return true; //zwróć true
      }
    }
    for (let i = 0; i < bottomObstacles.length; i++) { //dla każdej przeszkody z listy bottomObstacles
      let obstacle = bottomObstacles[i]; //zmienna, w której znajduje się analizowana przeszkoda
      if (this.obstacleCollision(obstacle, droneLeft, droneRight, droneTop, droneBottom)) { //jeżeli dron koliduje z przeszkodą (funkcja opisana niżej)
        return true; //zwróć true
      }
    }
    return false; //jeżeli żaden warunek nie został spełniony, zwróć false
  }

  obstacleCollision(obstacle, droneLeft, droneRight, droneTop, droneBottom) { //funkcja sprawdzająca czy przeszkoda skolidowała z dronem
    let obstacleLeft = obstacle.obs_x; //granica lewa przeszkody
    let obstacleRight = obstacle.obs_x + obstacle.obs_width; //granica prawa przeszkody
    let obstacleTop = obstacle.isTop ? 0 : height - obstacle.obs_height; //granica górna (jeżeli isTop = true, to 0, a jeżeli nie to height-obstacle.obs_height
    let obstacleBottom = obstacle.isTop ? obstacle.obs_height : height; //granica dolna (jeżeli isTop = true, to obstacle.obs_height, a jeżeli nie to height
      
    if (
      droneRight > obstacleLeft && //jeżeli prawa granica drona jest po prawej od lewej granicy przeszkody
      droneLeft < obstacleRight && //lewa granica drona na lewo od prawej granicy przeszkody
      droneBottom > obstacleTop && //dolna granica drona niżej niż górna granica przeszkody
      droneTop < obstacleBottom //górna granica drona wyżej niż dolna granica przeszkody
    ) {
      return true; //dron się rozbił i zwróć true
    }
    return false; //dron dalej leci i zwróć false
  }
};
