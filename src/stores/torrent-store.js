import {observable, action, computed} from 'mobx';

import Torrent from 'stores/torrent';

class TorrentStore {
  @observable torrents = [];
  @observable statusFilter = 0;
  @observable trackerFilter = '';

  @action getAll() {
    return fetch('/src/fixtures/torrents.json').then(action((response) => {
      response.json().then(action((result) => {
        this.torrents.replace(
          result.arguments.torrents.map((torrent) => new Torrent(torrent))
        );
      }));
    }));
  }

  @computed get filteredTorrents() {
    return this.torrents.filter((torrent) => {
      return this.statusFilter === torrent.status;
        // TODO this.trackerFilter === torrent.trackers;
    });
  }

  @action setStatusFilter(statusFilter) {
    this.statusFilter = statusFilter;
  }

  @action setTrackerFilter(trackerFilter) {
    this.trackerFilter = trackerFilter;
  }
}

export default TorrentStore;
