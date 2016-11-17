import {
  speedBps,
  countString,
  percentString,
  ratioString,
} from 'util/formatters';

import Torrent from 'stores/torrent';

function formatUL(torrent) {
  return `↑ ${speedBps(torrent.rateUpload)}`;
};

function formatDL(torrent) {
    return `↓ ${speedBps(torrent.rateDownload)}`;
};

// Downloading from 2 of 3 peer(s) and 2 webseed(s)
function formatDownloadFromPeersAndWebseeds(torrent, peerCount, webseedCount) {
  return [
    'Downloading from',
    torrent.peersSendingToUs,
    'of',
    countString('peer', 'peers', peerCount),
    'and',
    countString('web seed', 'web seeds', webseedCount),
    '-',
    formatDL(torrent),
    formatUL(torrent)
  ].join(' ');
}

// Downloading from 2 webseed(s)
function formatDownloadFromWebseeds(torrent, webseedCount) {
  return [
    'Downloading from',
    countString('web seed', 'web seeds', webseedCount),
    '-',
    formatDL(torrent),
    formatUL(torrent)
  ].join(' ');
}

// Downloading from 2 of 3 peer(s)
function formatDownloadFromSeeds(torrent, peerCount) {
  return [
    'Downloading from',
    torrent.peersSendingToUs,
    'of',
    countString('peer', 'peers', peerCount),
    '-',
    formatDL(torrent),
    formatUL(torrent)
  ].join(' ');
}

function formatDownloading(torrent) {
  const peerCount = torrent.peersConnected;
  const webseedCount = torrent.webseedsSendingToUs;

  if (webseedCount && peerCount) {
    return formatDownloadFromPeersAndWebseeds(torrent, peerCount, webseedCount);
  }

  if (webseedCount) {
    return formatDownloadFromWebseeds(torrent, webseedCount);
  }

  return formatDownloadFromSeeds(torrent, peerCount);
}

function formatSeeding(torrent) {
  return [
    'Seeding to',
    torrent.peersGettingFromUs,
    'of',
    countString('peer', 'peers', torrent.peersConnected),
    '-',
    formatUL(torrent)
  ].join(' ');
}

function formatChecking(torrent) {
  return [
    'Verifying local data (',
    percentString(100.0 * torrent.recheckProgress),
    '% tested)'
  ].join('');
}

function formatStatus(torrent) {
  switch (torrent.status) {
  case Torrent.STATUS_STOPPED:
    return torrent.isFinished ? 'Seeding complete' : 'Paused';
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

function formatError(torrent) {
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

function formatSeedingShort(torrent) {
  return [
    'Ratio: ',
    ratioString(torrent.uploadRatio),
    ', ',
    formatUL(torrent)
  ].join('');
}

function formatDownloadingShort(torrent) {
  const hasDownloadActivity = torrent.rateDownload > 0;
  const hasUploadActivity = torrent.rateUpload > 0;

  if (!hasUploadActivity && !hasDownloadActivity) {
    return 'Idle';
  }

  let s = '';

  if (hasDownloadActivity) {
    s += formatDL(torrent);
  }

  if (hasDownloadActivity && hasUploadActivity) {
    s += ' ';
  }

  if (hasUploadActivity) {
    s += formatUL(torrent);
  }

  return s;
}

export function getPeerDetails(torrent) {
  if (torrent.hasErrors) {
    return formatError(torrent);
  }

  if (torrent.isDownloading) {
    return formatDownloading(torrent);
  }

  if (torrent.isSeeding) {
    return formatSeeding(torrent);
  }

  if (torrent.isChecking) {
    return formatChecking(torrent);
  }

  return formatStatus(torrent);
}

export function getPeerDetailsShort(torrent) {
  if (torrent.hasErrors) {
    return formatError(torrent);
  }

  if (torrent.isDownloading) {
    return formatDownloadingShort(torrent);
  }

  if (torrent.isSeeding) {
    return formatSeedingShort(torrent);
  }

  return formatStatus(torrent);
}
