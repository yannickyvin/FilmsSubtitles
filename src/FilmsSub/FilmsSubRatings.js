import React  from 'react';

class FilmsSubRatings extends React.Component {

  render() {
    if (this.props.ratings.length > 0) {
      return(
        <div>
          {this.props.ratings.map(rating => (
            <div key={rating.Value}>
              {rating.Source} - {rating.Value} 
            </div>
          ))}
        </div>
      )
    } else {
      return(
        <div>
          {this.props.ratings.length}
        </div>
      )
    }
  }
}

export default FilmsSubRatings;