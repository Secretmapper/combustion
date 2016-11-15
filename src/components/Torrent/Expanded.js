import React from 'react';
import { findDOMNode } from 'react-dom'
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import PureComponent from 'components/PureComponent';
import ContextMenu from 'components/ContextMenu';
import ProgressBar from './ProgressBar';

import { getPeerDetails, getProgressDetails } from './services';

import styles from './styles/index.css';

@inject('view_store')
@observer
@CSSModules(styles)
class Expanded extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showContextMenu: false,
      position: {
        left: 0,
        top: 0,
      },
    };

    this.onContextMenu = this.onContextMenu.bind(this);
    this.toggleContextMenu = this.toggleContextMenu.bind(this);
    this.renderContextMenu = this.renderContextMenu.bind(this);
  }

  onContextMenu(event) {
    const { clientX, clientY } = event;

    event.preventDefault();
    this.toggleContextMenu({left: clientX, top: clientY});
  }

  toggleContextMenu(position) {
    this.setState({showContextMenu: true, position});
  }

  renderContextMenu() {
    const { position, showContextMenu } = this.state;

    return (
      <div ref='target' style={{position: 'absolute', visibility: 'hidden', ...position, left: position.left + 50}}>
        <ContextMenu
          show={showContextMenu}
          container={this}
          target={() => {
            return findDOMNode(this.refs.target);
          }}
          onHide={() => this.setState({showContextMenu: false})}
        >
          <ul styleName='torrentMenu'>
            <li styleName='torrentMenuItem'>Pause</li>
            <li styleName='torrentMenuItem'>Resume</li>
            <li styleName='torrentMenuItem'>Resume Now</li>
            <li styleName='torrentMenuSeparator' />
            <li styleName='torrentMenuItem'>Move to Top</li>
            <li styleName='torrentMenuItem'>Move Up</li>
            <li styleName='torrentMenuItem'>Move Down</li>
            <li styleName='torrentMenuItem'>Move to Bottom</li>
            <li styleName='torrentMenuSeparator' />
            <li styleName='torrentMenuItem'>Remove From List...</li>
            <li styleName='torrentMenuItem'>Trash Data & Remove From List...</li>
            <li styleName='torrentMenuSeparator' />
            <li styleName='torrentMenuItem'>Verify Local Data</li>
            <li styleName='torrentMenuItem'>Set Location...</li>
            <li styleName='torrentMenuSeparator' />
            <li styleName='torrentMenuItem'>Ask tracker for more peers</li>
            <li styleName='torrentMenuSeparator' />
            <li styleName='torrentMenuItem'>Select All</li>
            <li styleName='torrentMenuItem'>Deselect All</li>
          </ul>
        </ContextMenu>
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
