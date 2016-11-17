import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import ContextMenu from 'components/ContextMenu';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@CSSModules(styles)
class TorrentContextMenu extends Component {
  @autobind onSelectAll() {
    this.props.view_store.selectTorrents(this.props.torrents_store.filteredTorrents.map((torrent) => torrent.id));
  }

  @autobind onDeselectAll() {
    this.props.view_store.selectTorrents([]);
  }

  render() {
    return (
      <ContextMenu
        show={this.props.show}
        container={this.props.container}
        target={this.props.target}
        onHide={this.props.onHide}
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
          <li styleName='torrentMenuItem' onClick={this.onSelectAll}>Select All</li>
          <li styleName='torrentMenuItem' onClick={this.onDeselectAll}>Deselect All</li>
        </ul>
      </ContextMenu>
    );
  }
}

export default TorrentContextMenu;
