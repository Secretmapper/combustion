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

export const sortCriteria = [
  { value: 'queue_order', label: 'Queue Order' },
  { value: 'activity', label: 'Activity' },
  { value: 'age', label: 'Age' },
  { value: 'name', label: 'Name' },
  { value: 'percent_completed', label: 'Progress' },
  { value: 'ratio', label: 'Ratio' },
  { value: 'size', label: 'Size' },
  { value: 'state', label: 'State' }
]

export const criteriaList = {
  queue_order: 'Queue Order',
  activity: 'Activity',
  age: 'Age',
  name: 'Name',
  percent_completed: 'Progress',
  ratio: 'Ratio',
  size: 'Size',
  state: 'State',
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
        const newTorrents = result.arguments.torrents;

        if (torrentIds) {
          // There are ids passed to fetch, edit cache of dirty torrents
          // XXX: This is a potentially slow operation. Perhaps cache should be a map?
          newTorrents.forEach(torrent => {
            const i = this.torrents.findIndex(t => t.id === torrent.id);
            if (i >= 0) {
              this.torrents[i].update(torrent);
            }
          });
        } else {
          // No ids passed, just replace the whole cache
          this.torrents.replace(
            newTorrents.map((torrent) => new Torrent(torrent))
          );
        }
      }));
    }));
  }

  @action add(torrentUploads) {
    return this.rpc
            .sendRequest('torrent-add', torrentUploads)
            .then(this.refetchIfNeeded());
  }

  @action start(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc
            .sendRequest('torrent-start', data)
            .then(this.refetchIfNeeded(torrentIds));
  }

  @action startNow(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc
            .sendRequest('torrent-start-now', data)
            .then(this.refetchIfNeeded(torrentIds));
  }

  @action stop(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc
            .sendRequest('torrent-stop', data)
            .then(this.refetchIfNeeded(torrentIds));
  }

  @action remove(torrentIds, options = {}) {
    const data = {
      ...options,
      ids: torrentIds,
    };

    return this.rpc
            .sendRequest('torrent-remove', data)
            .then(this.refetchIfNeeded());
  }

  @action queueMoveTop(torrentIds) {
    this.setSortCriteria('queue_order');
    const data = {
      ids: torrentIds,
    };

    return this.rpc
            .sendRequest('queue-move-top', data)
            .then(this.refetchIfNeeded());
  }

  @action queueMoveUp(torrentIds) {
    this.setSortCriteria('queue_order');
    const data = {
      ids: torrentIds,
    };

    return this.rpc
            .sendRequest('queue-move-up', data)
            .then(this.refetchIfNeeded());
  }

  @action queueMoveDown(torrentIds) {
    this.setSortCriteria('queue_order');
    const data = {
      ids: torrentIds,
    };

    return this.rpc
            .sendRequest('queue-move-down', data)
            .then(this.refetchIfNeeded());
  }

  @action queueMoveBottom(torrentIds) {
    this.setSortCriteria('queue_order');
    const data = {
      ids: torrentIds,
    };

    return this.rpc
            .sendRequest('queue-move-bottom', data)
            .then(this.refetchIfNeeded());
  }

  @action verify(torrentIds) {
    const data = {
      ids: torrentIds,
    };

    return this.rpc
            .sendRequest('torrent-verify', data)
            .then(this.refetchIfNeeded(torrentIds));
  }

  @action rename(torrentIds, path, name) {
    const data = {
      ids: torrentIds,
      path,
      name,
    };

    return this.rpc
            .sendRequest('torrent-rename-path', data)
            .then(this.refetchIfNeeded(torrentIds));
  }

  @action setLocation(torrentIds, location) {
    const data = {
      ids: torrentIds,
      location,
      move: true,
    };

    return this.rpc
            .sendRequest('torrent-set-location', data)
            .then(this.refetchIfNeeded(torrentIds));
  }

  @action setPriority(torrentId, priority, fileIds) {
    const data = {
      ids: [torrentId],
      // low | normal | high
      [`priority-${priority}`]: fileIds,
    };

    return this.rpc
            .sendRequest('torrent-set', data)
            .then(this.refetchIfNeeded([torrentId]));
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

    return this.rpc
            .sendRequest('torrent-reannounce', data)
            .then(this.refetchIfNeeded(torrentIds));
  }

  @computed get trackers() {
    const trackers = this.torrents.reduce((memo, torrent) => {
      memo = memo.concat(extractDomains(torrent));
      return memo;
    }, []);

    return [...new Set(trackers)]; // Unique
  }

  getFilteredCount(statusFilter = this.statusFilter) {
    const regexp = new RegExp(this.textFilter, 'i'); // TODO: Escape!

    return this.torrents.filter((torrent) => {
      if (statusFilter !== -1 && statusFilter !== torrent.status) return false;
      if (this.trackerFilter && !extractDomains(torrent).includes(this.trackerFilter)) return false;
      if (this.textFilter && !regexp.test(torrent.name)) return false;

      return true;
    }).length;
  }

  @computed get statesWithCount() {
    return [
      {count: this.getFilteredCount(-1), value: -1, label: 'All'},
      {count: this.getFilteredCount(11), value: 11, label: 'Active'},
      {
        count: this.getFilteredCount(Torrent.STATUS_DOWNLOAD),
        value: Torrent.STATUS_DOWNLOAD,
        label: 'Downloading'
      },
      {
        count: this.getFilteredCount(Torrent.STATUS_SEED),
        value: Torrent.STATUS_SEED,
        label: 'Seeding'
      },
      {
        count: this.getFilteredCount(Torrent.STATUS_STOPPED),
        value: Torrent.STATUS_STOPPED,
        label: 'Paused'
      },
      {count: this.getFilteredCount(55), value: 55, label: 'Finished'},
    ];
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

  refetchIfNeeded = torrentIds => response => {
    response.json().then((response) => {
      // TODO: Review!
      if (response.result !== 'success') return;

      this.fetch();
    })
  }

  getByIds(ids) {
    return this.torrents.filter((torrent) => ids.includes(torrent.id));
  }
}

export default TorrentStore;
