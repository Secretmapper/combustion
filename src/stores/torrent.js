import {observable, action} from 'mobx';
import torrents from '../fixtures/torrents.json';

class TorrentStore {

  @observable torrents = [];

  @action getAll() {
    this.torrents = torrents.arguments.torrents;
  }
}

export default TorrentStore;
