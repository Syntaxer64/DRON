class Tlo {
  constructor(images, startTime) {
    this.images = images; //zmienna ze ścieżką do pliku tła
    this.speed = 2.5; //prędkość przewijania się tła
    this.x = 0; //początkowa pozycja lewego boku pierwszego tła
    this.x2 = width; //początkowa pozycja lewego boku drugiego tła
    this.currentBackground=0; //indeks bieżącego tła
    this.startTime=startTime; //zmienna z czasem rozpoczęcia gry
    this.backgroundChangeTime=0.5; //po jakim czasie tło powinno się zacząć zmieniać
  }

  update() {
    if (this.x <= -width) {
      //jeżeli pierwsze tło wyjdzie w całości poza ekran
      this.x = width; //ustaw pozycję lewego boku pierwszego tła na x szerokości gry
      if (this.currentBackground<6) { //jeżeli indeks tła jest mniejszy niż 6
        this.changeBackground(); //spróbuj zmienić tło
      }
    }
    if (this.x2 <= -width) { //jeżeli drugie tło wyjdzie w całości poza ekran
      this.x2 = width; //ustaw pozycję lewego boku drugiego tła na x szerokości gry
    }
    this.x -= this.speed; //z każdą klatką zmień pozycję pierwszego tła w lewo o zadaną prędkość
    this.x2 -= this.speed; //z każdą klatką zmień pozycję drugiego tła w lewo o zadaną prędkość
  }

  draw() {
    if (this.currentBackground==1 || this.currentBackground==3 || this.currentBackground==5) { //jeżeli indeks tła = 1, 3 lub 5 (tła przejściowe)
      image(this.images[this.currentBackground], this.x, 0, width, height); //rysuj tło z tym indeksem
      if (this.x2 < 0) { //jeżeli lewy bok drugiego tła dotknie lewgo boku ekranu gry
        image(this.images[this.currentBackground-1], this.x2, 0, width, height); //kontynuuj rysowanie tego (poprzedniego) tła
      }
      else { //jeżeli nie
        image(this.images[this.currentBackground+1], this.x2, 0, width, height); //zacznij rysować następne tło
        if (this.x2==0) { //jeżeli lewy bok drugiego tła dotknie lewgo boku ekranu gry
          this.currentBackground++; //zwiększ indeks tła o 1
        }
      }
    }
    else { //jeżeli to pozostałe indeksy
      image(this.images[this.currentBackground], this.x, 0, width, height);
      image(this.images[this.currentBackground], this.x2, 0, width, height); //wygenerowanie dwóch powtarzających się po sobie obrazów jako tło gry
    }
  }

  changeBackground = function () { //funkcja odpowiadająca za zmianę tła
    let timeElapsed = millis() - this.startTime; //oblicz minięty czas gry
    let minutes = timeElapsed / (1000 * 60); //przelicz na minuty
    if (minutes >= this.backgroundChangeTime) { //jeżeli obliczony czas jest większy lub równy ustanowionego czasowi zmiany tłą
      this.currentBackground++; //zwiększ indeks tła o 1
      this.startTime=millis(); //zrestartuj liczenie czasu gry
    }
  }
}
