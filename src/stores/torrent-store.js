import {observable, action, computed} from 'mobx';

import Torrent from 'stores/torrent';
import * as comparators from 'util/comparators';
import { parseUri } from 'util/uri';

export const comparatorsMap = {
  queue_order: comparators.compareByQueue,
  activity: comparators.compareByActivity,
  age: comparators.compareByAge,
  name: comparators.compareByName,
  percent_completed: comparators.compareByProgress,
  ratio: comparators.compareByRatio,
  size: comparators.compareBySize,
  state: comparators.compareByState,
};

export const extractDomains = (torrent) => {
  return torrent.trackers.map((tracker) => parseUri(tracker.announce).host);
};

class TorrentStore {
  @observable previousTorrents = [];
  @observable torrents = [];
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
        'downloadDir', 'uploadedEver', 'uploadRatio', 'webseedsSendingToUs',


        'activityDate', 'corruptEver', 'desiredAvailable', 'downloadedEver',
        'fileStats', 'haveUnchecked', 'haveValid', 'peers', 'startDate',
        'trackerStats', 'comment', 'creator', 'dateCreated', 'files',
        'hashString', 'isPrivate', 'pieceCount', 'pieceSize'

      ]
    };

    if (torrentIds) {
      data['ids'] = torrentIds;
    }

    return this.rpc.sendRequest('torrent-get', data).then(action((response) => {
      response.json().then(action((result) => {
        this.previousTorrents = this.torrents.slice();
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

  @action remove(torrentIds, options = {}) {
    const data = {
      ...options,
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

  @action rename(torrentIds, path, name) {
    const data = {
      ids: torrentIds,
      path,
      name,
    };

    return this.rpc.sendRequest('torrent-rename-path', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentIds);
      }));
    }));
  }

  @action setLocation(torrentIds, location) {
    const data = {
      ids: torrentIds,
      location,
      move: true,
    };

    return this.rpc.sendRequest('torrent-set-location', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentIds);
      }));
    }));
  }

  @action setPriority(torrentId, priority, fileIds) {
    const data = {
      ids: [torrentId],
      // low | normal | high
      [`priority-${priority}`]: fileIds,
    };

    return this.rpc.sendRequest('torrent-set', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentId);
      }));
    }));
  }

  @action setWanted(torrentId, wanted, fileIds) {
    const data = {
      ids: [torrentId],
      // wanted | unwanted
      [`files-${wanted}`]: fileIds,
    };

    return this.rpc.sendRequest('torrent-set', data).then(action((response) => {
      response.json().then(action((result) => {
        // TODO: Review!
        if (result.result.success !== 'success') return;

        this.fetch(torrentId);
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

  @computed get startedTorrents() {
    return this.torrents.filter((torrent) => {
      const addedTorrent = !this.previousTorrents.find(({id}) => id === torrent.id);
      // TODO: Find a proper timeout
      const recentlyAdded = (Date.now() - torrent.addedDate * 1000) < 5000;

      return addedTorrent && recentlyAdded;
    });
  }

  @computed get completedTorrents() {
    return this.torrents.filter((torrent) => {
      const previousTorrent = this.previousTorrents.find(({id}) => id === torrent.id);
      const recentlyChanged = previousTorrent && previousTorrent.status !== torrent.status;

      return recentlyChanged && torrent.isDone;
    });
  }

  @computed get totalUploadSpeed() {
    return this.torrents.reduce((total, torrent) => total + torrent.rateUpload, 0);
  }

  @computed get totalDownloadSpeed() {
    return this.torrents.reduce((total, torrent) => total + torrent.rateDownload, 0);
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
