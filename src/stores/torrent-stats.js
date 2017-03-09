import { computed } from 'mobx';

import { toStringWithCommas } from 'util/common';
import {
  size as formatSize,
  mem as formatMem,
  timeInterval,
  formatStatus,
  percentString,
} from 'util/formatters';

import Tracker from 'stores/tracker';

export default class TorrentStats {
  constructor(torrents) {
    this.torrents = torrents;
  }

  @computed get title() {
    if (this.torrents.length === 0) {
      return 'No Selection';
    }

    if (this.torrents.length === 1) {
      return this.torrents[0].publicName;
    }

    return `${this.torrents.length} Transfers Selected`;
  }

  // TODO: Maybe rename to totalHave (same for others) for better understanding
  @computed get have() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    return formatSize(this.torrents.reduce((totalSize, torrent) => totalSize + torrent.totalSize, 0));
  }

  @computed get available() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const available = this.torrents
      .filter((torrent) => !torrent.needsMetaData)
      .reduce((totalAvailable, torrent) => totalAvailable + torrent.have + torrent.desiredAvailable, 0);
    const sizeWhenDone = this.torrents
      .filter((torrent) => !torrent.needsMetaData)
      .reduce((totalSize, torrent) => totalSize + torrent.sizeWhenDone, 0);

    return `${percentString((100.0 * available) / sizeWhenDone)}%`;
  }

  @computed get upload() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    return formatSize(this.torrents.reduce((totalSize, torrent) => totalSize + torrent.uploadedEver, 0));
  }

  @computed get download() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    return formatSize(this.torrents.reduce((totalSize, torrent) => totalSize + torrent.downloadedEver, 0));
  }

  @computed get state() {
    const states = [...new Set(this.torrents.map((torrent) => torrent.status))];

    if (states.length === 0) {
      return 'None';
    }

    if (states.length === 1) {
      return formatStatus(this.torrents[0]);
    }

    return 'Mixed';
  }

  // TODO: Review
  @computed get error() {
    const errors = [...new Set(this.torrents.map((torrent) => torrent.errorString).filter((errorString) => errorString.length > 0))];

    if (errors.length === 0) {
      return 'None';
    }

    if (errors.length === 1) {
      return errors[0];
    }

    return 'Mixed';
  }

  @computed get runningTime() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const baseline = this.torrents[0].startDate;
    const allPaused = this.torrents.every((torrent) => torrent.isStopped);
    const multiBaseline = this.torrents.some((torrent) => torrent.startDate !== baseline);

    if (allPaused) {
      return this.state;
    }

    if (multiBaseline) {
      return 'Mixed';
    }

    return timeInterval(Date.now() / 1000 - baseline);
  }

  @computed get remainingTime() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const baseline = this.torrents[0].eta;
    const multiBaseline = this.torrents.some((torrent) => torrent.eta !== baseline);

    if (multiBaseline) {
      return 'Mixed';
    }

    if (baseline < 0) {
      return 'Unknown';
    }

    return timeInterval(baseline);
  }

  @computed get lastActivity() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const baseline = this.torrents.reduce((lastActivityDate, torrent) => lastActivityDate < torrent.activityDate ? torrent.activityDate : lastActivityDate, -1);
    const elapsedSeconds = Date.now() / 1000 - baseline;

    if (elapsedSeconds < 0) {
      return 'None';
    }

    if (elapsedSeconds < 5) {
      return 'Active now';
    }

    return `${timeInterval(elapsedSeconds)} ago`;
  }

  @computed get size() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const pieceSize = this.torrents[0].pieceSize;
    const pieces = this.torrents.reduce((totalPieces, torrent) => totalPieces + torrent.pieceCount, 0);
    const size = this.torrents.reduce((totalSize, torrent) => totalSize + torrent.totalSize, 0);
    const multiPieceSize = this.torrents.some((torrent) => torrent.pieceSize !== pieceSize);

    if (size === 0) {
      return 'None';
    }

    if (!multiPieceSize) {
      return `${formatSize(size)} (${toStringWithCommas(pieces)} pieces @ ${formatMem(pieceSize)})`;
    }

    return `${formatSize(size)} (${toStringWithCommas(pieces)} pieces)`;
  }

  @computed get hash() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const hashString = this.torrents[0].hashString;
    const multiHash = this.torrents.some((torrent) => torrent.hashString !== hashString);

    if (multiHash) {
      return 'Mixed';
    }

    return hashString;
  }

  @computed get foldername() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const downloadDir = this.torrents[0].downloadDir;
    const multiDownloadDir = this.torrents.some((torrent) => torrent.downloadDir !== downloadDir);

    if (multiDownloadDir) {
      return 'Mixed';
    }

    return downloadDir;
  }

  @computed get privacy() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const isPrivate = this.torrents[0].isPrivate;
    const multiIsPrivate = this.torrents.some((torrent) => torrent.isPrivate !== isPrivate);

    if (multiIsPrivate) {
      return 'Mixed';
    }

    if (isPrivate) {
      return 'Private to this tracker -- DHT and PEX disabled';
    }

    return 'Public torrent';
  }

  @computed get origin() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const creator = this.torrents[0].creator;
    const dateCreated = this.torrents[0].dateCreated;
    const mixedCreator = this.torrents.some((torrent) => torrent.creator !== creator);
    const mixedDate = this.torrents.some((torrent) => torrent.dateCreated !== dateCreated);

    const emptyCreator = !creator || !creator.length;
    const emptyDateCreated = !dateCreated;

    if (mixedCreator || mixedDate) {
      return 'Mixed';
    }

    if (emptyCreator && emptyDateCreated) {
      return 'Unknown';
    }

    if (emptyDateCreated && !emptyCreator) {
      return `Created by ${creator}`;
    }

    if (emptyCreator && !emptyDateCreated) {
      return `Created on ${(new Date(dateCreated * 1000)).toDateString()}`;
    }

    return `Created by ${creator} on ${(new Date(dateCreated * 1000)).toDateString()}`;
  }

  @computed get comment() {
    if (this.torrents.length === 0) {
      return 'None';
    }

    const comment = this.torrents[0].comment;
    const multiComment = this.torrents.some((torrent) => torrent.comment !== comment);

    if (!comment) {
      return 'None';
    }

    if (multiComment) {
      return 'Mixed';
    }

    return comment;
  }

  @computed get peers() {
    return this.torrents
      .sort((torrentA, torrentB) => {
        return torrentA.publicName.toLowerCase().localeCompare(torrentB.publicName.toLowerCase());
      })
      .reduce((allPeers, torrent) => {
        allPeers.push({
          name: torrent.publicName,
          peers: torrent.peers,
        });

      return allPeers
    }, []);
  }

  @computed get trackers() {
    return this.torrents
      .sort((torrentA, torrentB) => {
        return torrentA.publicName.toLowerCase().localeCompare(torrentB.publicName.toLowerCase());
      })
      .reduce((allTrackers, torrent) => {
        allTrackers.push({
          name: torrent.publicName,
          trackers: torrent.trackerStats.map((trackerData) => new Tracker(trackerData)),
        });

      return allTrackers
    }, []);
  }

  @computed get files() {
    return this.torrents
      .sort((torrentA, torrentB) => {
        return torrentA.publicName.toLowerCase().localeCompare(torrentB.publicName.toLowerCase());
      })
      .reduce((allFiles, torrent) => {
        allFiles.push({
          name: torrent.publicName,
          files: torrent.filesAndStats,
        });

      return allFiles
    }, []);
  }
}
