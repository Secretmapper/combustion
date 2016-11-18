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

  @autobind onToggleContextMenu() {
    this.props.view_store.toggleTorrentContextMenu();
  }

  render() {
    return (
      <ContextMenu
        show={this.props.show}
        container={this.props.container}
        target={this.props.target}
        onHide={this.props.onHide}
      >
        <ul styleName='torrentMenu' onClick={this.onToggleContextMenu}>
          <li styleName='torrentMenuItemNotCompleted'>Pause</li>
          <li styleName='torrentMenuItemNotCompleted'>Resume</li>
          <li styleName='torrentMenuItemNotCompleted'>Resume Now</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItemNotCompleted'>Move to Top</li>
          <li styleName='torrentMenuItemNotCompleted'>Move Up</li>
          <li styleName='torrentMenuItemNotCompleted'>Move Down</li>
          <li styleName='torrentMenuItemNotCompleted'>Move to Bottom</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItemNotCompleted'>Remove From List...</li>
          <li styleName='torrentMenuItemNotCompleted'>Trash Data & Remove From List...</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItemNotCompleted'>Verify Local Data</li>
          <li styleName='torrentMenuItemNotCompleted'>Set Location...</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItemNotCompleted'>Ask tracker for more peers</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItem' onClick={this.onSelectAll}>Select All</li>
          <li styleName='torrentMenuItem' onClick={this.onDeselectAll}>Deselect All</li>
        </ul>
      </ContextMenu>
    );
  }
}

export default TorrentContextMenu;
