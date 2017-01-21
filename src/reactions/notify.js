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

      if (startedTorrents.length > 0) {
        startedTorrents.map(buildTorrentAddedNotification).forEach(showNotification);
      }

      if (completedTorrents.length > 0) {
        completedTorrents.map(buildTorrentCompletedNotification).forEach(showNotification);
      }
    }
  );
}
