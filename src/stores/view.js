import {observable, action} from 'mobx';

class ViewStore {
  @observable currentFilter = 'all';

  @action setFilter(filter) {
    this.currentFilter = filter;
  }
}

export default ViewStore;
