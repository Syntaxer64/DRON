class KoniecGry {
  constructor(endTime) {
    this.endTime = endTime; //zmienna z czasem rozbicia się
  }

  draw() {
    fill(0, 150);
    rect(0, 0, width, height); //przyciemnij grę znajdującą się za oknem końca gry

    fill(255);
    rect(width / 4, height / 4, width / 2, height / 2); //narysuj okno końca gry

    let timeElapsed = this.endTime - startTime; //czas, jaki minął od startu gry
    let minutes = Math.floor(timeElapsed / (1000 * 60)); //ile minut minęło od startu
    let seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000); //ile sekund minęło od startu
    let milliseconds = nf(timeElapsed % 1000, 3).slice(0, 3); // Pokazuje tylko pierwsze trzy cyfry milisekund

    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("ROZBIŁEŚ SIĘ :(", width / 2, height / 2 - 80);
    text(
      "Twój czas: " +
        nf(minutes, 2) +
        ":" +
        nf(seconds, 2) +
        "." +
        nf(milliseconds, 3),
      width / 2,
      height / 2 + 20
    ); //tekst z czasem końcowym

    textSize(16);
    text(
      "Naciśnij przycisk, by spróbować ponownie.",
      width / 2,
      (height * 2) / 3
    ); //informacja o restarcie gry
  }
}
