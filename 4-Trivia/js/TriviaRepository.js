import Trivia from './Trivia.js';

export default class TriviaRepository {
  #trivias = [];
  #answers = [];

  get trivias() {
    return this.#trivias;
  }

  get numberOfTrivias() {
    return this.#trivias.length;
  }

  get numberOfAnswers() {
    return this.#answers.length;
  }

  // geeft de volgende trivia terug (werkt op basis van
  // het aantal reeds gegeven antwoorden).
  get trivia() {
    return this.#trivias[this.numberOfAnswers];
  }

  get correctAnswers() {
    return this.#answers.reduce((result, a) => (a ? result + 1 : result), 0);
  }

  addTrivias(dataObjects) {
    this.#trivias = dataObjects.map(
      (t) =>
        new Trivia(
          t.category,
          t.difficulty,
          t.question,
          [...t.incorrect_answers, t.correct_answer],
          t.correct_answer
        )
    );
  }

  checkAnswer(answer) {
    this.#answers.push(this.trivia.isCorrectAnswer(answer));
    return this.#answers[this.numberOfAnswers - 1];
  }

  checkEndGame() {
    return this.numberOfTrivias === this.numberOfAnswers;
  }
}
