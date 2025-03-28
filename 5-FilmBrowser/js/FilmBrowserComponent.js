import FilmRepository from './FilmRepository.js';

export default class FilmBrowserComponent {
  #filmRepository;
  #url;
  constructor() {
    this.#filmRepository = new FilmRepository();
    this.#url = 'http://www.omdbapi.com/';
    document.getElementById('searchBtn').onclick = () => {
      this.#searchFilms(document.getElementById('searchText').value);
    };
  }

  async #searchFilms(searchText) {
    if (searchText !== '') {
      // films opvragen
      try {
        const url = `${this.#url}?s=${searchText}&apikey=57927523`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const resultJSON = await response.json();
        if (resultJSON.Response === 'True') {
          this.#filmRepository.addFilms(resultJSON.Search);
          this.#showFilms();
        } else {
          this.#showMessage('No films found for this search!!');
        }
      } catch (rejectValue) {
        this.#showMessage(
          `Something went wrong retrieving the film data: ${rejectValue}`
        );
      }
    } else {
      this.#showMessage('The search can not be empty!!');
    }
  }

  async #getFilm(id) {
    // details van één film opvragen
    try {
      const url = `${this.#url}/?i=${id}&plot=full&apikey=57927523`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const resultJSON = await response.json();
      if (resultJSON.Response === 'True') {
        this.#filmRepository.addDetail(id, resultJSON);
        const film = this.#filmRepository.getFilmById(id);
        this.#showDetailFilm(film);
      }
    } catch (rejectValue) {
      this.#showMessage(
        `Something went wrong retrieving the film detail data: ${rejectValue}`
      );
    }
  }

  #showFilms() {
    document.getElementById('films').innerHTML = '';
    this.#filmRepository.films.forEach((film) => {
      document.getElementById('films').insertAdjacentHTML(
        'beforeend',
        `     
        <div class="col s12 m6">
          <div class="card small horizontal">
            <div class="card-image">
              <img id="${film.id}" src="${film.poster}" alt="${film.title}">
            </div>
            <div class="card-stacked">  
              <div class="card-content">
                <span class="card-title">${film.title}</span>             
                <ul>
                  <li>Type: ${film.type}</li>
                  <li>Year: ${film.year}</li>
                </ul>
             </div> 
            </div>       
          </div>
        </div>
      `
      );
      document.getElementById(film.id).onclick = () => {
        this.#getFilm(film.id);
      };
    });
  }

  #showDetailFilm(film) {
    let details = '';
    Object.entries(film.detail).forEach(([key, value]) => {
      details += `<li><label>${key}:</label> ${value}</li>`;
    });
    document.getElementById('films').innerHTML = '';
    document.getElementById('films').insertAdjacentHTML(
      'beforeend',
      `     
        <div class="col s12">
          <div class="card horizontal">
            <div class="card-image">
              <img id="listFilms" src="${film.poster}" alt="${film.title}">
            </div>
            <div class="card-stacked">  
              <div class="card-content">
                <span class="card-title">${film.title}</span>             
                <ul>
                  <li><label>type:</label> ${film.type}</li>
                  <li><label>year:</label> ${film.year}</li>
                  ${details}
                </ul>
              </div>
            </div>       
          </div>
        </div>
      `
    );
    document.getElementById('listFilms').onclick = () => {
      this.#showFilms();
    };
  }

  #showMessage(message) {
    document.getElementById('films').innerHTML = '';
    document.getElementById('films').insertAdjacentHTML(
      'beforeend',
      `
      <div class="col s12">
        <p>${message}</p>
      </div>
      `
    );
  }
}
