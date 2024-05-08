class KoniecGry {
  constructor(endTime, bestTime) {
    this.endTime = endTime; //zmienna z czasem rozbicia się
    this.bestTime = bestTime; //zmienna z najlepszym czasem
  }

  draw() {
    fill(0, 150);
    rect(0, 0, width, height); //przyciemnij grę znajdującą się za oknem końca gry

    fill(255);
    rect(width / 4, height / 4, width / 2, height / 2); //narysuj okno końca gry

    let timeElapsed = this.endTime - startTime; //czas, jaki minął od startu gry

    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("ROZBIŁEŚ SIĘ :(", width / 2, height / 2 - 80);
    text(
      "Twój czas: " + this.formatTime(timeElapsed),
      width / 2,
      height / 2 + 20
    ); //tekst z czasem końcowym
    text(
      "Najlepszy czas: " + this.formatTime(this.bestTime),
      width / 2,
      height / 2 + 60
    ); //tekst z najlepszym czasem

    textSize(16);
    text(
      "Naciśnij przycisk, by spróbować ponownie.",
      width / 2,
      (height * 2) / 3
    ); //informacja o restarcie gry
  }

  formatTime = function (time) { //funkcja formatująca czas
    let minutes = Math.floor(time / (1000 * 60)); //ile minut minęło od startu
    let seconds = Math.floor((time % (1000 * 60)) / 1000); //ile sekund minęło od startu
    let milliseconds = nf(time % 1000, 3).slice(0, 3); // Pokazuje tylko pierwsze trzy cyfry milisekund
    return nf(minutes, 2) + ":" + nf(seconds, 2) + "." + nf(milliseconds, 3); //zwróć string w wybranym formacie
  };
}
