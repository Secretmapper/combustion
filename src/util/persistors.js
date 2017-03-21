const genLocalStorageKey = key => `react-transmission.${key}`

export function persistKey (key, val) {
  window.localStorage.setItem(genLocalStorageKey(key), val);
}

export function rehydrateKey (key, fallback) {
  let val = window.localStorage.getItem(genLocalStorageKey(key));

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
