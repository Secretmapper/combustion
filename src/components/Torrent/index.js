import React, { Component} from 'react';

class Torrent extends Component {
  render() {
    const torrent = this.props.torrent;

    return (
      <div style={{margin: '10px', border: '1px solid grey', padding: '5px'}}>
        <p>
          <strong>{torrent.name}</strong>
        </p>
        <p>
          <strong>{torrent.totalSize}</strong>
        </p>
        <progress max="100" value="80"></progress>
        <p>{torrent.status}</p>
        <p>Downloading ... ↓ {torrent.rateDownload} ↑ {torrent.rateUpload}</p>
      </div>
    );
  }
}

export default Torrent;
