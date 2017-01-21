import { reaction } from 'mobx';

import {
  buildTorrentAddedNotification,
  buildTorrentCompletedNotification,
  showNotification,
} from 'util/notifications';

export default function (stores) {
  reaction(
    () => [
      stores.view_store.notificationsEnabled,
      stores.torrents_store.startedTorrents,
      stores.torrents_store.completedTorrents
    ],
    ([notificationsEnabled, startedTorrents, completedTorrents]) => {
      if (!notificationsEnabled) return;

      startedTorrents.map(buildTorrentAddedNotification).forEach(showNotification);
      completedTorrents.map(buildTorrentCompletedNotification).forEach(showNotification);
    }
  );
}
