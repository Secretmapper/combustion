import { toTruncFixed } from './common';
// TODO: Should this module depend on this?
import Torrent from 'stores/torrent';

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

const mem_K = 1024;
const mem_B_str = 'B';
const mem_K_str = 'KiB';
const mem_M_str = 'MiB';
const mem_G_str = 'GiB';
const mem_T_str = 'TiB';

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
    return toTruncFixed(x, 2);
  } else if (x < 100.0) {
    return toTruncFixed(x, 1);
  } else {
    return toTruncFixed(x, 0);
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
    return `${toTruncFixed(speed, 0)} ${speed_K_str}`;
  }

  speed /= speed_K;

  if (speed <= 99.995) { // 1 M to 99.99 M
    return `${toTruncFixed(speed, 2)} ${speed_M_str}`;
  }
  if (speed <= 999.95) { // 100 M to 999.9 M
    return `${toTruncFixed(speed, 1)} ${speed_M_str}`;
  }

  // insane speeds
  speed /= speed_K;
  return `${toTruncFixed(speed, 2)} ${speed_G_str}`;
}

export function pluralString(msgid, msgid_plural, n) {
  // TODO(i18n): http://doc.qt.digia.com/4.6/i18n-plural-rules.html
  return n === 1 ? msgid : msgid_plural;
}

export function countString(msgid, msgid_plural, n) {
  return `${numberWithCommas(n)} ${pluralString(msgid, msgid_plural, n)}`;
}

export function mem(bytes) {
  if (bytes < mem_K) {
    return [bytes, mem_B_str].join(' ');
  }

  let convertedSize;
  let unit;

  if (bytes < Math.pow(mem_K, 2)) {
    convertedSize = bytes / mem_K;
    unit = mem_K_str;
  } else if (bytes < Math.pow(mem_K, 3)) {
    convertedSize = bytes / Math.pow(mem_K, 2);
    unit = mem_M_str;
  } else if (bytes < Math.pow(mem_K, 4)) {
    convertedSize = bytes / Math.pow(mem_K, 3);
    unit = mem_G_str;
  } else {
    convertedSize = bytes / Math.pow(mem_K, 4);
    unit = mem_T_str;
  }

  // try to have at least 3 digits and at least 1 decimal
  return (
    convertedSize <= 9.995 ?
    [toTruncFixed(convertedSize, 2), unit].join(' ') :
    [toTruncFixed(convertedSize, 1), unit].join(' ')
  );
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
    [toTruncFixed(convertedSize, 2), unit].join(' ') :
    [toTruncFixed(convertedSize, 1), unit].join(' ')
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

export function formatStatus(torrent) {
  switch (torrent.status) {
  case Torrent.STATUS_STOPPED:
    return torrent.isFinished ? 'Finished' : 'Paused';
  case Torrent.STATUS_CHECK_WAIT:
    return 'Queued for verification';
  case Torrent.STATUS_CHECK:
    return 'Verifying local data';
  case Torrent.STATUS_DOWNLOAD_WAIT:
    return 'Queued for download';
  case Torrent.STATUS_DOWNLOAD:
    return 'Downloading';
  case Torrent.STATUS_SEED_WAIT:
    return 'Queued for seeding';
  case Torrent.STATUS_SEED:
    return 'Seeding';
  case null:
  case undefined:
    return 'Unknown';
  default:
    return 'Error';
  }
}

export function formatError(torrent) {
  const errorDescription = torrent.errorDescription;

  switch (torrent.error) {
  case Torrent.ERR_TRACKER_WARNING:
    return `Tracker returned a warning: ${errorDescription}`;
  case Torrent.ERR_TRACKER_ERROR:
    return `Tracker returned an error: ${errorDescription}`;
  case Torrent.ERR_LOCAL_ERROR:
    return `Error: ${errorDescription}`;
  default:
    return null;
  }
}
