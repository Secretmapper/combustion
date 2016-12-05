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

  @autobind renderDetails(info) {
    const detail = [
      {value: 'size', label: 'Size'},
      {value: 'pieceCount', label: 'Piece count'},
      {value: 'pieceSize', label: 'Piece size'},
      {value: 'location', label: 'Location'},
      {value: 'hash', label: 'Hash'},
      {value: 'privacy', label: 'Privacy'},
      {value: 'origin', label: 'Origin'},
      {value: 'comment', label: 'Comment'},
    ];

    return (
      <div>
        <h2>Details</h2>
        {detail.map((detail, index) => (
          <div key={index} styleName='row'>
            <div styleName='key'>{detail.label}:</div>
            <div styleName='value'>{info[detail.value]}</div>
          </div>
        ))}
      </div>
    );
  }

  @autobind renderTrackers(info) {
    const trackers = info.trackers[0];

    return (
      <div>
        <h2>Trackers</h2>
        <ul styleName='trackers'>
        {trackers.map((tracker, index) => (
          <li>{tracker.host}</li>
        ))}
        </ul>
      </div>
    );
  }

  @autobind renderFiles(info) {
    if (info.files.length > 1) return null;

    const files = info.files[0];

    return (
      <div>
        <h2>Files</h2>
        <ul styleName='files'>
        {files.map((file, index) => (
          <li styleName='file'>
            <div styleName='name'>{file.name}</div>

            <div styleName='priority'>
              <button onClick={() => this.onClickPriority(index, 'low')}>Low</button>
              <button onClick={() => this.onClickPriority(index, 'normal')}>Normal</button>
              <button onClick={() => this.onClickPriority(index, 'high')}>High</button>
            </div>
          </li>
        ))}
        </ul>
      </div>
    );
  }

  onClickPriority(index, priority) {
    alert(`${index} ${priority}`);
  }

  compact(values, format, mixed) {
    if (values.length < 2) {
      return format(values);
    } else {
      return lodash.uniq(values).length > 0 ? mixed : format(values);
    }
  }

  sum(values) {
    return lodash.sum(values);
  }

  sumSize(values) {
    return size(lodash.sum(values));
  }

  uniqText(values) {
    const uniqValues = lodash.uniq(values);
    const len = uniqValues.length;

    if (len === 0) {
      return 'None';
    } else if (len === 1) {
      return uniqValues[0];
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

      memo.origin.push(`Created by ${torrent.creator} on ${torrent.dateCreated}`);
      memo.comment.push(torrent.comment);
      memo.location.push(torrent.downloadDir);
      memo.hash.push(torrent.hashString);
      memo.privacy.push(torrent.isPrivate ? 'Private to this tracker -- DHT and PEX disabled' : 'Public torrent');
      memo.pieceCount.push(torrent.pieceCount);
      memo.pieceSize.push(torrent.pieceSize);
      memo.last.push(torrent.activityDate);
      memo.trackers.push(torrent.trackerStats);
      memo.files.push(torrent.files);

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

      origin: [],
      comment: [],
      location: [],
      hash: [],
      privacy: [],
      pieceCount: [],
      pieceSize: [],
      trackers: [],
      files: [],
    });

    const info = {
      title: this.compact(data.title, (num) => num, `${torrents.length} Transfers Selected`),
      have: this.sumSize(data.have),
      upload: this.sumSize(data.upload),
      download: this.sumSize(data.download),
      state: this.uniqText(data.state),
      error: this.uniqText(data.error),

      origin: this.uniqText(data.origin),
      comment: this.uniqText(data.comment),
      location: this.uniqText(data.location),
      hash: this.uniqText(data.hash),
      privacy: this.uniqText(data.privacy),
      pieceCount: this.sum(data.pieceCount),
      pieceSize: this.sumSize(data.pieceSize),
      last: this.uniqText(data.last),
      trackers: data.trackers,
      files: data.files,
    };

    return (
      <div styleName='inspector'>
        <h1>{info.title}</h1>
        {this.renderActivity(info)}
        {this.renderDetails(info)}
        {this.renderTrackers(info)}
        {this.renderFiles(info)}
      </div>
    );
  }
}

export default Inspector;
