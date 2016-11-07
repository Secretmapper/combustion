import {observable, action} from 'mobx';

class ViewStore {
  @observable currentFilter = 'all';
  @observable selectedTorrents = [1];

  @action setFilter(filter) {
    this.currentFilter = filter;
  }

  @action setSelected(id) {
    this.selectedTorrents = [id];
  }

  @action addSelected(id) {
    this.selectedTorrents.push(id);
  }
}

export default ViewStore;
