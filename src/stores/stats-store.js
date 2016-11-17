import {observable, action} from 'mobx';

class StatsStore {
  @observable stats = {};

  constructor(rpc) {
    this.rpc = rpc;
  }

  @action getStats() {
    return this.rpc.sendRequest('session-stats').then(action((response) => {
      response.json().then(action((result) => {
        this.stats = result.arguments;
      }));
    }));
  }
}

export default StatsStore;
