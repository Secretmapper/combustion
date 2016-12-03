import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import lodash from 'lodash';

import { size } from 'util/formatters';
import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@observer
@CSSModules(styles)
class Inspector extends Component {
  @autobind renderActivity(info) {
    const activity = [
      {value: 'have', label: 'Have'},
      {value: 'availability', label: 'Availability'},
      {value: 'upload', label: 'Uploaded'},
      {value: 'download', label: 'Downloaded'},
      {value: 'state', label: 'State'},
      {value: 'running', label: 'Running Time'},
      {value: 'remaining', label: 'Remaining Time'},
      {value: 'last', label: 'Last Activity'},
      {value: 'error', label: 'Error'},
    ];

    return (
      <div>
        <h2>Activity</h2>
        {activity.map((activity, index) => (
          <div key={index} styleName='row'>
            <div styleName='key'>{activity.label}:</div>
            <div styleName='value'>{info[activity.value]}</div>
          </div>
        ))}
      </div>
    );
  }

  @autobind renderDetails(torrent) {
    const detail = [
      {value: 11, label: 'Size'},
      {value: torrent.downloadDir, label: 'Location'},
      {value: 13, label: 'Hash'},
      {value: 14, label: 'Privacy'},
      {value: 55, label: 'Origin'},
      {value: 55, label: 'Comment'},
    ];

    return (
      <div>
        <h2>Details</h2>
        {detail.map((detail, index) => (
          <div key={index} styleName='row'>
            <div styleName='key'>{detail.label}:</div>
            <div styleName='value'>{detail.value}</div>
          </div>
        ))}
      </div>
    );
  }

  compact(values, format, mixed) {
    if (values.length < 2) {
      return format(values);
    } else {
      const numbers = lodash.every(values, (value) => lodash.isNumber(value));

      if (numbers) {
        return format(values);
      } else {
        return lodash.uniq(values).length > 0 ? mixed : format(values);
      }
    }
  }

  sumSize(values) {
    return size(lodash.sum(values));
  }

  uniqText(values) {
    const len = lodash.uniq(lodash.compact(values)).length;

    if (len === 0) {
      return 'None';
    } else if (len === 1) {
      return values[0];
    } else {
      return 'Mixed';
    }
  }

  render() {
    const selectedTorrentIds = this.props.view_store.selectedTorrents;
    const torrents = this.props.torrents_store.torrents.filter((torrent) => selectedTorrentIds.includes(torrent.id));

    const data = torrents.reduce( (memo, torrent) => {

      memo.title.push(torrent.name);
      memo.have.push(torrent.totalSize);
      memo.upload.push(torrent.uploadedEver);
      memo.state.push(torrent.status);
      memo.error.push(torrent.errorString);

      return memo;
    }, {
      title: [],
      have: [],
      availability: [],
      upload: [],
      download: [],
      state: [],
      running: [],
      remaining: [],
      last: [],
      error: [],
    });

    const info = {
      title: this.compact(data.title, (num) => num, `${torrents.length} Transfers Selected`),
      have: this.compact(data.have, this.sumSize),
      upload: this.compact(data.upload, this.sumSize),
      download: this.compact(data.download, this.sumSize),
      state: this.compact(data.download, this.uniqText),
      error: this.compact(data.error, this.uniqText),
    };

    return (
      <div styleName='inspector'>
        <h1>{info.title}</h1>
        {this.renderActivity(info)}
        {/*this.renderDetails(torrent)*/}
      </div>
    );
  }
}

export default Inspector;
