import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import Name from './Name';
import PeerDetails from './PeerDetails';
import ProgressBar from './ProgressBar';
import ProgressDetails from './ProgressDetails';

import styles from './styles';

@CSSModules(styles)
class Torrent extends Component {
  render() {
    const torrent = this.props.torrent;

    return (
      <div styleName='torrent'>
        <Name torrent={torrent} />
        <PeerDetails torrent={torrent} />
        <ProgressBar torrent={torrent} />
        <ProgressDetails torrent={torrent} />
      </div>
    );
  }
}

export default Torrent;
