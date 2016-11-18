import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import ProgressBar from './ProgressBar';

import { getPeerDetails, getProgressDetails } from './services';

import styles from './styles/index.css';

@inject('view_store')
@observer
@CSSModules(styles)
class Full extends Component {
  render() {
    const torrent = this.props.torrent;

    return (
      <div styleName='torrent'>
        <div styleName='name'>
          {torrent.name}
        </div>
        <div styleName='peerDetails'>
          {getPeerDetails(torrent)}
        </div>
        <div styleName='progressBarRow'>
          <ProgressBar torrent={torrent} />
          <button></button>
        </div>
        <div styleName='progressDetails'>
          {getProgressDetails(torrent)}
        </div>
      </div>
    );
  }
}

export default Full;
