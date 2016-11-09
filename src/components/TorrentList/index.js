import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import Torrent from 'components/Torrent';

import styles from './styles';

@inject('torrents_store', 'view_store')
@observer
@CSSModules(styles)
class TorrentList extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event, id) {
    if (event.ctrlKey) {
      this.props.view_store.toggleSelected(id);
      return;
    }

    if (event.shiftKey) {
      const view_store = this.props.view_store;
      const torrents = this.props.torrents_store.torrents;
      const lastPosition = torrents.findIndex((torrent) => torrent.id === view_store.lastSelectedTorrent);
      const position = torrents.findIndex((torrent) => torrent.id === id);
      const [lower, upper] = [lastPosition, position].sort();
      const range = torrents.map((torrent) => torrent.id).filter((torrentId, index) => index >= lower && index <= upper);
      this.props.view_store.addSelectedRange(id, range);
      return;
    }

    this.props.view_store.setSelected(id);
  }

  render() {
    return (
      <ul styleName='torrentList'>
        {this.props.torrents_store.filteredTorrents.map((torrent, index) => {
          let className = styles.torrentRow;

          if (this.props.view_store.isTorrentSelected(torrent.id)) {
            className += ` ${styles.torrentRowSelected}`;
          }

          if (index % 2 === 1) { // Zero indexed. lololo
            className +=  ` ${styles.torrentRowEven}`;
          }

          return (
            <li className={className} onClick={(event) => this.onClick(event, torrent.id)}>
              <Torrent torrent={torrent}/>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default TorrentList;
