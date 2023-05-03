export default class Country {
  #countryName;
  #capital;
  #region;
  #flag;

  constructor(countryName, capital, region, flag) {
    this.#countryName = countryName;
    this.#capital = capital;
    this.#region = region;
    this.#flag = flag;
  }

  get countryName() {
    return this.#countryName;
  }

  get capital() {
    return this.#capital;
  }

  get region() {
    return this.#region;
  }

  get flag() {
    return this.#flag;
  }
}
