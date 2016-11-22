import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import ContextMenu from 'components/ContextMenu';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@CSSModules(styles)
class TorrentContextMenu extends Component {
  @autobind pause() {
    this.props.torrents_store.stop(this.props.view_store.selectedTorrents);
  }

  @autobind resume() {
    this.props.torrents_store.start(this.props.view_store.selectedTorrents);
  }

  @autobind resumeNow() {
    this.props.torrents_store.startNow(this.props.view_store.selectedTorrents);
  }

  @autobind remove() {
    // TODO: Confirm dialog
    this.props.torrents_store.remove(this.props.view_store.selectedTorrents);
  }

  @autobind trashAndRemove() {
    // TODO: Confirm dialog
    this.props.torrents_store.remove(this.props.view_store.selectedTorrents, {
      'delete-local-data': true
    });
  }

  @autobind setLocation() {
    this.props.view_store.toggleLocationPrompt();
  }

  @autobind rename() {
    this.props.view_store.toggleRenamePrompt();
  }

  @autobind queueMoveTop() {
    this.props.torrents_store.queueMoveTop(this.props.view_store.selectedTorrents);
  }

  @autobind queueMoveUp() {
    this.props.torrents_store.queueMoveUp(this.props.view_store.selectedTorrents);
  }

  @autobind queueMoveDown() {
    this.props.torrents_store.queueMoveDown(this.props.view_store.selectedTorrents);
  }

  @autobind queueMoveBottom() {
    this.props.torrents_store.queueMoveBottom(this.props.view_store.selectedTorrents);
  }

  @autobind verify() {
    this.props.torrents_store.verify(this.props.view_store.selectedTorrents);
  }

  @autobind askTrackerMorePeers() {
    this.props.torrents_store.askTrackerMorePeers(this.props.view_store.selectedTorrents);
  }

  @autobind onSelectAll() {
    this.props.view_store.selectTorrents(this.props.torrents_store.filteredTorrents.map((torrent) => torrent.id));
  }

  @autobind onDeselectAll() {
    this.props.view_store.selectTorrents([]);
  }

  @autobind onToggleContextMenu() {
    // TODO: Move it to ContextMenu component
    this.props.view_store.toggleContextMenus();
  }

  render() {
    const selectedTorrents = this.props.view_store.selectedTorrents;
    const noMultiple = selectedTorrents.length > 1 ? styles.torrentMenuItemDisabled : styles.torrentMenuItem;

    return (
      <ContextMenu
        show={this.props.show}
        container={this.props.container}
        target={this.props.target}
        onHide={this.props.onHide}
      >
        <ul styleName='torrentMenu' onClick={this.onToggleContextMenu}>
          <li styleName='torrentMenuItem' onClick={this.pause}>Pause</li>
          <li styleName='torrentMenuItem' onClick={this.resume}>Resume</li>
          <li styleName='torrentMenuItem' onClick={this.resumeNow}>Resume Now</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItem' onClick={this.queueMoveTop}>Move to Top</li>
          <li styleName='torrentMenuItem' onClick={this.queueMoveUp}>Move Up</li>
          <li styleName='torrentMenuItem' onClick={this.queueMoveDown}>Move Down</li>
          <li styleName='torrentMenuItem' onClick={this.queueMoveBottom}>Move to Bottom</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItem' onClick={this.remove}>Remove From List...</li>
          <li styleName='torrentMenuItem' onClick={this.trashAndRemove}>Trash Data & Remove From List...</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItem' onClick={this.verify}>Verify Local Data</li>
          <li className={noMultiple} onClick={this.setLocation} >Set Location...</li>
          <li className={noMultiple} onClick={this.rename}>Rename...</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItem' onClick={this.askTrackerMorePeers}>Ask tracker for more peers</li>
          <li styleName='torrentMenuSeparator' />
          <li styleName='torrentMenuItem' onClick={this.onSelectAll}>Select All</li>
          <li styleName='torrentMenuItem' onClick={this.onDeselectAll}>Deselect All</li>
        </ul>
      </ContextMenu>
    );
  }
}

export default TorrentContextMenu;
