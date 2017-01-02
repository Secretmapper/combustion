import React from 'react';
import CSSModules from 'react-css-modules';

import {
  lastAnnounceStatus,
  getAnnounceState,
  lastScrapeStatus,
} from './services/tracker-stats';

import styles from './styles/index.css';

// NOTE: We're not currently supporting multitracker entries.
// See http://www.bittornado.com/docs/multitracker-spec.txt for more info.
function TrackerGroup({ trackers }) {
  return (
    <div>
      {trackers.length > 0 &&
        <ul styleName='trackerList'>
          {trackers.map((tracker, index) => {
            const lastAnnounceStatusHash = lastAnnounceStatus(tracker);
            const announceState = getAnnounceState(tracker);
            const lastScrapeStatusHash = lastScrapeStatus(tracker);

            return (
              <li key={index} styleName='tierRow'>
                <p styleName='trackerTier'>Tier {tracker.tier + 1}</p>
                <div styleName='trackerRow'>
                  <div styleName='trackerHost'>
                    {tracker.host || tracker.announce}
                  </div>
                  <div styleName='trackerInfo'>
                    <div styleName='trackerActivity'>
                      <p styleName='trackerActivityRow'>{lastAnnounceStatusHash.label}: {lastAnnounceStatusHash.value}</p>
                      <p styleName='trackerActivityRow'>{announceState}</p>
                      <p styleName='trackerActivityRow'>{lastScrapeStatusHash.label}: {lastScrapeStatusHash.value}</p>
                    </div>
                    <dl styleName='trackerStats'>
                      <div styleName='trackerStatsRow'>
                        <dt styleName='trackerStatsTerm'>Seeders:</dt>
                        <dd styleName='trackerStatsDescription'>{tracker.seederCount > -1 ? tracker.seederCount : 'N/A'}</dd>
                      </div>
                      <div styleName='trackerStatsRow'>
                        <dt styleName='trackerStatsTerm'>Leechers:</dt>
                        <dd styleName='trackerStatsDescription'>{tracker.leecherCount > -1 ? tracker.leecherCount : 'N/A'}</dd>
                      </div>
                      <div styleName='trackerStatsRow'>
                        <dt styleName='trackerStatsTerm'>Downloads:</dt>
                        <dd styleName='trackerStatsDescription'>{tracker.downloadCount > -1 ? tracker.downloadCount : 'N/A'}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
}

export default CSSModules(styles)(TrackerGroup);
