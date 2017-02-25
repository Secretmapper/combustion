import { action, observable } from 'mobx';

import { fileToBase64 } from 'util/converters';

class TorrentUpload {
  // TODO: No need for observable
  @observable files = [];
  @observable url;
  @observable downloadDir;
  @observable paused;

  @action setDownloadDir(dir) {
    this.downloadDir = dir;
  }

  @action setPaused(paused) {
    this.paused = paused;
  }

  @action setTorrentFiles(files) {
    // FileList is not an Array, use destructuring to convert it
    this.files.replace([...files]);
  }

  @action setTorrentUrl(url) {
    // Accept also torrent hash as url
    if (url.match(/^[0-9a-f]{40}$/i)) {
      this.url = `magnet:?xt=urn:btih:${url}`;
      return;
    }

    this.url = url;
  }

  serialize() {
    return new Promise((resolve, reject) => {
      Promise.all(this.files.map((file) => fileToBase64(file)))
        .then((encodedTorrents) => {
          const fileTorrents = encodedTorrents.map((encodedTorrent) => {
            return {
              metainfo: encodedTorrent,
              paused: this.paused,
              'download-dir': this.downloadDir,
            };
          });

          const urlTorrent = {
            filename: this.url,
            paused: this.paused,
            'download-dir': this.downloadDir,
          };

          resolve([...fileTorrents, urlTorrent]);
        })
        .catch(() => reject());
    });
  }
}

export default TorrentUpload;
