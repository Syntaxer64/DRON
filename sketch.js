let topObstacles = []; //lista przeszkód na górze
let bottomObstacles = []; //lista przeszkód na dole
let minInterval = 30; //minimalny interwał generowanie się przeszkód
let maxInterval = 100; //maksymalny interwał generowania się przeszkód
let spawnCounterTop; //licznik czasowy do wygenerowania przeszkody na górze
let spawnThresholdTop; //próg czasowy do wygenerowania przeszkody na górze
let spawnCounterBottom; //to samo, ale na dole
let spawnThresholdBottom; //to samo, ale na dole
let dron; //zmienna dla wygenerowania drona
let crash = false; //zmienna sprawdzająca, czy dron się rozbił
let startTime; //czas rozpoczęcia gry
let gameStart = false; //zmienna sprawdzająca, czy gra się rozpoczęła
let tlo; //zmienna dla wygenerowania tła
let backgroundImage; //zmienna, w której znajduje się tło
let koniecGry; //zmienna dla wygenerowanie okna końca gry
let endTime; //czas po zakończeniu gry
let gap = 200; // 2*50*2 - dwukrotność wysokości drona - minimalna przerwa między przeszkodami (r=50)

function preload() {
  backgroundImage = loadImage("Tla_bmp//las_ciemny.bmp"); //wczytanie tła z pliku
}

function setup() {
  createCanvas(1180, 710); //płótno
  dron = new Dron();
  spawnCounterTop = 0; //wyzerowanie licznika górnego
  spawnThresholdTop = random(minInterval, maxInterval); //wylosowanie progu górnego
  spawnCounterBottom = 0; //wygenerowanie licznika dolnego
  spawnThresholdBottom = random(minInterval, maxInterval); //wylosowanie progu dolnego
  tlo = new Tlo(backgroundImage);
}

function draw() {
  tlo.update();
  tlo.draw(); //narysowanie tła
  dron.draw(); //narysowanie drona
  if (gameStart) {
    dron.update();
    collision(); //funkcja od kolizji

    spawnCounterTop++;
    spawnCounterBottom++; //zwiększenie licznikó o 1
    if (spawnCounterTop >= spawnThresholdTop) {
      //jeżeli licznik dojdzie do progu
      //let obstacleheight = random(height / 3.5, height / 2 - gap / 4); //wysokość przeszkody [wys. minimalna, wys. maksymalna]. Wys maksymalna przeszkody uwzględnia ostateczną potrzebną przestrzeń do przelotu dronem między górną a dolną przeszkodą
      topObstacles.push(new Przeszkoda(width, 100, true)); //stworzenie przeszkody o x równym szerokości płótna, wysokości 100 (dla chmur taka sama) i warunku, mówiącym, że przeszkoda znajduje się na górze
      spawnCounterTop = 0; //wyzerowanie licznika
      spawnThresholdTop = random(minInterval, maxInterval); //wylosowanie nowego progu
    }
    for (let i = topObstacles.length - 1; i >= 0; i--) {
      //dla każdego obiektu w liście topObstacles (w kolejności malejącej)
      topObstacles[i].update();
      topObstacles[i].draw(); //narysuj przeszkodę
      if (topObstacles[i].cloud_offscreen()) {
        //jeżeli przeszkoda wyjdzie poza ekran
        topObstacles.splice(i, 1); //usuń 1 element (przeszkodę) z indeksu i
      }
    }

    if (spawnCounterBottom >= spawnThresholdBottom) {
      //jeżeli licznik dojdzie do progu
      let obstacleheight = random(height / 3.5, height / 2 - gap / 4); //wysokość przeszkody [wys. minimalna, wys. maksymalna]. Wys maksymalna przeszkody uwzględnia ostateczną potrzebną przestrzeń do przelotu dronem między górną a dolną przeszkodą
      bottomObstacles.push(new Przeszkoda(width, obstacleheight, false)); //stworzenie przeszkody o x równym szerokości płótna, wysokości ustalonej wyżej i warunku, mówiącym, że przeszkoda znajduje się na dole
      spawnCounterBottom = 0; //wyzerowanie licznika
      spawnThresholdBottom = random(minInterval, maxInterval); //wylosowanie nowego progu
    }
    for (let i = bottomObstacles.length - 1; i >= 0; i--) {
      //dla każdego obiektu w liście topObstacles (w kolejności malejącej)
      bottomObstacles[i].update();
      bottomObstacles[i].draw(); //narysuj przeszkodę
      if (bottomObstacles[i].tree_offscreen()) {
        //jeżeli przeszkoda wyjdzie poza ekran
        bottomObstacles.splice(i, 1); //usuń 1 element (przeszkodę) z indeksu i
      }
    }
    drawTimer(); //narysowanie licznika czasu
    if (crash) {
      noLoop(); //jeżeli dron się rozbije, przerwij grę
      dron.startSound.pause(); //przerwij muzykę
      endTime = millis(); //sprawdź czas podczas rozbicia
      koniecGry = new KoniecGry(endTime); //stwórz okno końca gry z czasem rozbicia
      koniecGry.draw(); //narysuj okno końca gry
    }
  }
}

function keyPressed() {
  //funkcja sprawdzająca, czy przycisk został naciśnięty
  if (crash) {
    //jeżeli dron się rozbił
    topObstacles = []; //wyczyść listę górnych przeszkód
    bottomObstacles = []; //wyczyść listę dolnych przeszkód
    spawnCounterTop = 0; //wyzeruj liczniki
    spawnThresholdTop = random(minInterval, maxInterval); //stwórz nowe progi
    spawnCounterBottom = 0; //wyzeruj liczniki
    spawnThresholdBottom = random(minInterval, maxInterval); //stwórz nowe progi
    dron = new Dron(); //stwórz nowy obiekt dron
    crash = false; //ustaw stan rozbicia się drona na false
    gameStart = false; //ustaw stan rozpoczęcia gry na false
    loop(); // Zrestartuj funkcję draw()
  } else {
    if (!gameStart) {
      //jeżeli gra się jeszcze nie rozpoczęła
      gameStart = true; //ustaw zmienną gameStart na true
      startTime = millis(); //ustaw czas startowy
    }
    dron.fly(); //funkcja lotu drona
  }
}

function keyReleased() {
  //funkcja sprawdzająca, czy przycisk został puszczony
  dron.fall(); //funkcja spadku drona
}

function collision() {
  //funkcja sprawdzająca kolizję
  if (
    dron.droneCollision(topObstacles, bottomObstacles) ||
    dron.collideWithGround()
  ) {
    //jeżeli dron koliduję z jakąkolwiek przeszkodą z obu list lub z ziemią
    crash = true; //dron się rozbił
  }
}

function drawTimer() {
  //funkcja rysująca licznik czasu
  let timeElapsed = millis() - startTime; //czas, jaki minął od startu gry
  let minutes = Math.floor(timeElapsed / (1000 * 60)); //ile minut minęło od startu
  let seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000); //ile sekund minęło od startu
  let milliseconds = nf(timeElapsed % 1000, 3).slice(0, 3); // Pokazuje tylko pierwsze trzy cyfry milisekund

  fill(255); //kolor tekstu (biały)
  textSize(24); //rozmiar tekstu
  textAlign(RIGHT, TOP); //wyrównanie tekstu do prawej i do góry
  text(
    //wygenerowanie tekstu w postaci mm:ss.ms
    "Czas: " +
      nf(minutes, 2) +
      ":" +
      nf(seconds, 2) +
      "." +
      nf(milliseconds, 3),
    width - 10, //współrzędna x tekstu
    10 //współrzędna y
  );
}
