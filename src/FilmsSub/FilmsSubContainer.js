import React  from 'react';
import FilmsSubSearch from './FilmsSubSearch';
import FilmsSubListMovies from './FilmsSubListMovies';
import FilmsSubTitles from './FilmsSubTitles';
import FilmsSubChooseLang from './FilmsSubChooseLang';


class FilmsSubContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      results: [],
      subtitles: [],
      language: 'fre'
    };
  }

  handleChangeText = (text) => {
    this.setState({
      searchText: text
    });
  }

  submitText = () => {
    this.setState({
      results:[],
      subtitles: []
    });

    console.log('text: ', this.state.searchText);

    fetch(`https://www.omdbapi.com/?s=${this.state.searchText}&apikey=8f366aa`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(searchResult => {
        const res = searchResult.Search.slice(0, 4);
        this.setState({
          results: res.map((elt) => ({
            ...elt,
            Ratings: []
          }))
        });

        if (this.state.results.length > 0) {
          this.getDetails();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getDetails = () => {
    let res = this.state.results.slice();

    res.forEach((film, index) => {
      fetch(`https://www.omdbapi.com/?i=${film.imdbID}&apikey=8f366aa`)
      .then(response => {
        if (!response.ok) {
          console.log(response);
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(detail => {
        res = res.map((elt) => elt.imdbID === detail.imdbID ? detail : elt);
        console.log('res details', res);

        this.setState({
          results: res
        });
      })
      .catch(err => {
        console.log(err);
      });
    });
  }

  getSubtitlesByImdbID= (imdbID) => {
    console.log('getSubtitlesByImdbID', imdbID);
    const myHeaders = new Headers();
    myHeaders.append("X-User-Agent", "TemporaryUserAgent");

    const myInit = { method: 'GET', headers: myHeaders};

    fetch(`https://rest.opensubtitles.org/search/imdbid-${imdbID.slice(2)}/sublanguageid-${this.state.language}`, myInit)
      .then(response => {
        console.log('response opensubtitles', response);
        if (!response.ok) {
          throw new Error('erreur appel opensubtitles');
        }
        return response.json();
      })
      .then(osResults => {
        this.setState({subtitles : osResults});
      })
      .catch(err => {
        console.log(err);
      })
  }

  sortByFileName = (isAscOrdered) => {
    let newsubs;
    if (isAscOrdered) {
      newsubs = this.state.subtitles.sort((a, b) => a.SubFileName.localeCompare(b.SubFileName));
    } else {
      newsubs = this.state.subtitles.sort((a, b) => b.SubFileName.localeCompare(a.SubFileName));
    }
    this.setState({subtitles: newsubs});
  }

  sortByDownloads = (isAscOrdered) => {
    let newsubs;
    if (isAscOrdered) {
      newsubs = this.state.subtitles.sort((a, b) => parseInt(a.SubDownloadsCnt) - parseInt(b.SubDownloadsCnt));
    } else {
      newsubs = this.state.subtitles.sort((a, b) => parseInt(b.SubDownloadsCnt) - parseInt(a.SubDownloadsCnt));
    }
    this.setState({subtitles: newsubs});
  }

  sortByEpisode = (isAscOrdered) => {
    let newsubs;
    if (isAscOrdered) {
      newsubs = this.state.subtitles.sort((a, b) => (parseInt(a.SeriesSeason)*100 + parseInt(a.SeriesEpisode)) - (parseInt(b.SeriesSeason)*100 + parseInt(b.SeriesEpisode)));
    } else {
      newsubs = this.state.subtitles.sort((a, b) => (parseInt(b.SeriesSeason)*100 + parseInt(b.SeriesEpisode)) - (parseInt(a.SeriesSeason)*100 + parseInt(a.SeriesEpisode)));
    }
    this.setState({subtitles: newsubs});
  }

  handleChangeLanguage = (language) => {
    this.setState({
      language: language
    });
  }

  render() {
    return(
      <React.Fragment>
        <h1>Get Movie or TV Series Subtitles</h1>
        <FilmsSubTitles 
          subtitles={this.state.subtitles}
          onClickTitleFilename={this.sortByFileName}
          onClickTitleDownloads={this.sortByDownloads}
          onClickTitleEpisode={this.sortByEpisode}
        />
        <FilmsSubSearch
          searchText={this.state.searchText}
          onChangeText={this.handleChangeText}
          onSubmitText={this.submitText}
          />
        <FilmsSubChooseLang 
          language={this.state.language}
          onChangeLanguage={this.handleChangeLanguage}
          />
        <FilmsSubListMovies 
          results={this.state.results}
          onClickPoster={this.getSubtitlesByImdbID}
          />
      </React.Fragment>
    )
  }
}

export default FilmsSubContainer;