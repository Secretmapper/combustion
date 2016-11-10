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

  @action getAll() {
    return fetch('/src/fixtures/torrents.json').then(action((response) => {
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
}

export default TorrentStore;
