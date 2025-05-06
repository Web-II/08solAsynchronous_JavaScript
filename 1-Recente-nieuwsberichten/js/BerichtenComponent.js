import BerichtenRepository from './BerichtenRepository.js';

export default class BerichtenComponent {
  #berichtRepository;
  #url;
  constructor() {
    this.#url =
      'https://data.stad.gent/api/explore/v2.1/catalog/datasets/recente-nieuwsberichten-van-stadgent/records?limit=5'; //of './js/data/example.json';
    this.#berichtRepository = new BerichtenRepository();
    this.#getData();
  }
  #getData() {
    fetch(this.#url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonResponse) => {
        // Data uit de array jsonResponse.results gebruiken om de repository op te vullen.
        jsonResponse.results.forEach((record) =>
          this.#berichtRepository.addBericht(
            record.publicatiedatum,
            record.titel,
            record.nieuwsbericht
          )
        );
        this.#berichtenToHTML(this.#berichtRepository.berichten);
      })
      .catch((error) => alert(error));
  }
  #berichtenToHTML(berichten) {
    berichten.forEach((bericht) => {
      document
        .getElementById('nieuwsberichten')
        .insertAdjacentHTML('beforeend', bericht.toHTMLString());
    });
  }
}
