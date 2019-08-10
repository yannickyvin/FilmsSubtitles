import React  from 'react';

class FilmsSubChooseLang extends React.Component {

  changeLanguage = (lang) => {

  }

  render() {
    return(
      <div>
        <input type="radio" id="fre" name="language" value="fre" checked />
        <label for="fre">Français</label>
        <input type="radio" id="eng" name="language" value="eng" />
        <label for="eng">English</label>
      </div>
    )
  }
}

export default FilmsSubChooseLang;