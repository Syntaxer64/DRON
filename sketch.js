let topObstacles = []; //lista przeszkód na górze
let bottomObstacles = []; //lista przeszkód na dole
let minInterval = 50; //minimalny interwał generowanie się przeszkód
let maxInterval = 200; //maksymalny interwał generowania się przeszkód
let spawnCounterTop; //licznik czasowy do wygenerowania przeszkody na górze
let spawnThresholdTop; //próg czasowy do wygenerowania przeszkody na górze
let spawnCounterBottom; //to samo, ale na dole
let spawnThresholdBottom; //to samo, ale na dole
let dron; //zmienna dla wygenerowania drona

function setup() {
  createCanvas(1000, 600); //płótno
  dron = new Dron();
  spawnCounterTop = 0; //wyzerowanie licznika górnego
  spawnThresholdTop = random(minInterval, maxInterval); //wylosowanie progu górnego
  spawnCounterBottom = 0; //wygenerowanie licznika dolnego
  spawnThresholdBottom = random(minInterval, maxInterval); //wylosowanie progu dolnego
}

function draw() {
  background(143, 233, 255); //narysowanie tła
  dron.update();
  dron.draw(); //narysowanie drona

  spawnCounterTop++;
  spawnCounterBottom++; //zwiększenie licznikó o 1
  if (spawnCounterTop >= spawnThresholdTop) { //jeżeli licznik dojdzie do progu
    let obstacleheight = random(height / 4, height / 2); //wysokość przeszkody zawierająca się między 1/4 a 1/2 wysokości płótna
    topObstacles.push(new Przeszkoda(width, obstacleheight, true)); //stworzenie przeszkody o x równym szerokości płótna, wysokości ustalonej wyżej i warunku, mówiącym, że przeszkoda znajduje się na górze
    spawnCounterTop = 0; //wyzerowanie licznika
    spawnThresholdTop = random(minInterval, maxInterval); //wylosowanie nowego progu
  }
  for (let i = topObstacles.length - 1; i >= 0; i--) { //dla każdego obiektu w liście topObstacles (w kolejności malejącej)
    topObstacles[i].update();
    topObstacles[i].draw(); //narysuj przeszkodę
    if (topObstacles[i].offscreen()) { //jeżeli przeszkoda wyjdzie poza ekran
      topObstacles.splice(i, 1); //usuń 1 element (przeszkodę) z indeksu i
    }
  }

  if (spawnCounterBottom >= spawnThresholdBottom) { //jeżeli licznik dojdzie do progu
    let obstacleheight = random(height / 4, height / 2); //wysokość przeszkody zawierająca się między 1/4 a 1/2 wysokości płótna
    bottomObstacles.push(new Przeszkoda(width, obstacleheight, false)); //stworzenie przeszkody o x równym szerokości płótna, wysokości ustalonej wyżej i warunku, mówiącym, że przeszkoda znajduje się na dole
    spawnCounterBottom = 0; //wyzerowanie licznika
    spawnThresholdBottom = random(minInterval, maxInterval); //wylosowanie nowego progu
  }
  for (let i = bottomObstacles.length - 1; i >= 0; i--) { //dla każdego obiektu w liście topObstacles (w kolejności malejącej)
    bottomObstacles[i].update();
    bottomObstacles[i].draw(); //narysuj przeszkodę
    if (bottomObstacles[i].offscreen()) { //jeżeli przeszkoda wyjdzie poza ekran
      bottomObstacles.splice(i, 1); //usuń 1 element (przeszkodę) z indeksu i
    }
  }
}

function keyPressed() { //funkcja sprawdzająca, czy przycisk został naciśnięty
  dron.fly(); //funkcja lotu drona
}

function keyReleased() { //funkcja sprawdzająca, czy przycisk został puszczony
  dron.fall(); //funkcja spadku drona
}
