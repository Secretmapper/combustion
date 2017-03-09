import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { observer } from 'mobx-react';

import PlayIcon from 'react-icons/lib/md/play-circle-outline';
import PauseIcon from 'react-icons/lib/md/pause-circle-outline';

import styles from './styles/index.css';

@observer
@CSSModules(styles)
class StatusButton extends Component {
  static defaultProps = {
    onToggle: () => {},
  }

  render() {
    if (this.props.torrent.isStopped) {
      return <PlayIcon onClick={this.props.onToggle.bind(this, this.props.torrent.id)} />
    } else {
      return <PauseIcon onClick={this.props.onToggle.bind(this, this.props.torrent.id)} />
    }
  }
}

export default StatusButton;
