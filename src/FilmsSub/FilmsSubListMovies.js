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
          <div className="film" key={film.id}>
            <h3 className="titre">
            {film.title}
            </h3>
            <h4>
            {film.year}
            </h4>
            <FilmsSubRatings ratings={film.ratings.slice()} />

            <img className="poster" alt={film.title} src={film.poster} onClick={this.handleClickPoster.bind(this, film.id)}/>
          </div>
        ))}
      </div>
    )
  }
}

export default FilmsSubListMovies;