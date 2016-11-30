import { observable, action} from 'mobx';

class SessionStore {
  @observable sessionId = null;
  @observable altSpeedEnabled = false;

  constructor(rpc) {
    this.rpc = rpc;
  }

  @action getSession() {
    return this.rpc.sendRequest('session-get')
      .then(action((response) => {
        response.json().then(action((result) => {
          this.altSpeedEnabled = result.arguments['alt-speed-enabled'];
        }));
    }));
  }

  @action setPreference(id, value) {
    const data = {
      [id]: value
    };

    return this.rpc.sendRequest('session-set', data).then(action((response) => {
      response.json().then(action((result) => {}));
    }));
  }
}

export default SessionStore;
