import { FilterStates, PrefCookieKeys } from '../prefs-store'
import { findByProperty } from 'util/common';

export default function () {
  // status filter is saved as a string (i.e. 'all')
  // so we need to make sure to save and read it as so.
  const savedFilter = rehydrateKey(PrefCookieKeys.statusFilter, 'all');
  
  return {
    statusFilter: findByProperty(FilterStates, 'persistKey', savedFilter).value,
    sortCriteria: rehydrateKey(PrefCookieKeys.sortCriteria, 'name'),
    sortDirection: rehydrateKey(PrefCookieKeys.sortDirection, ''),
    compact: rehydrateKey(PrefCookieKeys.compact, false)
  }
}

function rehydrateKey (key, fallback) {
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
