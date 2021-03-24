import { observable, action} from 'mobx';

class SessionStore {
  @observable sessionId = null;
  @observable settings = {};
  @observable freeSpace = -1; // TODO: Decide if this should be in TorrentUpload
  @observable blocklistSize = -1;
  
  constructor(rpc) {
    this.rpc = rpc;
  }

  @action getSession() {
    return this.rpc.sendRequest('session-get')
      .then(action((response) => {
        response.json().then(action((result) => {
          this.settings = result.arguments;
        }));
    }));
  }

  @action testPort(port) {
    return this.rpc.sendRequest('port-test')
      .then(action((response) => {
        return response.json().then(action((result) => {
          return result.arguments['port-is-open'];
        }));
    }));
  }

  @action getFreeSpace(downloadDir) {
    const data = {
      path: downloadDir
    };

    return this.rpc.sendRequest('free-space', data)
      .then(action((response) => {
        response.json().then(action((result) => {
          this.freeSpace = result.arguments['size-bytes'];
        }));
    }));
  }

  @action setRateLimit(direction, value) {
    let data;

    if (value > 0) {
      data = {
        [`speed-limit-${direction}`]: value,
        [`speed-limit-${direction}-enabled`]: true
      };
    } else {
      data = {
        [`speed-limit-${direction}-enabled`]: false
      };
    }

    this.settings = {
      ...this.settings,
      ...data,
    };

    return this.rpc.sendRequest('session-set', data).then(action((response) => {
      response.json().then(action((result) => {}));
    }));
  }

  @action setPreference(id, value) {
    const data = {
      [id]: value
    };

    this.settings = {
      ...this.settings,
      ...data,
    };

    return this.rpc.sendRequest('session-set', data).then(action((response) => {
      response.json().then(action((result) => {}));
    }));
  }

  @action togglePreference(id) {
    return this.setPreference(id, !this.settings[id]);
  }

  @action updateBlocklist() {
    return this.rpc.sendRequest('blocklist-update')
      .then(action((response) => {
        return response.json().then(action((result) => {
          this.blocklistSize = result.arguments['blocklist-size'];
          return this.blocklistSize;
        }));
    }));
  }
}

export default SessionStore;
