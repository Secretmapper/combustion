import { observable, action} from 'mobx';

class SessionStore {
  @observable altSpeedEnabled = false;

  @action getSession() {
    return fetch('/src/fixtures/session.json').then(action((response) => {
      response.json().then(action((result) => {
        this.altSpeedEnabled = result.arguments['alt-speed-enabled'];
      }));
    }));
  }
}

export default SessionStore;
