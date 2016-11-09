import { computed, extendObservable } from 'mobx';

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

  @computed get isQueued() {
    return this.status === Torrent.STATUS_DOWNLOAD_WAIT ||
           this.status === Torrent.STATUS_SEED_WAIT;
  }
}

export default Torrent;
