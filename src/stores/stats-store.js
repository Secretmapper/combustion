import {observable, action} from 'mobx';

import rpc from 'util/rpc';

class StatsStore {
  @observable stats = {};

  @action getStats(sessionId) {
    return rpc('session-stats', sessionId).then(action((response) => {
      response.json().then(action((result) => {
        this.stats = result.arguments;
      }));
    }));
  }
}

export default StatsStore;
