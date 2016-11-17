import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import TorrentContextMenu from 'components/TorrentContextMenu';
import ProgressBar from './ProgressBar';

import { getPeerDetails, getProgressDetails } from './services';

import styles from './styles/index.css';

@inject('view_store')
@observer
@CSSModules(styles)
class Expanded extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showContextMenu: false,
      position: {
        left: 0,
        top: 0,
      },
    };
  }

  @autobind onContextMenu(event) {
    const { clientX, clientY } = event;

    event.preventDefault();
    this.toggleContextMenu({left: clientX, top: clientY});
  }

  @autobind toggleContextMenu(position) {
    this.setState({showContextMenu: true, position});
  }

  @autobind renderContextMenu() {
    const { position, showContextMenu } = this.state;

    return (
      <div ref='target' style={{position: 'absolute', visibility: 'hidden', ...position, left: position.left + 50}}>
        <TorrentContextMenu
          show={showContextMenu}
          container={this}
          target={() => findDOMNode(this.refs.target)}
          onHide={() => this.setState({showContextMenu: false})}
        />
      </div>
    );
  }

  render() {
    const torrent = this.props.torrent;

    return (
      <div
        styleName='torrent'
        onContextMenu={this.onContextMenu}
      >
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
          {this.renderContextMenu()}
      </div>
    );
  }
}

export default Expanded;
