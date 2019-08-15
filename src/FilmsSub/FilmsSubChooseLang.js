import React  from 'react';
import './FilmsSubChooseLang.css'

class FilmsSubChooseLang extends React.Component {

  changeLanguage = (lang) => {
    console.log('changeLangage', lang);
   this.props.onChangeLanguage(lang); 
  }

  render() {
    return(
      <div className="languages">
        <img alt="frlang" className={"flag " + (this.props.language === 'fre' ? "selected" : "notselected")} src="FR.svg" onClick={this.changeLanguage.bind(this, "fre")}/>
        <img alt="enlang" className={"flag " + (this.props.language === 'eng' ? "selected" : "notselected")} src="UK.svg" onClick={this.changeLanguage.bind(this, "eng")}/>
      </div> 
    )
  }
}

export default FilmsSubChooseLang;