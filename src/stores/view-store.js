import {observable, action} from 'mobx';

class ViewStore {
  @observable currentFilter = 'all';
  @observable selectedTorrents = [];
  @observable lastSelectedTorrent = null;

  @action setFilter(filter) {
    this.currentFilter = filter;
  }

  @action setSelected(id) {
    this.lastSelectedTorrent = id;
    this.selectedTorrents = [id];
  }

  @action toggleSelected(id) {
    const torrent = this.selectedTorrents.find((torrentId) => id === torrentId);

    this.lastSelectedTorrent = id;

    if (torrent) {
      this.selectedTorrents.remove(torrent);
      return;
    }

    this.selectedTorrents.push(id);
  }

  @action addSelectedRange(id, ids) {
    // TODO: Remove duplicates
    this.selectedTorrents = this.selectedTorrents.concat(ids);
    this.lastSelectedTorrent = id;
  }

  isTorrentSelected(id) {
    return this.selectedTorrents.indexOf(id) !== -1;
  }
}

export default ViewStore;
