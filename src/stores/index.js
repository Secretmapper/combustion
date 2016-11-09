import { useStrict } from 'mobx';

import ViewStore from './view-store';
import TorrentStore from './torrent-store';
import StatsStore from './stats-store';

// Force strict mode so mutations are only allowed within actions.
useStrict(true);

export const view_store = new ViewStore();
export const torrents_store = new TorrentStore();
export const stats_store = new StatsStore();
