import React  from 'react';
import './FilmsSubTitles.css';

class FilmsSubTitles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFileNameAscOrdered : false,
      isDownloadsAscOrdered : false
    };
  }
  
  sortByFileName = () => {
    const isFileNameAscOrdered = !this.state.isFileNameAscOrdered;
    this.setState({isFileNameAscOrdered : isFileNameAscOrdered});
    this.props.onClickTitleFilename(isFileNameAscOrdered);
  }

  sortByDownloads = () => {
    const isDownloadsAscOrdered = !this.state.isDownloadsAscOrdered;
    this.setState({isDownloadsAscOrdered : isDownloadsAscOrdered});
    this.props.onClickTitleDownloads(isDownloadsAscOrdered);
  }

  render() {


    return(
      <table className="subtitles">
        
        {this.props.subtitles.length > 0 && 
        <thead>
          <tr>
            <th onClick={this.sortByFileName} className="sortable">FileName</th>
            <th onClick={this.sortByDownloads} className="sortable">Downloads</th>
          </tr>
        </thead>
        }
        <tbody>
          {this.props.subtitles.map(sub => (
            <tr key={sub.IDSubtitleFile}>
              <td><a href={sub.SubDownloadLink}>{sub.SubFileName}</a></td>   
              <td>{sub.SubDownloadsCnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default FilmsSubTitles;