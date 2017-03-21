import { computed, extendObservable } from 'mobx';
import { zip } from 'lodash';

class Torrent {
  static STATUS_STOPPED = 0;
  static STATUS_CHECK_WAIT = 1;
  static STATUS_CHECK = 2;
  static STATUS_DOWNLOAD_WAIT = 3;
  static STATUS_DOWNLOAD = 4;
  static STATUS_SEED_WAIT = 5;
  static STATUS_SEED = 6;

  static ERR_NONE = 0;
  static ERR_TRACKER_WARNING = 1;
  static ERR_TRACKER_ERROR = 2;
  static ERR_LOCAL_ERROR = 3;

  constructor(torrent) {
    // TODO: Maybe filter torrent attributes (to not make everything observable)
    extendObservable(this, torrent);
  }

  update(torrent) {
    extendObservable(this, torrent)
  }

  // TODO: Find a better name for this (displayName, compareName, etc.)
  @computed get publicName() {
    if (!this.collatedName && this.name) {
      return this.name;
    }

    return this.collatedName || '';
  }

  @computed get hasErrors() {
    return this.error > Torrent.ERR_NONE;
  }

  @computed get errorDescription() {
    return this.errorString;
  }

  @computed get isSeeding() {
    return this.status === Torrent.STATUS_SEED;
  }

  @computed get isStopped() {
    return this.status === Torrent.STATUS_STOPPED;
  }

  @computed get isChecking() {
    return this.status === Torrent.STATUS_CHECK;
  }

  @computed get isDownloading() {
    return this.status === Torrent.STATUS_DOWNLOAD;
  }

  @computed get isSeedingQueued() {
    return this.status === Torrent.STATUS_SEED_WAIT;
  }

  @computed get isDownloadingQueued() {
    return this.status === Torrent.STATUS_DOWNLOAD_WAIT;
  }

  @computed get isQueued() {
    return this.isDownloadingQueued || this.isSeedingQueued;
  }

  @computed get isDone() {
    return this.leftUntilDone < 1;
  }

  @computed get needsMetaData() {
    return this.metadataPercentComplete < 1;
  }

  @computed get have() {
    return this.haveValid + this.haveUnchecked;
  }

  @computed get filesAndStats() {
    return zip(this.files, this.fileStats).map(([file, fileStat]) => ({
      ...file,
      ...fileStat,
    }));
  }
}

export default Torrent;
