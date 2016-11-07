const speed_K = 1000;
const speed_K_str = 'kB/s';
const speed_M_str = 'MB/s';
const speed_G_str = 'GB/s';

/**
 * Localize number with browser number formatting
 * 
 * @param  {Number} n
 * @return {String}
 */
export function numberWithCommas(n) {
  return parseInt(n, 10).toLocaleString();
};

/*
 * Format a percentage to a string
 */
export function percentString(x) {
  if (x < 10.0) {
    return x.toTruncFixed(2);
  } else if (x < 100.0) {
    return x.toTruncFixed(1);
  } else {
    return x.toTruncFixed(0);
  }
}

export function speedBps(Bps) {
  return speed(toKBps(Bps));
}

export function toKBps(Bps) {
  return Math.floor(Bps / speed_K);
}

export function speed(KBps) {
  var speed = KBps;

  if (speed <= 999.95) { // 0 KBps to 999 K
    return `${speed.toTruncFixed(0)} ${speed_K_str}`;
  }

  speed /= speed_K;

  if (speed <= 99.995) { // 1 M to 99.99 M
    return `${speed.toTruncFixed(2)} ${speed_M_str}`;
  }
  if (speed <= 999.95) { // 100 M to 999.9 M
    return `${speed.toTruncFixed(1)} ${speed_M_str}`;
  }

  // insane speeds
  speed /= speed_K;
  return `${speed.toTruncFixed(2)} ${speed_G_str}`;
}

export function pluralString(msgid, msgid_plural, n) {
  // TODO(i18n): http://doc.qt.digia.com/4.6/i18n-plural-rules.html
  return n === 1 ? msgid : msgid_plural;
}

export function countString(msgid, msgid_plural, n) {
  return `${numberWithCommas(n)} ${pluralString(msgid, msgid_plural, n)}`;
}
