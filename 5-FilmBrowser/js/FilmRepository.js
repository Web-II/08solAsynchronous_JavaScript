import Film from './Film.js';

export default class FilmRepository {
  #films = [];

  get films() {
    return this.#films;
  }

  addFilms(arrFilms) {
    this.#films = arrFilms.map(
      (obj) => new Film(obj.imdbID, obj.Title, obj.Type, obj.Poster, obj.Year)
    );
  }

  addDetail(id, objDetail) {
    const film = this.getFilmById(id);
    film.detail.time = objDetail.Runtime;
    film.detail.genre = objDetail.Genre;
    film.detail.director = objDetail.Director;
    film.detail.actors = objDetail.Actors;
    film.detail.plot = objDetail.Plot;
    film.detail.language = objDetail.Language;
  }
  getFilmById(id) {
    return this.#films.find((f) => f.id === id);
  }
}
