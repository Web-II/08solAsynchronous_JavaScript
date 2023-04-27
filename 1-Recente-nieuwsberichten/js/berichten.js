import Bericht from './bericht.js';

export default class Berichten {
  #url =
    'https://data.stad.gent/api/records/1.0/search/?dataset=recente-nieuwsberichten-van-stadgent&q=&rows=5';
  constructor() {
    fetch(this.#url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonResponse) => {
        // De array jsonResponse.records, omzetten naar een array van Bericht-objecten.
        const berichten = jsonResponse.records.map(
          (record) =>
            new Bericht(
              record.fields.publicatiedatum,
              record.fields.titel,
              record.fields.nieuwsbericht
            )
        );
        this.#berichtenToHTML(berichten);
      })
      .catch((error) => alert(error));
  }
  #berichtenToHTML(berichten) {
    const divNieuwsberichten = document.getElementById('nieuwsberichten');
    for (const bericht of berichten) {
      divNieuwsberichten.insertAdjacentHTML('beforeend', bericht.toHTMLString());
    }
  }
}