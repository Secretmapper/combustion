import React, { Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import lodash from 'lodash';

import infoImage from 'images/inspector-info.png';
import peersImage from 'images/inspector-peers.png';
import trackersImage from 'images/inspector-trackers.png';
import filesImage from 'images/inspector-files.png';

import { size, speed } from 'util/formatters';
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

  @autobind renderPeers(info) {
    if (info.peers.length > 1) return null;

    const peers = info.peers[0];

    return (
      <div>
        <h2>Peers</h2>
        <table styleName='peers'>
          <thead>
            <tr>
              <th>Up</th>
              <th>Down</th>
              <th>%</th>
              <th>Status</th>
              <th>Address</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>
            {peers.map((peer, index) => (
              <tr key={index}>
                <td>{!peer.isDownloadingFrom && speed(peer.rateToClient)}</td>
                <td>{peer.isDownloadingFrom && speed(peer.rateToClient)}</td>
                <td>{peer.progress}</td>
                <td>{peer.flagStr}</td>
                <td>{peer.address}</td>
                <td>{peer.clientName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  @autobind renderTrackers(info) {
    if (info.trackers.length > 1) return null;

    const trackers = info.trackers[0];

    return (
      <div>
        <h2>Trackers</h2>
        <ul styleName='trackers'>
        {trackers.map((tracker, index) => (
          <li key={index}>{tracker.host}</li>
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
          <li key={index} styleName='file'>
            <input type='checkbox' disabled='disabled' checked={file.wanted}/>
            <div styleName='name'>{file.name}</div>
            <span>P: {file.priority}</span>

            <div styleName='priority'>
              <button onClick={() => this.onClickPriority(index, 'low')} title='Low Priority'>∨</button>
              <button onClick={() => this.onClickPriority(index, 'normal')} title='Normal Priority'>-</button>
              <button onClick={() => this.onClickPriority(index, 'high')} title='High Priority'>∧</button>
            </div>
          </li>
        ))}
        </ul>
      </div>
    );
  }

  onClickPriority(fileId, priority) {
    const selectedTorrentIds = this.props.view_store.selectedTorrents;
    const torrents = this.props.torrents_store.torrents.filter((torrent) => selectedTorrentIds.includes(torrent.id));

    this.props.torrents_store.setPriority(torrents[0].id, priority, [fileId]);
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
    const torrents = this.props.torrents_store.getByIds(selectedTorrentIds);

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
      memo.peers.push(torrent.peers);
      memo.files.push(torrent.files.map((file, index) => {
        return {
          ...file,
          ...torrent.fileStats[index],
        };
      }));

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
      peers: [],
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
      peers: data.peers,
    };

    return (
      <div styleName='inspector'>
        <Tabs>
          <TabList>
            <Tab>
              <img src={infoImage} alt='Info' />
            </Tab>
            <Tab>
              <img src={peersImage} alt='Peers' />
            </Tab>
            <Tab>
              <img src={trackersImage} alt='Trackers' />
            </Tab>
            <Tab>
              <img src={filesImage} alt='Files' />
            </Tab>
          </TabList>
          <TabPanel>
            <h1>{info.title}</h1>
            {this.renderActivity(info)}
            {this.renderDetails(info)}
          </TabPanel>
          <TabPanel>
            <h1>{info.title}</h1>
            {this.renderPeers(info)}
          </TabPanel>
          <TabPanel>
            <h1>{info.title}</h1>
            {this.renderTrackers(info)}
          </TabPanel>
          <TabPanel>
            <h1>{info.title}</h1>
            {this.renderFiles(info)}
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Inspector;
