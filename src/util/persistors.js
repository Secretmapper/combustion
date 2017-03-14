export const isLocalStorageSupported = (typeof(Storage) !== 'undefined' && window['localStorage'] != null )

const genLocalStorageKey = key => `react-transmission.${key}`

export function persistKey (key, val) {
  if (isLocalStorageSupported) {
    window.localStorage.setItem(genLocalStorageKey(key), val);
  } else {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = `${key}=${val}; expires=${date.toGMTString()}; path=/`;
  }
}

export function rehydrateKey (key, fallback) {
  if (isLocalStorageSupported) {
    return window.localStorage.getItem(genLocalStorageKey(key)) || getFromCookieKey(key, fallback);
  } else {
    getFromCookieKey(key, fallback);
  }
}

function getFromCookieKey (key, fallback) {
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
