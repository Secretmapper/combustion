import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import Torrent from 'stores/torrent';

import arrowUpImage from '../../images/arrow-up.png';
import arrowDownImage from '../../images/arrow-down.png';

import styles from './styles';

@CSSModules(styles)
class FilterToolbar extends Component {
  constructor(props) {
    super(props);

    this.onChangeFilterState = this.onChangeFilterState.bind(this);
    this.onChangeFilterTracker = this.onChangeFilterTracker.bind(this);
    this.onChangeFilterText = this.onChangeFilterText.bind(this);
  }

  onChangeFilterState(event) {
    this.props.torrents_store.setStatusFilter(+event.target.value);
  }

  onChangeFilterTracker(event) {
    this.props.torrents_store.setTrackerFilter(event.target.value);
  }

  onChangeFilterText(event) {
    this.props.torrents_store.setTextFilter(event.target.value);
  }

  render() {
    const torrentCount = this.props.stats_store.stats.torrentCount;
    const downloadSpeed = this.props.stats_store.stats.downloadSpeed;
    const uploadSpeed = this.props.stats_store.stats.uploadSpeed;
    const states = [
      {value: 11, label: 'Active'},
      {value: Torrent.STATUS_DOWNLOAD, label: 'Downloading'},
      {value: Torrent.STATUS_SEED, label: 'Seeding'},
      {value: Torrent.STATUS_STOPPED, label: 'Paused'},
      {value: 55, label: 'Finished'},
    ];

    const trackers = this.props.torrents_store.trackers.map((domain) => {
      const label = domain.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize

      return {value: domain, label};
    });

    return (
      <div styleName='toolbar'>
        <span>Show</span>

        <div styleName='filters'>
          <select onChange={this.onChangeFilterState}>
            <option value=''>All</option>
            {states.map((state) => <option value={state.value}>{state.label}</option>)}
          </select>
          <select onChange={this.onChangeFilterTracker}>
            <option value=''>All</option>
            {trackers.map((tracker) => <option value={tracker.value}>{tracker.label}</option>)}
          </select>
          <input styleName='filter' type='search' placeholder='Filter' onChange={this.onChangeFilterText}/>
          <span styleName='counter'>{torrentCount} Transfers</span>
        </div>

        <div styleName='stats'>
          <span>
            <img src={arrowDownImage} alt='Download speed' title='Download speed'/>
            {downloadSpeed} Kb/s
          </span>
          <span>
            <img src={arrowUpImage} alt='Upload speed' title='Upload speed'/>
            {uploadSpeed} Kb/s
          </span>
        </div>
      </div>
    );
  }
}

export default inject('view_store', 'stats_store', 'torrents_store')(observer(FilterToolbar));
