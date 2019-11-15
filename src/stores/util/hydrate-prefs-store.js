import { FilterStates, PrefCookieKeys } from '../prefs-store'
import { findByProperty } from 'util/common';
import { rehydrateKey } from 'util/persistors';

export default function () {
  // status filter is saved as a string (i.e. 'all')
  // so we need to make sure to save and read it as so.
  const savedFilter = rehydrateKey(PrefCookieKeys.statusFilter, 'all');

  return {
    statusFilter: findByProperty(FilterStates, 'persistKey', savedFilter).value,
    sortCriteria: rehydrateKey(PrefCookieKeys.sortCriteria, 'name'),
    sortDirection: rehydrateKey(PrefCookieKeys.sortDirection, 'ascending'),
    compact: rehydrateKey(PrefCookieKeys.compact, false),
    skipUpdate: rehydrateKey(PrefCookieKeys.skipUpdate, false),

    rpcEndpoint: rehydrateKey(PrefCookieKeys.rpcEndpoint, '/transmission/rpc')
  }
}
