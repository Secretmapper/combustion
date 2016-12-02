import { observable, action} from 'mobx';

class SessionStore {
  @observable sessionId = null;
  @observable settings = {};

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

  @action setPreference(id, value) {
    const data = {
      [id]: value
    };

    this.settings[id] = value;

    return this.rpc.sendRequest('session-set', data).then(action((response) => {
      response.json().then(action((result) => {}));
    }));
  }

  @action togglePreference(id) {
    return this.setPreference(id, !this.settings[id]);
  }
}

export default SessionStore;
