import 'whatwg-fetch';
import {observable, action} from 'mobx';

const RELEASE_URL = 'https://api.github.com/repos/Secretmapper/combustion/releases/latest'
class VersionStore {
  @observable latest = false;

  constructor(rpc) {
    this.getLatestVersion();
  }

  @action getLatestVersion(i = 0) {
    if (i > 20) return
    fetch(RELEASE_URL)
      .then(result => {
        result.json()
          .then(action(response => {
            this.latest = response.tag_name;
          }))
      })
      .catch(_ => this.getLatestVersion(i + 1))
  }
}

export default VersionStore;
