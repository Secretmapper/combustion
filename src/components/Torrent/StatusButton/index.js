import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { observer } from 'mobx-react';

import styles from './styles/index.css';

@observer
@CSSModules(styles)
class StatusButton extends Component {
  static defaultProps = {
    onToggle: () => {},
  }

  render() {
    return (
      <button
        styleName={this.props.torrent.isStopped ? 'statusResume' : 'statusPause'}
        onClick={this.props.onToggle.bind(this, this.props.torrent.id)}
      />
    );
  }
}

export default StatusButton;
