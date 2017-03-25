import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import ContextMenu from 'components/menus/ContextMenu';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store', 'prefs_store')
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

  @autobind onToggleContextMenu() {
    // TODO: Move it to ContextMenu component
    this.props.view_store.toggleContextMenus();
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
          <li styleName='torrentMenuItem' onClick={this.resumeNow}>Resume Now</li>
          <li styleName='torrentMenuSeparator' />
        </ul>
      </ContextMenu>
    );
  }
}

export default TorrentContextMenu;
