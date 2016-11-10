import {observable, action} from 'mobx';

class ViewStore {
  @observable currentFilter = 'all';
  @observable selectedTorrents = [];
  @observable lastSelectedTorrent = null;
  @observable compact = false;

  @action toggleCompact() {
    this.compact = !this.compact;
  }

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
    this.selectedTorrents = [...new Set(this.selectedTorrents.concat(ids))]; // Unique
    this.lastSelectedTorrent = id;
  }

  isTorrentSelected(id) {
    return this.selectedTorrents.indexOf(id) !== -1;
  }
}

export default ViewStore;
