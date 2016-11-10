import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import ProgressBar from './ProgressBar';

import { getPeerDetails } from './services/formatters';

import styles from './styles';

@inject('view_store')
@observer
@CSSModules(styles)
class Expanded extends Component {
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
          2.24 GB, uploaded 2.25 GB (Ratio 1.00)
        </div>
      </div>
    );
  }
}

export default Expanded;
