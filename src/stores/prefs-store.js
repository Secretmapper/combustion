import {observable, action} from 'mobx';
import { findByProperty } from 'util/common';
import Torrent from './torrent';

export const PrefCookieKeys = {
  statusFilter: 'filter',
  sortCriteria: 'sort_method',
  sortDirection: 'sort_direction',
  compact: 'compact_display_state'
}

export const FilterStates = [
  {value: 0, label: 'All', persistKey: 'all'},
  {value: 11, label: 'Active', persistKey: 'active'},
  {value: Torrent.STATUS_DOWNLOAD, label: 'Downloading', persistKey: 'downloading'},
  {value: Torrent.STATUS_SEED, label: 'Seeding', persistKey: 'seeding'},
  {value: Torrent.STATUS_STOPPED, label: 'Paused', persistKey: 'paused'},
  {value: 55, label: 'Finished', persistKey: 'finished'},
];

class PrefsStore {
  @observable statusFilter;
  @observable sortCriteria;
  @observable sortDirection;
  @observable compact;

  constructor() {
    this.rehydrate();
  }

  @action rehydrate() {
    // status filter is saved as a string (i.e. 'all')
    // so we need to make sure to save and read it as so.
    const savedFilter = this.rehydrateKey(PrefCookieKeys.statusFilter, 'all');
    this.statusFilter = findByProperty(FilterStates, 'persistKey', savedFilter).value;

    this.sortCriteria = this.rehydrateKey(PrefCookieKeys.sortCriteria, 'name');
    this.sortDirection = this.rehydrateKey(PrefCookieKeys.sortDirection, '');
    this.compact = this.rehydrateKey(PrefCookieKeys.compact, false);
  }

  @action setStatusFilter(statusFilter) {
    this.statusFilter = statusFilter;

    // status filter is saved as a string (i.e. 'all')
    // so we need to make sure to save and read it as so.
    const persistAs = findByProperty(FilterStates, 'value', statusFilter).persistKey;
    this.persistKey(PrefCookieKeys.statusFilter, persistAs);
  }

  @action setSortCriteria(sortCriteria) {
    this.sortCriteria = sortCriteria;
    this.persistKey(PrefCookieKeys.sortCriteria, sortCriteria);
  }

  @action setSortDirection(sortDirection) {
    this.sortDirection = sortDirection;
    this.persistKey(PrefCookieKeys.sortDirection, sortDirection);
  }

  @action toggleCompact() {
    this.compact = !this.compact;
    this.persistKey(PrefCookieKeys.compact, this.compact);
  }

  persistKey(key, val) {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = `${key}=${val}; expires=${date.toGMTString()}; path=/`
  }

  rehydrateKey(key, fallback) {
    let val;
    let lines = document.cookie.split(';');
    for (let i = 0; !val && i < lines.length; ++i) {
      let line = lines[i].trim();
      let delim = line.indexOf('=');
      if ((delim === key.length) && line.indexOf(key) === 0) {
          val = line.substring(delim + 1);
      };
    };

    // FIXME: we support strings and booleans... add number support too?
    if (!val) {
      val = fallback;
    } else if (val === 'true') {
      val = true;
    } else if (val === 'false') {
      val = false;
    };

    return val;
  }
}

export default PrefsStore;
