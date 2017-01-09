import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import ProgressBar from './ProgressBar';
import StatusButton from './StatusButton';

import { getPeerDetails, getProgressDetails } from './services';

import styles from './styles/index.css';

function getPeerDetailsStyles(torrent) {
  if (torrent.hasErrors) {
    return `peerDetailsError`;
  }

  return 'peerDetails';
}

@inject('view_store', 'torrents_store')
@observer
@CSSModules(styles)
class Full extends Component {
  @autobind onToggleTorrent(torrentId) {
    if (this.props.torrent.isStopped) {
      this.props.torrents_store.start(torrentId);
      return;
    }

    this.props.torrents_store.stop(torrentId);
  }

  render() {
    const torrent = this.props.torrent;

    return (
      <div styleName='torrent'>
        <div styleName='name'>
          {torrent.name}
        </div>
        <div styleName={getPeerDetailsStyles(torrent)}>
          {getPeerDetails(torrent)}
        </div>
        <div styleName='progressBarRow'>
          <ProgressBar torrent={torrent} />
          <StatusButton torrent={torrent} onToggle={this.onToggleTorrent} />
        </div>
        <div styleName='progressDetails'>
          {getProgressDetails(torrent)}
        </div>
      </div>
    );
  }
}

export default Full;
