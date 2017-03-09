import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import { speedBps } from 'util/formatters';

import UpIcon from 'react-icons/lib/md/keyboard-arrow-up';
import DownIcon from 'react-icons/lib/md/keyboard-arrow-down';

import styles from './styles/index.css';

@inject('view_store', 'stats_store', 'torrents_store')
@observer
@CSSModules(styles)
class StatsToolbar extends Component {
  render() {
    return (
      <div styleName='stats'>
        <span>
          <DownIcon styleName='down' />
          {speedBps(this.props.torrents_store.totalDownloadSpeed)}
        </span>
        <span>
          <UpIcon styleName='up' />
          {speedBps(this.props.torrents_store.totalUploadSpeed)}
        </span>
      </div>
    );
  }
}

export default StatsToolbar;
