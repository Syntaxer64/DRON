class Przeszkoda {
  constructor(obs_x, obs_height, isTop) {
    this.top_obs_width = 200; //szerokość górnej przeszkody (kolizji)
    this.bottom_obs_width = 48.5; //szerokość dolnej przeszkody (kolizji)
    this.bottom_obs_x = obs_x + 92.5; //wspołrzędna lewego górnego wierzchołka dolnej przeszkody (kolizji)
    this.top_obs_x = obs_x + 10; //wspołrzędna lewego górnego wierzchołka górnej przeszkody (kolizji)
    this.tree_x = width; //wspołrzędna lewego górnego wierzchołka drzewa
    this.cloud_x = width; //wspołrzędna lewego górnego wierzchołka chmury
    this.vel = createVector(-7, 0); //prędkość przeszkody
    this.obs_height = obs_height; //wysokość przeszkody
    this.isTop = isTop; //sprawdza, czy przeszkoda powinna znajdować się na górze
    this.tree_height = 500; //wysokość drzwa
    this.tree_width = 248; //szerokość drzewa
    this.tree_safeZone = 75; //bezpieczne pole na górze drzewa, przez które dron może przelecieć
    this.bambus = loadImage("Drzewa//BambusNaturalny.png"); //plik z obrazem drzewa
    this.bambusAlt = loadImage("Drzewa//BambusWeraZDodatkami.png"); //plik z obrazem drzewa z ptakami
    this.useAlt = random(1) < 0.05; //szansa na wygenerowanie drzewa z ptakami
    this.clouds = []; //lista wszystkich chmur
    this.cloud_sizes = [ //rozmiary wszystkich chmur (na razie tylko kilka)
      {
        width: 244, //szerokość obrazu chmury
        height: 132, //wysokość obrazu chmury
        thunder_width: 0, //szerokość pioruna (0, gdy nie ma)
        thunder_height: 0, //wysokość pioruna (0, gdy nie ma)
        left_zone: 0, //szerokość od lewej strony chmury do lewej strony pioruna (0, gdy nie ma)
      },
      {
        width: 221,
        height: 106,
        thunder_width: 0,
        thunder_height: 0,
        left_zone: 0,
      },
      {
        width: 247,
        height: 224,
        thunder_width: 28,
        thunder_height: 209,
        left_zone: 104,
      },
      {
        width: 247,
        height: 267,
        thunder_width: 50,
        thunder_height: 248,
        left_zone: 65,
      },
    ];
    for (let i = 0; i < 4; i++) { //wczytanie chmur z plików do listy
      let cloud = loadImage("grafika_chmurki//test//" + i + ".png");
      this.clouds.push(cloud);
    }
    this.cloud_index = floor(random(this.clouds.length)); //wylosowanie indeksu chmury
    this.cloud_width = this.cloud_sizes[this.cloud_index].width; //szerokość wylosowanej chmury
    this.cloud_height = this.cloud_sizes[this.cloud_index].height; //wysokość wylosowanej chmury
    this.thunder_width = this.cloud_sizes[this.cloud_index].thunder_width; //szerokość pioruna wylosowanej chmury
    this.thunder_height = this.cloud_sizes[this.cloud_index].thunder_height; //wysokość pioruna wylosowanej chmury
    this.thunder_left = this.cloud_sizes[this.cloud_index].left_zone; //szerokość pola między lewym bokiem wylosowanej chmury a lewym bokiem pioruna
  }

  update = function () {
    this.bottom_obs_x += this.vel.x; //dodanie prędkości do pozycji dolnej przeszkody (kolizji)
    this.top_obs_x += this.vel.x; //dodanie prędkości do pozycji górnej przeszkody (kolizji)
    this.tree_x += this.vel.x; //dodanie prędkości do pozycji obrazu drzewa
    this.cloud_x += this.vel.x; //dodanie prędkości do pozycji obrazu chmury
  };

  draw = function () {
    //rysowanie przeszkody
    stroke(0, 0);
    fill(113, 215, 217);
    if (this.isTop) {
      //jeżeli isTop jest true, to przeszkoda jest na górze
      image( //rysowanie chmury
        this.clouds[this.cloud_index],
        this.cloud_x,
        0,
        this.cloud_width,
        this.cloud_height
      );
    } else {
      //jeżeli nie, to na dole
      if (this.useAlt) { //rysowanie drzewa z ptakami, gdy szansa się trafi
        image(
          this.bambusAlt,
          this.tree_x,
          height - this.obs_height - this.tree_safeZone,
          this.tree_width,
          this.tree_height
        );
      } else { //w przeciwnym wypadku, rysowanie zwykłego drzewa
        image(
          this.bambus,
          this.tree_x,
          height - this.obs_height - this.tree_safeZone,
          this.tree_width,
          this.tree_height
        );
      }
    }
  };

  tree_offscreen = function () {
    //funkcja sprawdzająca, czy drzewo wyszło poza ekran
    return this.bottom_obs_x < -this.tree_width;
  };
  cloud_offscreen = function () {
    //funkcja sprawdzająca, czy chmura wyszła poza ekran
    return this.top_obs_x < -this.cloud_width;
  };
}
