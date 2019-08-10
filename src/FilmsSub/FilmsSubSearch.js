import React  from 'react';
import './FilmsSubSearch.css';

class FilmsSubSearch extends React.Component {
  handleChange = (e) => {
    this.props.onChangeText(e.target.value);
  }

  handleSubmit = () => {
    this.props.onSubmitText();
  }

  render() {
    return(
      <div>
        <input type="text" value={this.props.searchText} onChange={this.handleChange}></input>
        <button onClick={this.handleSubmit}>Lancer</button>
      </div>
    )
  }
}

export default FilmsSubSearch;