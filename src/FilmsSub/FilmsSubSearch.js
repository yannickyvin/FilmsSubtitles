import React  from 'react';
import './FilmsSubSearch.css';

class FilmsSubSearch extends React.Component {
  handleChange = (e) => {
    this.props.onChangeText(e.target.value);
  }

  handleSubmit = () => {
    this.props.onSubmitText();
  }

  keypress = (e) => {
    console.log('keypress', e.key);
    if (e.key === 'Enter') {
      this.props.onSubmitText();
    }
  }

  render() {
    return(
      <div className="searchform">
        <input type="text" value={this.props.searchText} onChange={this.handleChange} onKeyDown={this.keypress} placeholder="choose movie or series..."></input>
        <button onClick={this.handleSubmit}>Search</button>
      </div>
    )
  }
}

export default FilmsSubSearch;