class Tlo {
  constructor(image) {
    this.image = image; //zmienna ze ścieżką do pliku tła
    this.speed = 2; //prędkość przewijania się tła
    this.x = 0; //początkowa pozycja lewego boku tła
  }

  update() {
    this.x -= this.speed; //z każdą klatką zmień pozycję tła w lewo o zadaną prędkość
    if (this.x <= -width) {
      //jeżeli tło wyjdzie w całości poza ekran
      this.x = 0; //ustaw pozycję lewego boku tła znowu na 0
    }
  }

  draw() {
    image(this.image, this.x, 0, width, height);
    image(this.image, this.x + width, 0, width, height); //wygenerowanie dwóch powtarzających się po sobie obrazów jako tło gry
  }
}
