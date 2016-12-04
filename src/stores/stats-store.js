import {observable, action} from 'mobx';

class StatsStore {
  @observable stats = {};
  @observable cumulativeStats = {};
  @observable currentStats = {};

  constructor(rpc) {
    this.rpc = rpc;
  }

  @action getStats() {
    return this.rpc.sendRequest('session-stats').then(action((response) => {
      response.json().then(action((result) => {
        this.stats = result.arguments;
        this.cumulativeStats = result.arguments['cumulative-stats'];
        this.currentStats = result.arguments['current-stats'];
      }));
    }));
  }
}

export default StatsStore;
