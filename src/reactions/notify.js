import { reaction } from 'mobx';

import {
  buildTorrentAddedNotification,
  buildTorrentCompletedNotification,
  showNotification,
} from 'util/notifications';

export default function ({ view_store, torrents_store }) {
  reaction(
    () => ({
      notificationsEnabled: view_store.notificationsEnabled,
      notifications: [
        ...torrents_store.startedTorrents.map(buildTorrentAddedNotification),
        ...torrents_store.completedTorrents.map(buildTorrentCompletedNotification)
      ]
    }),
    ({ notificationsEnabled, notifications }) => {
      if (!notificationsEnabled) return;

      notifications.forEach(showNotification);
    }
  );
}
