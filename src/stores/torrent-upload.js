import { action, observable, extendObservable } from 'mobx';

import { fileToBase64 } from 'util/converters';

class TorrentUpload {
  // TODO: No need for observable
  @observable files;
  @observable filename;
  @observable downloadDir;

  @action setData(uploadData) {
    extendObservable(this, uploadData);
  }

  // TODO: Send either filename of metainfo, but not both!
  forEach(callback) {
    // FileList is not an Array, use destructuring to convert it
    [...this.files].forEach((file) =>
      fileToBase64(file).then((encodedData) =>
        callback({
          metainfo: encodedData,
          filename: this.filename,
          'download-dir': this.downloadDir,
        })
      )
    );
  }
}

export default TorrentUpload;
