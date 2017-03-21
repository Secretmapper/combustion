import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import TorrentContextMenu from 'components/menus/TorrentContextMenu';

import Compact from './Compact';
import Full from './Full';

@inject('prefs_store', 'view_store')
@observer
class Torrent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        left: 0,
        top: 0,
      },
    };
  }

  @autobind toggleContextMenu(position) {
    if (!this.isContextMenuShown()) {
      this.props.view_store.toggleTorrentContextMenu(this.props.torrent.id);
    }

    this.setState({position});
  }

  @autobind onContextMenu(event) {
    const { clientX, clientY } = event;

    event.preventDefault();

    this.toggleContextMenu({left: clientX, top: clientY});
  }

  @autobind isContextMenuShown() {
    return this.props.view_store.torrentContextMenuShown === this.props.torrent.id;
  }

  @autobind renderContextMenu() {
    const { top, left } = this.state.position;

    // TODO: Proper handling position depending on component bounds (left, top)

    return (
      <div ref='target' style={{position: 'absolute', visibility: 'hidden', top: top, left: left + 50}}>
        <TorrentContextMenu
          show={this.isContextMenuShown()}
          container={this}
          placement='top'
          target={() => findDOMNode(this.refs.target)}
          onHide={() => this.props.view_store.toggleTorrentContextMenu()}
        />
      </div>
    );
  }

  render() {
    const {torrent, prefs_store} = this.props;
    const View = prefs_store.compact ? Compact : Full;

    return (
      <div onContextMenu={this.onContextMenu}>
        <View torrent={torrent}/>
        {this.renderContextMenu()}
      </div>
    );
  }
}

export default Torrent;
