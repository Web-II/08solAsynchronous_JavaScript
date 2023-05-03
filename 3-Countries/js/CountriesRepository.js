import Country from './Country.js';

export default class CountriesRepository {
  #countries = [];
  get countries() {
    return this.#countries;
  }

  addCountry(name, capital, region, flag) {
    this.#countries.push(new Country(name, capital, region, flag));
  }

  filteredCountries(searchString) {
    return !searchString
      ? this.countries
      : this.countries.filter((c) =>
          c.countryName.toLowerCase().startsWith(searchString.toLowerCase())
        );
  }
}
