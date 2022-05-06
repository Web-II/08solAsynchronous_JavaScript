import { TriviaGame } from './triviaGame.js';

class TriviaComponent {
  #triviaGame;

  constructor() {
    this.#triviaGame = new TriviaGame();
    this.initialiseHTML();
  }

  async initialiseHTML() {
    await this.getData();
    // Volgende vraag (eerste vraag afbeelden)
    this.showTrivia();
  }
  async getData() {
    try {
      // fetch('./data/exampleResponseApi.json')
      const response = await fetch('https://opentdb.com/api.php?amount=10');
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const resultJSON = await response.json();
      this.#triviaGame.addTrivias(resultJSON.results);
    } catch (error) {
      document.getElementById(
        'answer'
      ).innerText = `Something went wrong retrieving the quiz data: ${error}`;
    }
  }

  showTrivia() {
    const triviaHTML = document.getElementById('trivia');
    triviaHTML.innerHTML = '';

    // de volgende vraag
    const trivia = this.#triviaGame.trivia;

    // #question opvullen:
    // geeft het aantal reeds gestelde vragen
    // op het totaal aantal vragen weer.
    document.getElementById('question').innerText = `Question: ${
      this.#triviaGame.numberOfAnswers + 1
    }/${this.#triviaGame.numberOfTrivias}`;

    // div met de vraag aanmaken en opvullen (sectie met blauwe tekst)
    triviaHTML.insertAdjacentHTML(
      'beforeend',
      `<div class="card-content">
				<span>${trivia.category} - Difficulty: ${trivia.difficulty}</span><br>
				<span>${trivia.question}</span>
			</div>`
    );

    // Mogelijke antwoorden afbeelden
    const divCA = document.createElement('div');
    divCA.className = 'card-action';
    const divRow = document.createElement('div');
    divRow.className = 'row';
    trivia.answers.forEach((a) => {
      divRow.insertAdjacentHTML(
        'beforeend',
        `<div class="col s12 m6">
					<p>
						<label>
							<input class="with-gap" name="group" value="${a}" type="radio" />
							<span>${a}</span>
						</label>
					</p>
				</div>
				`
      );
    });
    divCA.appendChild(divRow);
    triviaHTML.appendChild(divCA);

    // sectie met knop SUBMIT ANSWER en NEXT QUESTION
    triviaHTML.insertAdjacentHTML(
      'beforeend',
      `<div class="card-action">
					<button id="send" class="btn-small blue darken-2">Submit answer<i class="material-icons right">send</i></button>
          <button id="next" class="btn-small blue darken-2">Next Question</button>
				</div>`
    );

    // send-knop weergeven
    document.getElementById('send').classList.remove('hide');
    document.getElementById('next').classList.add('hide');

    // antwoorden inschakelen
    for (const radio of document.querySelectorAll('input[name="group"]')) {
      radio.disabled = false;
    }

    // eventhandlers instellen
    document.getElementById('send').onclick = () =>
      this.sendClickHandler(trivia);
    document.getElementById('next').onclick = () => this.nextClickHander();
  }

  sendClickHandler(trivia) {
    // als er geen enkele radio button checked is moet er niets gebeuren
    if (!document.querySelector('input[name="group"]:checked')) return;

    // antwoorden uitschakelen
    for (const radio of document.querySelectorAll('input[name="group"]')) {
      radio.disabled = true;
    }

    // controleren of het antwoord correct was
    this.#triviaGame.checkAnswer(
      document.querySelector('input[name="group"]:checked').value
    );

    // aantal correcte antwoorden op het totaal aantal antwoorden
    document.getElementById('correct').innerText = `Correct answers: ${
      this.#triviaGame.correctAnswers
    }/${this.#triviaGame.numberOfAnswers}`;

    // tonen van het correcte antwoord
    document.getElementById(
      'answer'
    ).innerHTML = `The correct answer is: <span class="bold">${trivia.correctAnswer}</span>`;

    // next-knop weergeven
    document.getElementById('send').classList.add('hide');
    document.getElementById('next').classList.remove('hide');

    // als het spel beëindigd is
    if (this.#triviaGame.checkEndGame()) {
      // next-knop uitschakelen
      document.getElementById('next').classList.add('disabled');
    }
  }
  nextClickHander() {
    // antwoord wissen
    document.getElementById('answer').innerHTML = '';
    // volgende vraag afbeelden
    this.showTrivia();
  }
}

window.onload = () => new TriviaComponent();
