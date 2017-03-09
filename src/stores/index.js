import { useStrict } from 'mobx';

import RPC from 'util/rpc';
import PrefsStore from './prefs-store';
import ViewStore from './view-store';
import TorrentStore from './torrent-store';
import StatsStore from './stats-store';
import SessionStore from './session-store';

import hydratePrefsStore from './util/hydrate-prefs-store'

// Force strict mode so mutations are only allowed within actions.
useStrict(true);

export const view_store = new ViewStore();

const onConnect = () => view_store.toggleConnectionDialog(false);
const onDisconnect = () => view_store.toggleConnectionDialog(true);

const rpc = new RPC(onConnect, onDisconnect);

export const prefs_store = new PrefsStore(hydratePrefsStore());
export const torrents_store = new TorrentStore(rpc, prefs_store);
export const stats_store = new StatsStore(rpc);
export const session_store = new SessionStore(rpc);
