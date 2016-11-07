import { useStrict } from 'mobx';

import ViewStore from './view';
import TorrentStore from './torrent';

// Force strict mode so mutations are only allowed within actions.
useStrict(true);

export const view = new ViewStore();
export const torrent = new TorrentStore();
