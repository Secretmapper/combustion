import {observable, action} from 'mobx';

import Torrent from 'stores/torrent';

class TorrentStore {
  @observable torrents = [];

  @action getAll() {
    return fetch('/src/fixtures/torrents.json').then(action((response) => {
      response.json().then(action((result) => {
        this.torrents.replace(
          result.arguments.torrents.map((torrent) => new Torrent(torrent))
        );
      }));
    }));
  }
}

export default TorrentStore;
