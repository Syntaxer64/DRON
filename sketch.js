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
let backgroundImage1; //zmienna, w której znajduje się tło 1
let backgroundTransition1; //zmienna, w której znajduje się przejście 1
let backgroundImage2; //zmienna, w której znajduje się tło 2
let backgroundTransition2; //zmienna, w której znajduje się przejście 2
let backgroundImage3; //zmienna, w której znajduje się tło 3
let backgroundTransition3; //zmienna, w której znajduje się przejście 3
let backgroundImage4; //zmienna, w której znajduje się tło 4
let koniecGry; //zmienna dla wygenerowanie okna końca gry
let endTime; //czas po zakończeniu gry
let bestTime; //zmienna z najlepszym czasem
let gap = 200; // 2*50*2 - dwukrotność wysokości drona - minimalna przerwa między przeszkodami (r=50)

function preload() {
  backgroundImage1 = loadImage("Tla_bmp//pole.bmp"); //wczytanie teł z pliku
  backgroundTransition1 = loadImage("Tla_bmp//pole-las.bmp");
  backgroundImage2 = loadImage("Tla_bmp//Las_jasny.bmp");
  backgroundTransition2 = loadImage("Tla_bmp//Las_jasny-ciemny.bmp");
  backgroundImage3 = loadImage("Tla_bmp//Las_ciemny.bmp");
  backgroundTransition3 = loadImage("Tla_bmp//Las_ciemny-miasto.bmp");
  backgroundImage4 = loadImage("Tla_bmp//Miasto.bmp");
}

function setup() {
  createCanvas(1180, 710); //płótno
  dron = new Dron();
  spawnCounterTop = 0; //wyzerowanie licznika górnego
  spawnThresholdTop = random(minInterval, maxInterval); //wylosowanie progu górnego
  spawnCounterBottom = 0; //wygenerowanie licznika dolnego
  spawnThresholdBottom = random(minInterval, maxInterval); //wylosowanie progu dolnego
  tlo = new Tlo(
    [
      backgroundImage1,
      backgroundTransition1,
      backgroundImage2,
      backgroundTransition2,
      backgroundImage3,
      backgroundTransition3,
      backgroundImage4,
    ],
    startTime
  ); //stworzenie nowego tła z listą wszystkich teł oraz czasem startu
  let cookieTime = getCookie("bestTime"); //wczytanie ciasteczka z najlepszym czasem
  if (cookieTime !== "") { //jeżeli ciasteczko nie jest puste
    bestTime = parseInt(cookieTime); //wczytaj ciasteczko do zmiennej bestTime
  } else {
    bestTime = Infinity; //w innym wypadku bestTime będzie tymczasowo nieskończonością
  }
}

function draw() {
  tlo.draw(); //narysowanie tła
  dron.draw(); //narysowanie drona
  if (gameStart) { //jeżeli gra się rozpoczeła
    tlo.update(); //aktualizuj tło
    dron.update(); //aktualizuj dron
    collision(); //funkcja od kolizji

    spawnCounterTop++;
    spawnCounterBottom++; //zwiększenie liczników o 1
    if (spawnCounterTop >= spawnThresholdTop) {
      //jeżeli licznik dojdzie do progu
      //let obstacleheight = random(height / 3.5, height / 2 - gap / 4); //wysokość przeszkody [wys. minimalna, wys. maksymalna]. Wys maksymalna przeszkody uwzględnia ostateczną potrzebną przestrzeń do przelotu dronem między górną a dolną przeszkodą
      topObstacles.push(new Przeszkoda(width, 100, true, startTime)); //stworzenie przeszkody o x równym szerokości płótna, wysokości 100 (dla chmur taka sama) i warunku, mówiącym, że przeszkoda znajduje się na górze
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
      bottomObstacles.push(
        new Przeszkoda(width, obstacleheight, false, startTime)
      ); //stworzenie przeszkody o x równym szerokości płótna, wysokości ustalonej wyżej i warunku, mówiącym, że przeszkoda znajduje się na dole
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
      updateBestTime(); //zaktualizuj najlepszy czas
      koniecGry = new KoniecGry(endTime, bestTime); //stwórz okno końca gry z czasem rozbicia i najlepszym czasem
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
    tlo = new Tlo(
      [
        backgroundImage1,
        backgroundTransition1,
        backgroundImage2,
        backgroundTransition2,
        backgroundImage3,
        backgroundTransition3,
        backgroundImage4,
      ],
      startTime
    ); //zresetuj tło
    dron = new Dron(); //stwórz nowy obiekt dron
    crash = false; //ustaw stan rozbicia się drona na false
    gameStart = false; //ustaw stan rozpoczęcia gry na false
    loop(); // Zrestartuj funkcję draw()
  } else {
    if (!gameStart) {
      //jeżeli gra się jeszcze nie rozpoczęła
      gameStart = true; //ustaw zmienną gameStart na true
      startTime = millis(); //ustaw czas startowy
      tlo = new Tlo(
        [
          backgroundImage1,
          backgroundTransition1,
          backgroundImage2,
          backgroundTransition2,
          backgroundImage3,
          backgroundTransition3,
          backgroundImage4,
        ],
        startTime
      ); //zresetuj ponownie tło, z nowym czasem rozpoczęcia gry
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

function updateBestTime() {
  //funkcja zmieniająca najlepszy czas
  if (endTime - startTime > bestTime) {
    // jeżeli czas jaki do czasu rozbicia minus czas od startu gry jest większy od najlepszego czasu
    bestTime = endTime - startTime; //ustaw najlepszy czas jako powyższą różnicę
    setCookie("bestTime", bestTime, 365); //stwórz nowe ciasteczko przechowujące ten najlepszy czas
  }
}

function setCookie(name, value, days) {
  //funkcja tworząca nowe ciasteczko
  let expires = ""; //zmienna z datą ważności ciasteczka
  if (days) {
    //jeżeli days jest poprawną wartością
    let date = new Date(); //stwórz nowy obiekt Date
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); //ustaw datę na datę dzisiejszą plus 365 dni (w milisekundach)
    expires = "; expires=" + date.toUTCString(); //string, w którym znajduje się data ważności ciasteczka
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"; // stworzenie ciesteczka z jego nazwą, wartością oraz datą ważności
}

function getCookie(name) {
  //funkcja szukające istniejące ciasteczko
  let searchName = name + "="; //nazwa, po której ciasteczko będzie wyszukiwane
  let cookieList = document.cookie.split(";"); //lista wszystkich ciasteczek rozdzielona średnikami
  for (let i = 0; i < cookieList.length; i++) {
    //dla każdego ciastka w liście
    let cookieName = cookieList[i]; //sprawdź nazwę ciasteczka
    while (cookieName.charAt(0) == " ") {
      //jeżeli pierwszy znak to spacja
      cookieName = cookieName.substring(1, cookieName.length); //usuń spację przed nazwą
    }
    if (cookieName.indexOf(searchName) == 0) {
      //jeżeli nazwa szukanego ciasteczka zaczyna się w indeksie 0 nazwy sprawdzanego ciasteczka
      return cookieName.substring(searchName.length, cookieName.length); //zwróć nazwę ciasteczka bez jego nazwy
    }
  }
  return ""; //jeżeli ciasteczko nie zostało znalezione, zwróć pusty string
}
