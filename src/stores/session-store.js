import { observable, action} from 'mobx';

import rpc from 'util/rpc';

class SessionStore {
  @observable sessionId = null;
  @observable altSpeedEnabled = false;

  @action getSession() {
    return rpc('session-get', this.sessionId)
      .then(action((response) => {
        this.sessionId = response.headers.get('x-transmission-session-id');

        return rpc('session-get', this.sessionId).then(action((response) => {
          response.json().then(action((result) => {
            this.altSpeedEnabled = result.arguments['alt-speed-enabled'];
          }));
        }));
      }));
  }
}

export default SessionStore;
