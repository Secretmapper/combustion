import './common';

const speed_K = 1000;
const speed_K_str = 'kB/s';
const speed_M_str = 'MB/s';
const speed_G_str = 'GB/s';

const size_K = 1000;
const size_B_str = 'B';
const size_K_str = 'kB';
const size_M_str = 'MB';
const size_G_str = 'GB';
const size_T_str = 'TB';

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

export function size(bytes) {
  if (bytes < size_K) {
    return [bytes, size_B_str].join(' ');
  }

  let convertedSize;
  let unit;

  if (bytes < Math.pow(size_K, 2)) {
    convertedSize = bytes / size_K;
    unit = size_K_str;
  } else if (bytes < Math.pow(size_K, 3)) {
    convertedSize = bytes / Math.pow(size_K, 2);
    unit = size_M_str;
  } else if (bytes < Math.pow(size_K, 4)) {
    convertedSize = bytes / Math.pow(size_K, 3);
    unit = size_G_str;
  } else {
    convertedSize = bytes / Math.pow(size_K, 4);
    unit = size_T_str;
  }

  // try to have at least 3 digits and at least 1 decimal
  return (
    convertedSize <= 9.995 ?
    [convertedSize.toTruncFixed(2), unit].join(' ') :
    [convertedSize.toTruncFixed(1), unit].join(' ')
  );
}

export function ratioString(x) {
  if (x === -1) {
    return 'None';
  }

  if (x === -2) {
    return '∞';
  }

  return percentString(x);
}

export function timeInterval(seconds) {
  let days = Math.floor(seconds / 86400);
  let hours = Math.floor((seconds % 86400) / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let roundedSeconds = Math.floor(seconds % 60);
  let d = days + ' ' + (days > 1 ? 'days' : 'day');
  let h = hours + ' ' + (hours > 1 ? 'hours' : 'hour');
  let m = minutes + ' ' + (minutes > 1 ? 'minutes' : 'minute');
  let s = roundedSeconds + ' ' + (roundedSeconds > 1 ? 'seconds' : 'second');

  if (days) {
    if (days >= 4 || !hours) {
      return d;
    }

    return d + ', ' + h;
  }

  if (hours) {
    if (hours >= 4 || !minutes) {
        return h;
    }

    return h + ', ' + m;
  }

  if (minutes) {
    if (minutes >= 4 || !roundedSeconds) {
      return m;
    }

    return m + ', ' + s;
  }

  return s;
}
