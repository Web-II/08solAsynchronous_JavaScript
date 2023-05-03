import CountriesRepository from './CountriesRepository.js';

export default class CountriesComponent {
  #countriesRepository;
  #url;

  constructor() {
    this.#url = 'https://restcountries.com/v2/all';//'./data/countries.json';
    this.#countriesRepository = new CountriesRepository();
    this.#initialiseHTML();
  }

  async #initialiseHTML() {
    // opvullen van de countriesRepository
    await this.#getData();
    // instellen van de event handler voor de search box
    this.#setupSearchBox();
    // bij het opstarten tonen we alle landen
    this.#countriesToHTML(this.#countriesRepository.countries);
  }

  async #getData() {
    try {
      const response = await fetch(this.#url);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const json = await response.json();
      json.forEach((c) =>
        this.#countriesRepository.addCountry(
          `${c.name} - ${c.nativeName}`,
          c.capital,
          c.region,
          c.flag
        )
      );
    } catch (error) {
      alert(
        'There has been a problem with your fetch operation: ' + error.message
      );
    }
  }

  #setupSearchBox() {
    const searchBox = document.getElementById('search');
    searchBox.addEventListener('keyup', () => {
      const filteredCountries = this.#countriesRepository.filteredCountries(
        searchBox.value
      );
      this.#countriesToHTML(filteredCountries);
    });
    searchBox.focus();
  }

  // Beeld een doorgegeven countries-array af op de webpagina
  // (de countries-array kan alle countries landen bevatten
  // of de gefilterde landen)
  #countriesToHTML(countries) {
    const numberElement = document.getElementById('number');
    const tbodyElement = document.getElementById('countries');

    tbodyElement.innerHTML = '';
    numberElement.innerText = `Number of countries: ${countries.length} `;

    countries.forEach((c) => {
      const strHTML = `<tr>
        <td>${c.countryName}</td>
        <td>${c.capital}</td>
        <td>${c.region}</td>
        <td><img src="${c.flag}" width="35" height="25"></td>
      </tr>`;

      tbodyElement.insertAdjacentHTML('beforeend', strHTML);
    });
  }
}
