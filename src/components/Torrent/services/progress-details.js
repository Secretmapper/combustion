import {
  size,
  ratioString,
  percentString,
  timeInterval,
} from 'util/formatters';

function formatProgressDone() {

}

function formatProgressRemaining() {

}

function formatProgressETA() {

}

function formatProgressMagnet(torrent) {
  let metaDataStatus = 'retrieving';

  if (torrent.isStopped) {
    metaDataStatus = 'needs';
  }

  const percent = 100 * torrent.metadataPercentComplete;

  return [
    'Magnetized transfer - ' + metaDataStatus + ' metadata (',
    percentString(percent),
    '%)'
  ].join('');
}

export default function getProgressDetails(torrent) {
  if (torrent.needsMetaData) {
    return formatProgressMagnet(torrent);
  }

  const sizeWhenDone = torrent.sizeWhenDone;
  const totalSize = torrent.totalSize;
  const isDone = torrent.isDone || torrent.isSeeding;
  // TODO: Use either global or torrent one
  const seedRatioLimit = torrent.seedRatioLimit;

  let c;

  if (isDone) {
    // seed: '698.05 MiB'
    if (totalSize === sizeWhenDone) {
      c = [
        size(totalSize)
      ];
    // partial seed: '127.21 MiB of 698.05 MiB (18.2%)'
    } else {
      c = [
        size(sizeWhenDone),
        ' of ',
        size(totalSize),
        ' (',
        percentString(100 * torrent.percentDone),
        '%)'
      ];
    }

    // append UL stats: ', uploaded 8.59 GiB (Ratio: 12.3)'
    c.push(
      ', uploaded ',
      size(torrent.uploadedEver),
      ' (Ratio ',
      ratioString(torrent.uploadRatio),
      ')'
    );
  // not done yet
  } else {
    c = [
      size(sizeWhenDone - torrent.leftUntilDone),
      ' of ',
      size(sizeWhenDone),
      ' (',
      percentString(100 * torrent.percentDone),
      '%)'
    ];
  }

  // maybe append ETA
  if (!torrent.isStopped && (!isDone || seedRatioLimit > 0)) {
    c.push(' - ');

    const eta = torrent.eta;
    // Magic number
    const MAX_ETA = 999 * 60 * 60;

    if (eta < 0 || eta >= MAX_ETA) {
      c.push('remaining time unknown');
    } else {
      c.push(
        timeInterval(eta),
        ' remaining'
      );
    }
  }

  return c.join('');
}
