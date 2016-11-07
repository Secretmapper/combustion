import TorrentPresenter from '../../../../presenters/torrent';

export function getPeerDetails(torrent) {
  const decoratedTorrent = new TorrentPresenter(torrent);

  let err;
  let peer_count;
  let webseed_count;
  let fmt = Transmission.fmt;

  if ((err = t.getErrorMessage())) {
      return err;
  };

  if (t.isDownloading()) {
      peer_count = t.getPeersConnected();
      webseed_count = t.getWebseedsSendingToUs();

      if (webseed_count && peer_count) {
          // Downloading from 2 of 3 peer(s) and 2 webseed(s)
          return ['Downloading from',
              t.getPeersSendingToUs(),
              'of',
              fmt.countString('peer', 'peers', peer_count),
              'and',
              fmt.countString('web seed', 'web seeds', webseed_count),
              '-',
              TorrentRendererHelper.formatDL(t),
              TorrentRendererHelper.formatUL(t)
          ].join(' ');
      } else if (webseed_count) {
          // Downloading from 2 webseed(s)
          return ['Downloading from',
              fmt.countString('web seed', 'web seeds', webseed_count),
              '-',
              TorrentRendererHelper.formatDL(t),
              TorrentRendererHelper.formatUL(t)
          ].join(' ');
      } else {
          // Downloading from 2 of 3 peer(s)
          return ['Downloading from',
              t.getPeersSendingToUs(),
              'of',
              fmt.countString('peer', 'peers', peer_count),
              '-',
              TorrentRendererHelper.formatDL(t),
              TorrentRendererHelper.formatUL(t)
          ].join(' ');
      };
  };

  if (t.isSeeding()) {
      return ['Seeding to', t.getPeersGettingFromUs(), 'of', fmt.countString('peer', 'peers', t.getPeersConnected()), '-', TorrentRendererHelper.formatUL(t)].join(' ');
  };

  if (t.isChecking()) {
      return ['Verifying local data (', Transmission.fmt.percentString(100.0 * t.getRecheckProgress()), '% tested)'].join('');
  }

  return t.getStateString();
};
