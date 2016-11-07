const STATUS_STOPPED = 0;
const STATUS_CHECK_WAIT = 1;
const STATUS_CHECK = 2;
const STATUS_DOWNLOAD_WAIT = 3;
const STATUS_DOWNLOAD = 4;
const STATUS_SEED_WAIT = 5;
const STATUS_SEED = 6;

// Downloading from 2 of 3 peer(s) and 2 webseed(s)
function formatDownloadFromPeersAndWebseeds(torrent, peer_count, webseed_count) {
  return [
    'Downloading from',
    torrent.getPeersSendingToUs(),
    'of',
    fmt.countString('peer', 'peers', peer_count),
    'and',
    fmt.countString('web seed', 'web seeds', webseed_count),
    '-',
    TorrentRendererHelper.formatDL(t),
    TorrentRendererHelper.formatUL(t)
  ].join(' ');
}

// Downloading from 2 webseed(s)
function formatDownloadFromWebseeds(torrent, webseed_count) {
  return [
    'Downloading from',
    fmt.countString('web seed', 'web seeds', webseed_count),
    '-',
    TorrentRendererHelper.formatDL(t),
    TorrentRendererHelper.formatUL(t)
  ].join(' ');
}

// Downloading from 2 of 3 peer(s)
function formatDownloadFromSeeds(torrent, peer_count) {
  return ['Downloading from',
    torrent.getPeersSendingToUs(),
    'of',
    fmt.countString('peer', 'peers', peer_count),
    '-',
    TorrentRendererHelper.formatDL(torrent),
    TorrentRendererHelper.formatUL(torrent)
  ].join(' ');
}

function formatDownloading(torrent) {
  const peer_count = torrent.getPeersConnected();
  const webseed_count = torrent.getWebseedsSendingToUs();

  if (webseed_count && peer_count) {
    return formatDownloadFromPeersAndWebseeds(torrent, peer_count, webseed_count);
  }

  if (webseed_count) {
    return formatDownloadFromWebseeds(torrent, webseed_count);
  }

  return formatDownloadFromSeeds(torrent, peer_count);
}

function formatSeeding(torrent) {
  return [
    'Seeding to',
    torrent.getPeersGettingFromUs(),
    'of',
    fmt.countString('peer', 'peers', torrent.getPeersConnected()),
    '-',
    TorrentRendererHelper.formatUL(torrent)
  ].join(' ');
}

function formatChecking(torrent) {
  return [
    'Verifying local data (',
    Transmission.fmt.percentString(100.0 * torrent.getRecheckProgress()),
    '% tested)'
  ].join('');
}

function formatStatus(torrent) {
  switch (torrent.getStatus()) {
  case STATUS_STOPPED:
    return torrent.isFinished() ? 'Seeding complete' : 'Paused';
  case STATUS_CHECK_WAIT:
    return 'Queued for verification';
  case STATUS_CHECK:
    return 'Verifying local data';
  case STATUS_DOWNLOAD_WAIT:
    return 'Queued for download';
  case STATUS_DOWNLOAD:
    return 'Downloading';
  case STATUS_SEED_WAIT:
    return 'Queued for seeding';
  case STATUS_SEED:
    return 'Seeding';
  case null:
  case undefined:
    return 'Unknown';
  default:
    return 'Error';
  }
}

export function getPeerDetails(torrent) {
  const errorMessage = torrent.getErrorMessage();

  if (errorMessage) {
      return errorMessage;
  };

  if (torrent.isDownloading()) {
    return formatDownloading(torrent);
  };

  if (torrent.isSeeding()) {
    return formatSeeding(torrent);
  };

  if (torrent.isChecking()) {
    return formatChecking(torrent);
  }

  return formatStatus(torrent);
}
