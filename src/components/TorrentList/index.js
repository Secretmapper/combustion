import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { Compact, Full } from 'components/Torrent';

import styles from './styles/index.css';

@inject('torrents_store', 'view_store')
@observer
@CSSModules(styles)
class TorrentList extends Component {
  @autobind onClick(event, id) {
    if (event.ctrlKey) {
      this.props.view_store.toggleSelected(id);
      return;
    }

    if (event.shiftKey) {
      const { view_store, torrents_store } = this.props;

      const torrentIds = torrents_store.filteredTorrents.map((torrent) => torrent.id);
      const selectedTorrentIndex = torrentIds.indexOf(id);
      const lastSelectedTorrentIndex = torrentIds.indexOf(view_store.lastSelectedTorrent);
      const [lower, upper] = [lastSelectedTorrentIndex, selectedTorrentIndex].sort();
      const selectedIds = torrentIds.filter((_, index) => index >= lower && index <= upper);

      this.props.view_store.addSelectedRange(id, selectedIds);
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

          if (this.props.view_store.compact) {
            className += ` ${styles.torrentRowCompact}`;
          }

          const Torrent = this.props.view_store.compact ? Compact : Full;

          return (
            <li key={index} className={className} onClick={(event) => this.onClick(event, torrent.id)}>
              <Torrent torrent={torrent}/>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default TorrentList;
