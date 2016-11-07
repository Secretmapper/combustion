import {observable, action} from 'mobx';

class TorrentStore {
  @observable torrents = [];

  @action getAll() {
    return fetch('/src/fixtures/torrents.json').then(action((response) => {
      response.json().then(action((result) => {
        this.torrents.replace(result.arguments.torrents);
      }));
    }));
  }
}

export default TorrentStore;
