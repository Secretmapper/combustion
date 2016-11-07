import React, { Component } from 'react';

import Name from './Name';
import PeerDetails from './PeerDetails';
import ProgressBar from './ProgressBar';
import ProgressDetails from './ProgressDetails';

class Torrent extends Component {
  render() {
    const torrent = this.props.torrent;

    return (
      <div style={{margin: '10px', border: '1px solid grey', padding: '5px'}}>
        <Name torrent={torrent} />
        <PeerDetails torrent={torrent} />
        <ProgressBar torrent={torrent} />
        <ProgressDetails torrent={torrent} />
      </div>
    );
  }
}

export default Torrent;
