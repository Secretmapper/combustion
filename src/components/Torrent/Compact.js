import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import ProgressBar from './ProgressBar';

import styles from './styles';

@inject('view_store')
@observer
@CSSModules(styles)
class Compact extends Component {
  render() {
    const torrent = this.props.torrent;

    return (
      <div styleName='torrentCompact'>
        <div styleName='nameCompact'>
          {torrent.name}
        </div>
        <div styleName='detailsCompact'>
          Ratio: 0.41, ↑ 50 kB/s
        </div>
        <div styleName='progressBarRowCompact'>
          <ProgressBar torrent={torrent} />
        </div>
      </div>
    );
  }
}

export default Compact;
