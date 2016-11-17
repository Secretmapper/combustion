import {observable, action, computed} from 'mobx';

import Torrent from 'stores/torrent';

const domainRegExp = /([a-zA-Z0-9]+\.)?([a-zA-Z0-9][a-zA-Z0-9-]+)\.[a-zA-Z]{2,6}/i;

const extractDomain = (url) => {
  const matches = url.match(domainRegExp);
  return matches[2];
};

const extractDomains = (torrent) => {
  return torrent.trackers.map((tracker) => extractDomain(tracker.announce));
};

class TorrentStore {
  @observable torrents = [];
  @observable statusFilter = 0;
  @observable trackerFilter = '';
  @observable textFilter = '';

  constructor(rpc) {
    this.rpc = rpc;
  }

  @action getAll() {
    const data = {
      fields: ['id', 'addedDate', 'name', 'totalSize', 'error', 'errorString',
        'eta', 'isFinished', 'isStalled', 'leftUntilDone', 'metadataPercentComplete',
        'peersConnected', 'peersGettingFromUs', 'peersSendingToUs', 'percentDone',
        'queuePosition', 'rateDownload', 'rateUpload', 'recheckProgress',
        'seedRatioMode', 'seedRatioLimit', 'sizeWhenDone', 'status', 'trackers',
        'downloadDir', 'uploadedEver', 'uploadRatio', 'webseedsSendingToUs'
      ]
    };
    return this.rpc.sendRequest('torrent-get', data).then(action((response) => {
      response.json().then(action((result) => {
        this.torrents.replace(
          result.arguments.torrents.map((torrent) => new Torrent(torrent))
        );
      }));
    }));
  }

  @computed get trackers() {
    const trackers = this.torrents.reduce((memo, torrent) => {
      memo = memo.concat(extractDomains(torrent));
      return memo;
    }, []);

    return [...new Set(trackers)]; // Unique
  }

  @computed get filteredTorrents() {
    const regexp = new RegExp(this.textFilter, 'i'); // TODO: Escape!

    return this.torrents.filter((torrent) => {
      if (this.statusFilter && this.statusFilter !== torrent.status) return false;
      if (this.trackerFilter && extractDomains(torrent).indexOf(this.trackerFilter) === -1) return false;
      if (this.textFilter && !regexp.test(torrent.name)) return false;

      return true;
    }).sort((torrentA, torrentB) => {
      return torrentA.publicName.localeCompare(torrentB.publicName);
    });
  }

  @action setStatusFilter(statusFilter) {
    this.statusFilter = statusFilter;
  }

  @action setTrackerFilter(trackerFilter) {
    this.trackerFilter = trackerFilter;
  }

  @action setTextFilter(textFilter) {
    this.textFilter = textFilter;
  }

  getByIds(ids) {
    return this.torrents.filter((torrent) => {
      return ids.indexOf(torrent.id) !== -1;
    });
  }
}

export default TorrentStore;
