import {observable, action} from 'mobx';
import Torrent from './torrent';

export const PrefCookieKeys = {
  statusFilter: 'filter',
  sortCriteria: 'sort_method',
  sortDirection: 'sort_direction',
  compact: 'compact_display_state',
  skipUpdate: 'skip_update',
  rpcEndpoint: 'rpc_endpoint'
};

export const FilterStates = [
  {value: -1, label: 'All', persistKey: 'all'},
  {value: 11, label: 'Active', persistKey: 'active'},
  {value: Torrent.STATUS_DOWNLOAD, label: 'Downloading', persistKey: 'downloading'},
  {value: Torrent.STATUS_SEED, label: 'Seeding', persistKey: 'seeding'},
  {value: Torrent.STATUS_STOPPED, label: 'Paused', persistKey: 'paused'},
  {value: 55, label: 'Finished', persistKey: 'finished'},
  {value: '/transmission/rpc', label: 'RPC Endpoint', persistKey: 'rpcEndpoint'},
];

class PrefsStore {
  @observable statusFilter;
  @observable sortCriteria;
  @observable sortDirection;
  @observable compact;
  @observable skipUpdate;
  @observable rpcEndpoint;

  constructor(init) {
    console.log(init)
    this.rehydrate(init)
  }

  @action rehydrate({ statusFilter = -1, sortCriteria = 'name', sortDirection = 'ascending', compact = false, skipUpdate = false, rpcEndpoint = '/transmission/rpc' } = {}) {
    this.statusFilter = statusFilter;
    this.sortCriteria = sortCriteria;
    this.sortDirection = sortDirection;
    this.compact = compact;
    this.skipUpdate = skipUpdate;
    this.rpcEndpoint = rpcEndpoint
  }

  @action setStatusFilter(statusFilter) {
    this.statusFilter = statusFilter;
  }

  @action setSortCriteria(sortCriteria) {
    this.sortCriteria = sortCriteria;
  }

  @action setSortDirection(sortDirection) {
    this.sortDirection = sortDirection;
  }

  @action setSkipUpdate(type) {
    this.skipUpdate = true
  }

  @action toggleCompact() {
    this.compact = !this.compact;
  }

  @action setRPCEndpoint(rpcEndpoint) {
    console.log(rpcEndpoint)
    this.rpcEndpoint = rpcEndpoint
  }
}

export default PrefsStore;
