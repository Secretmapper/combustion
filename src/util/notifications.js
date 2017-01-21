import logoImage from 'images/logo.png';

const CLOSE_TIMEOUT = 5000;

export function buildTorrentAddedNotification(torrent) {
  return {
    title: 'Torrent Added',
    options: {
      body: torrent.name,
      icon: logoImage,
      tag: 'torrent_added',
    },
  };
}

export function buildTorrentCompletedNotification(torrent) {
  return {
    title: 'Torrent Completed',
    options: {
      body: torrent.name,
      icon: logoImage,
      tag: 'torrent_completed',
    },
  };
}

export function showNotification({ title, options }) {
  const notification = new Notification(title, options);

  notification.onclick = () => {
    window.focus();
    notification.close();
  };

  setTimeout(() => notification.close(), CLOSE_TIMEOUT);
}
