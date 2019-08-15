import React  from 'react';
import FilmsSubRatings from './FilmsSubRatings';
import './FilmsSubListMovies.css';

class FilmsSubListMovies extends React.Component {

  handleClickPoster = (id) => {
    console.log('handleClickPoster', id);
    this.props.onClickPoster(id);
  }

  render() {
    return(
      <div className="films">
        {this.props.results.map(film => (
          <div className="film" key={film.imdbID}>
            <h3 className="titre">{film.Title}</h3>
            <h4>{film.Year}</h4>
            <div className={film.Type === 'movie' ? 'movie' : 'series'}>{film.Type}</div>
            <FilmsSubRatings ratings={film.Ratings.slice()} />

            <img className="poster" alt={film.Title} src={film.Poster} onClick={this.handleClickPoster.bind(this, film.imdbID)}/>
          </div>
        ))}
      </div>
    )
  }
}

export default FilmsSubListMovies;