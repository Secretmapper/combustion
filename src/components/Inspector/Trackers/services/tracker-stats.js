import { timestamp, countString, timeInterval } from 'util/formatters';

import Tracker from 'stores/tracker';

export function lastAnnounceStatus(tracker) {
  var lastAnnounceLabel = 'Last Announce',
      lastAnnounce = ['N/A'],
      lastAnnounceTime;

  if (tracker.hasAnnounced) {
    lastAnnounceTime = timestamp(tracker.lastAnnounceTime);

    if (tracker.lastAnnounceSucceeded) {
        lastAnnounce = [lastAnnounceTime, ' (got ', countString('peer', 'peers', tracker.lastAnnouncePeerCount), ')'];
    } else {
        lastAnnounceLabel = 'Announce error';
        lastAnnounce = [(tracker.lastAnnounceResult ? (tracker.lastAnnounceResult + ' - ') : ''), lastAnnounceTime];
    }
  }

  return {
    label: lastAnnounceLabel,
    value: lastAnnounce.join('')
  };
}

export function getAnnounceState(tracker) {
  var timeUntilAnnounce, s = '';

  switch (tracker.announceState) {
  case Tracker.STATUS_ACTIVE:
      s = 'Announce in progress';
      break;
  case Tracker.STATUS_WAITING:
      timeUntilAnnounce = tracker.nextAnnounceTime - ((new Date()).getTime() / 1000);
      if (timeUntilAnnounce < 0) {
          timeUntilAnnounce = 0;
      }
      s = 'Next announce in ' + timeInterval(timeUntilAnnounce);
      break;
  case Tracker.STATUS_QUEUED:
      s = 'Announce is queued';
      break;
  case Tracker.STATUS_INACTIVE:
      s = tracker.isBackup ?
          'Tracker will be used as a backup' :
          'Announce not scheduled';
      break;
  default:
      s = 'unknown announce state: ' + tracker.announceState;
  }
  return s;
}

export function lastScrapeStatus(tracker) {
  let lastScrapeLabel = 'Last Scrape';
  let lastScrape = 'N/A';
  let lastScrapeTime;

  if (tracker.hasScraped) {
    lastScrapeTime = timestamp(tracker.lastScrapeTime);
    if (tracker.lastScrapeSucceeded) {
      lastScrape = lastScrapeTime;
    } else {
      lastScrapeLabel = 'Scrape error';
      lastScrape = (tracker.lastScrapeResult ? tracker.lastScrapeResult + ' - ' : '') + lastScrapeTime;
    }
  }

  return {
    label: lastScrapeLabel,
    value: lastScrape
  };
}
