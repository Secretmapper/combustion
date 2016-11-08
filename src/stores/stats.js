import {observable, action} from 'mobx';

class StatsStore {
  @observable stats = {};

  @action getStats() {
    return fetch('/src/fixtures/stats.json').then(action((response) => {
      response.json().then(action((result) => {
        this.stats = result.arguments;
      }));
    }));
  }
}

export default StatsStore;
