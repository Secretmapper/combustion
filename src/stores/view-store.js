import {observable, action} from 'mobx';

class ViewStore {
  @observable currentFilter = 'all';
  // TODO: Rename to selectedTorrentIds
  @observable selectedTorrents = [];
  @observable lastSelectedTorrent = null;
  @observable compact = false;

  @observable isSettingsContextMenuShown = false;
  @observable isTorrentContextMenuShown = false;

  @observable isRenamePromptShown = false;
  @observable isLocationPromptShown = false;

  // TODO: find a better way to manage them
  @observable isOpenDialogShown = false;
  @observable isPreferencesDialogShown = false;
  @observable isConnectionDialogShown = false;
  @observable isStatisticsDialogShown = false;
  @observable isAboutDialogShown = false;
  @observable isInspectorShown = false;

  @action toggleContextMenus() {
    this.isSettingsContextMenuShown = false;
    this.isTorrentContextMenuShown = false;
  }

  @action toggleSettingsContextMenu() {
    this.toggleContextMenus();
    this.isSettingsContextMenuShown = !this.isSettingsContextMenuShown;
  }

  @action toggleTorrentContextMenu() {
    this.toggleContextMenus();
    this.isTorrentContextMenuShown = !this.isTorrentContextMenuShown;
  }

  @action toggleRenamePrompt() {
    this.isRenamePromptShown = !this.isRenamePromptShown;
  }

  @action toggleLocationPrompt() {
    this.isLocationPromptShown = !this.isLocationPromptShown;
  }

  @action toggleOpenDialog() {
    this.isOpenDialogShown = !this.isOpenDialogShown;
  }

  @action togglePreferencesDialog() {
    this.isPreferencesDialogShown = !this.isPreferencesDialogShown;
  }

  @action toggleConnectionDialog(value) {
    this.isConnectionDialogShown = value;
  }

  @action toggleStatisticsDialog() {
    this.isStatisticsDialogShown = !this.isStatisticsDialogShown;
  }

  @action toggleAboutDialog() {
    this.isAboutDialogShown = !this.isAboutDialogShown;
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
