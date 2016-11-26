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

  @action fetch(torrentIds) {
    const data = {
      fields: ['id', 'addedDate', 'name', 'totalSize', 'error', 'errorString',
        'eta', 'isFinished', 'isStalled', 'leftUntilDone', 'metadataPercentComplete',
        'peersConnected', 'peersGettingFromUs', 'peersSendingToUs', 'percentDone',
        'queuePosition', 'rateDownload', 'rateUpload', 'recheckProgress',
        'seedRatioMode', 'seedRatioLimit', 'sizeWhenDone', 'status', 'trackers',
        'downloadDir', 'uploadedEver', 'uploadRatio', 'webseedsSendingToUs'
      ]
    };

    if (torrentIds) {
      data['ids'] = torrentIds;
    }

    return this.rpc.sendRequest('torrent-get', data).then(action((response) => {
      response.json().then(action((result) => {
        this.torrents.replace(
          result.arguments.torrents.map((torrent) => new Torrent(torrent))
        );
      }));
    }));
  }

  @action fetchIds(torrentIds) {
    const data = {
      fields: ['id']
    };

    if (torrentIds) {
      data['ids'] = torrentIds;
    }

    return this.rpc.sendRequest('torrent-get', data).then(action((response) => {
      response.json().then(action((result) => {
        this.torrents.replace(
          result.arguments.torrents.map((torrent) => new Torrent(torrent))
        );
      }));
    }));
  }

  @action add(torrentUploads) {
    return this.rpc.sendRequest('torrent-add', torrentUploads).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetchIds();
      }));
    }));
  }

  @action start(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc.sendRequest('torrent-start', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentIds);
      }));
    }));
  }

  @action startNow(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc.sendRequest('torrent-start-now', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentIds);
      }));
    }));
  }

  @action stop(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc.sendRequest('torrent-stop', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentIds);
      }));
    }));
  }

  @action remove(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc.sendRequest('torrent-remove', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetchIds();
      }));
    }));
  }

  @action queueMoveTop(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc.sendRequest('queue-move-top', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentIds);
      }));
    }));
  }

  @action queueMoveUp(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc.sendRequest('queue-move-up', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentIds);
      }));
    }));
  }

  @action queueMoveDown(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc.sendRequest('queue-move-down', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentIds);
      }));
    }));
  }

  @action queueMoveBottom(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc.sendRequest('queue-move-bottom', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentIds);
      }));
    }));
  }

  @action verify(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc.sendRequest('torrent-verify', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentIds);
      }));
    }));
  }

  @action askTrackerMorePeers(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc.sendRequest('torrent-reannounce', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentIds);
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
      if (this.trackerFilter && !extractDomains(torrent).includes(this.trackerFilter)) return false;
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
    return this.torrents.filter((torrent) => ids.includes(torrent.id));
  }
}

export default TorrentStore;
