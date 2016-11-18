import {observable, action} from 'mobx';

class ViewStore {
  @observable currentFilter = 'all';
  // TODO: Rename to selectedTorrentIds
  @observable selectedTorrents = [];
  @observable lastSelectedTorrent = null;
  @observable compact = false;
  @observable isPreferencesDialogShown = false;
  @observable isOpenDialogShown = false;
  @observable isInspectorShown = false;

  @action togglePreferencesDialog() {
    this.isPreferencesDialogShown = !this.isPreferencesDialogShown;
  }

  @action toggleOpenDialog() {
    this.isOpenDialogShown = !this.isOpenDialogShown;
  }

  @action toggleInspector() {
    this.isInspectorShown = !this.isInspectorShown;
  }

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

  @action selectTorrents(torrentIds) {
    this.selectedTorrents = torrentIds;
  }

  // TODO: Does this method belong to view store? If we're adding more logic to
  // selectedTorrents array, maybe it's a good idea to create an observable
  // TorrentCollection
  isTorrentSelected(id) {
    return this.selectedTorrents.includes(id);
  }
}

export default ViewStore;
